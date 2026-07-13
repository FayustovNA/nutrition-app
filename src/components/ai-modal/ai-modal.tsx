import { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ai-modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import AiSpark from '../../images/header/AiSpark.svg?react';
import closeIcon from '../../images/close-button.svg';
import { buildAiDiaryContext, AiDiaryContext, AiDayWithFoods, DiaryEntryLike } from '../../utils/aiDiaryContext';

interface AiModalProps {
    onClose: () => void;
    statsData?: DiaryEntryLike[];
    user?: string;
}

interface ChatMessage {
    id: number;
    role: 'assistant' | 'user';
    content: ReactNode;
}

// Подсказки, которые просто подставляют текст в поле ввода — на них пока
// некому ответить, реальная модель не подключена
const TEXT_SUGGESTIONS = [
    'Как добрать норму белка?',
    'Какие жиры всегда должны быть в рационе?',
    'Почему динамика веса не линейная?',
];

// Разбор дневников тянет 5 параллельных запросов к бэкенду и в будущем — платный
// вызов модели, поэтому ограничиваем раз в неделю на пользователя
const DIARY_INSIGHTS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

const getDiaryInsightsStorageKey = (user: string) => `ai_diary_insights_last_${user}`;

// Ограничение пока хранится только на клиенте (localStorage) — когда появится
// реальный бэкенд-эндпоинт для советов, лимит нужно продублировать и там,
// иначе его легко обойти очисткой localStorage
function getNextAvailableAt(user?: string): Date | null {
    if (!user) return null;
    const stored = localStorage.getItem(getDiaryInsightsStorageKey(user));
    if (!stored) return null;
    const last = Number(stored);
    if (Number.isNaN(last)) return null;
    const next = last + DIARY_INSIGHTS_COOLDOWN_MS;
    return next > Date.now() ? new Date(next) : null;
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

function renderDay(day: AiDayWithFoods) {
    if (!day.foods) {
        return (
            <div key={day.date} className={styles.dayBlock}>
                <b>{formatDate(day.date)}</b> — {day.caloriesActual}/{day.caloriesTarget} kcal
                <div className={styles.dayNote}>не удалось получить состав дневника за этот день</div>
            </div>
        );
    }

    const byMeal = day.foods.reduce<Record<string, typeof day.foods>>((acc, food) => {
        if (!acc[food.meal]) acc[food.meal] = [];
        acc[food.meal]!.push(food);
        return acc;
    }, {});

    return (
        <div key={day.date} className={styles.dayBlock}>
            <b>
                {formatDate(day.date)} — {day.caloriesActual}/{day.caloriesTarget} kcal, Б {day.proteinActual}/{day.proteinTarget} г,
                {' '}Ж {day.fatActual}/{day.fatTarget} г, У {day.carbsActual}/{day.carbsTarget} г
                {day.weightActual ? `, вес ${day.weightActual} кг` : ''}
            </b>
            {Object.entries(byMeal).map(([meal, foods]) => (
                <div key={meal} className={styles.mealBlock}>
                    <span className={styles.mealTitle}>{meal}</span>
                    <ul className={styles.contextList}>
                        {foods.map((food, i) => (
                            <li key={i}>
                                {food.name} [{food.units}×] — {food.calories} kcal, Б {food.protein}/Ж {food.fat}/У {food.carbohydrate} г
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

// Человекочитаемое представление того, что уйдёт агенту в мета-промт,
// когда он будет подключён. Пока просто показываем это в чате как факт
// того, что данные собраны (включая реальный состав дневника по продуктам) —
// реального ответа модели ещё нет.
function renderDiaryContext(context: AiDiaryContext): ReactNode {
    const { lastDays, weightDynamics, targetAverages } = context;

    if (lastDays.length === 0) {
        return 'В дневнике пока нет записей с калориями — не по чему делать разбор.';
    }

    return (
        <div className={styles.contextSummary}>
            <p>
                Собрал состав дневника за последние дни (те же данные, что открываются по клику
                на карточку). Модель пока не подключена — это предпросмотр того, что уйдёт ей
                в промпт, когда мы её подключим:
            </p>

            <div className={styles.contextBlock}>
                <b>Последние {lastDays.length} дн. дневника</b>
                {lastDays.map(renderDay)}
            </div>

            <div className={styles.contextBlock}>
                <b>Динамика веса за {weightDynamics.rangeDays} дн.</b>
                <div>
                    {weightDynamics.startWeight !== null && weightDynamics.endWeight !== null
                        ? `${weightDynamics.startWeight} → ${weightDynamics.endWeight} кг (${weightDynamics.deltaKg! > 0 ? '+' : ''}${weightDynamics.deltaKg} кг, ~${weightDynamics.weeklyRateKg} кг/нед)`
                        : 'недостаточно замеров веса за этот период'}
                </div>
            </div>

            <div className={styles.contextBlock}>
                <b>Средний план КБЖУ за {weightDynamics.rangeDays} дн.</b>
                <div>
                    {targetAverages.calories} kcal, Б {targetAverages.protein} г,
                    {' '}Ж {targetAverages.fat} г, У {targetAverages.carbohydrate} г
                </div>
            </div>
        </div>
    );
}

// Заглушка UI ассистента — реальная модель ещё не подключена, но сбор
// контекста (состав дневника/вес/план КБЖУ) уже настоящий: тянет те же
// запросы, что и карточки дневника, просто по последним 5 дням сразу
const AiModal: FC<AiModalProps> = ({ onClose, statsData = [], user }) => {
    const [message, setMessage] = useState('');
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [nextAvailableAt, setNextAvailableAt] = useState<Date | null>(() => getNextAvailableAt(user));
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 0,
            role: 'assistant',
            content:
                'Привет! Я помощник BlackFox Nutrition — скоро смогу отвечать на вопросы по твоему дневнику питания и прогрессу.',
        },
    ]);

    useEffect(() => {
        const closeEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', closeEsc);
        return () => window.removeEventListener('keydown', closeEsc);
    }, [onClose]);

    useEffect(() => {
        setNextAvailableAt(getNextAvailableAt(user));
    }, [user]);

    const handleDiaryInsights = async () => {
        if (!user || isLoadingInsights || nextAvailableAt) return;

        setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: 'Подробный анализ дневников от AI BFN' }]);
        setIsLoadingInsights(true);

        try {
            const context = await buildAiDiaryContext(statsData, user);
            setMessages((prev) => [...prev, { id: Date.now(), role: 'assistant', content: renderDiaryContext(context) }]);
            localStorage.setItem(getDiaryInsightsStorageKey(user), String(Date.now()));
            setNextAvailableAt(getNextAvailableAt(user));
        } catch (error) {
            console.error('Не удалось собрать контекст для AI:', error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), role: 'assistant', content: 'Не получилось собрать данные дневника — попробуй ещё раз.' },
            ]);
        } finally {
            setIsLoadingInsights(false);
        }
    };

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={styles.modalwindow}>
                <img className={styles.closeicon} src={closeIcon} onClick={onClose} alt="Закрыть" />

                <div className={styles.header}>
                    <div className={styles.badge}>
                        <AiSpark />
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.title}>AI BF</span>
                        <span className={styles.beta}>Beta</span>
                    </div>
                </div>

                <div className={styles.body}>
                    {messages.map((m) => (
                        <div key={m.id} className={m.role === 'user' ? styles.userMessage : styles.greeting}>
                            {m.content}
                        </div>
                    ))}

                    {isLoadingInsights && <div className={styles.greeting}>Собираю дневники за последние дни…</div>}

                    <div className={styles.suggestions}>
                        <button
                            className={styles.suggestion}
                            onClick={handleDiaryInsights}
                            disabled={!user || isLoadingInsights || !!nextAvailableAt}
                            title={nextAvailableAt ? 'Подробный анализ доступен раз в неделю' : undefined}
                        >
                            {nextAvailableAt
                                ? `Подробный анализ дневников от AI BFN — доступен с ${formatDate(nextAvailableAt.toISOString())}`
                                : 'Подробный анализ дневников от AI BFN'}
                        </button>
                        {TEXT_SUGGESTIONS.map((suggestion) => (
                            <button
                                key={suggestion}
                                className={styles.suggestion}
                                onClick={() => setMessage(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Спросите AI BF..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className={styles.sendBtn} disabled title="Скоро будет доступно">
                        <AiSpark />
                    </button>
                </div>
            </div>
        </>,
        document.getElementById('portal')!
    );
};

export default AiModal;
