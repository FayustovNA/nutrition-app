import React, { useState } from 'react';
import styles from './avatar.module.css';
// import Input from '../../../ui/inputs/input';
import useForm from '../../../hooks/useForm';
import Button from '../../../ui/button/button';
import { useDispatch } from '../../../services/hooks';
import { updateUser } from '../../../services/slices/userSlice';
import { Loader } from '../../loader/loader';
import { useRef } from 'react';


interface SetAvatarProps {
    image?: any;
    onClose: () => void;
}

const SetAvatar: React.FC<SetAvatarProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Внимание, здесь мы используем useForm для хранения значения изображения
    const { values, setValues } = useForm({
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            console.log("Selected file:", file);  // Логируем выбранный файл
            setValues({ ...values, image: file });
        } else {
            console.log("No file selected.");  // Логируем отсутствие файла
        }
    };

    const handleSaveAvatar = async () => {
        if (!values.image) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', values.image);

        // Проверка перед отправкой
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        setIsLoading(true);

        try {
            const response = await dispatch(updateUser(formData));
            console.log('Avatar update response:', response);
            onClose();
        } catch (error) {
            console.error('Error updating avatar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.content}>
            <h3 className={styles.h3}>Обновить аватарку</h3>
            {isLoading ? ( // Если идет загрузка, отображаем лоадер
                <Loader />
            ) : (
                <div className={styles.forms}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        required
                    />
                    {/* <Input
                        title="Добавьте изображение"
                        placeholder={'Добавьте изображение'}
                        name="image"
                        type="file"
                        styled="main"
                        onChange={handleChange}
                        required
                    /> */}
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