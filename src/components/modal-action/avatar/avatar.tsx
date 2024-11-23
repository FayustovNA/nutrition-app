import React, { useState } from 'react';
import styles from './avatar.module.css';
import Input from '../../../ui/inputs/input';
import useForm from '../../../hooks/useForm';
import Button from '../../../ui/button/button';
import { useDispatch } from '../../../services/hooks';
import { updateUser } from '../../../services/slices/userSlice';
import { Loader } from '../../loader/loader';

interface SetAvatarProps {
    image?: any;
    onClose: () => void;
}

const SetAvatar: React.FC<SetAvatarProps> = ({ onClose }) => {
    const dispatch = useDispatch();

    const { values, setValues } = useForm({
        image: '',
    });

    const [isLoading, setIsLoading] = useState(false); // Добавляем состояние загрузки

    // Обработчик изменения файла
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (files && files[0]) {
            const file = files[0];
            setValues((prevValues) => ({
                ...prevValues,
                image: file,
            }));
        }
    };

    // Обработчик сохранения аватарки
    const handleSaveAvatar = async () => {
        if (!values.image) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', values.image);

        // Проверяем FormData перед отправкой
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        setIsLoading(true); // Включаем состояние загрузки

        try {
            await dispatch(updateUser(formData));
            onClose(); // Закрытие модального окна
        } catch (error) {
            console.error('Error updating avatar:', error);
        } finally {
            setIsLoading(false); // Выключаем состояние загрузки
        }
    };

    return (
        <div className={styles.content}>
            <h3 className={styles.h3}>Обновить аватарку</h3>
            {isLoading ? ( // Если идет загрузка, отображаем лоадер
                <Loader />
            ) : (
                <div className={styles.forms}>
                    <Input
                        title="Добавьте изображение"
                        placeholder={'Добавьте изображение'}
                        name="image"
                        type="file"
                        styled="main"
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.buttons}>
                        <Button
                            variant="default"
                            size="large"
                            buttonHtmlType="button"
                            onClick={onClose}
                        >
                            <p className={styles.btntxt}>Отменить</p>
                        </Button>
                        <Button
                            variant="default"
                            size="large"
                            buttonHtmlType="submit"
                            onClick={handleSaveAvatar}
                        >
                            <p className={styles.btntxt}>Сохранить</p>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetAvatar;