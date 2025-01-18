import styles from './user-activate.module.css';
import { Footer } from '../../components/footer/footer';
import Button from '../../ui/button/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { activateUser } from '../../api/auth';
import { Loader } from '../../components/loader/loader';

const UserActivate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams(); // Для получения параметров из URL
    const navigate = useNavigate(); // Для перенаправления пользователя

    // Извлечение uid и token из URL
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const handleActivation = async () => {
        if (!uid || !token) {
            setError('Не удалось извлечь параметры активации из URL.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await activateUser(uid, token); // Вызов вынесенной функции
            navigate('/login'); // Перенаправление при успешной активации
        } catch (err: any) {
            setError(err.message || 'Сетевая ошибка. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles.content}>
            <div className={styles.position}>
                <h2 className={styles.title}>
                    <span>Активация аккаунта</span>
                    <span>BlackFox Nutrition</span>
                </h2>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.button}>
                    <Button
                        variant="default"
                        size="large"
                        buttonHtmlType="button"
                        onClick={handleActivation}
                        disabled={isLoading} // Блокируем кнопку при загрузке
                    >
                        Нажмите для активации
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserActivate;