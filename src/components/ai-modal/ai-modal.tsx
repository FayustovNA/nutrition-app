import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ai-modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import AiSpark from '../../images/header/AiSpark.svg?react';
import closeIcon from '../../images/close-button.svg';

interface AiModalProps {
    onClose: () => void;
}

const SUGGESTIONS = [
    'Как скорректировать питание под мою цель?',
    'Почему вес не двигается уже неделю?',
    'Разбери мой последний дневник питания',
];

// Заглушка UI ассистента — без подключения к реальной модели, доработаем логику позже
const AiModal: FC<AiModalProps> = ({ onClose }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const closeEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', closeEsc);
        return () => window.removeEventListener('keydown', closeEsc);
    }, [onClose]);

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
                    <div className={styles.greeting}>
                        Привет! Я помощник BlackFox Nutrition — скоро смогу отвечать на вопросы
                        по твоему дневнику питания и прогрессу.
                    </div>

                    <div className={styles.suggestions}>
                        {SUGGESTIONS.map((suggestion) => (
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
