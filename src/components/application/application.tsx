import React from 'react';
import styles from './application.module.css';
import Input from '../../ui/inputs/input';
import useForm from '../../hooks/useForm';
import Checkbox from '../../ui/checkbox/checkbox';
import Button from '../../ui/button/button';

export const ApplicationWindow = ({ onClose }: { onClose: () => void }) => {

    const { values, handleChange } = useForm({
        first_name: '',
        phone: '',
        agree: false, // Тип согласия должен быть boolean
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!values.agree) return;

        const botToken = '7880785237:AAH6pJhlKTngLnkyQY3OzrI8HZt7Px8e3Xk';
        const chatId = '342866614';

        const message = `
📩 *Новая заявка от пользователя:*
- *Имя:* ${values.first_name}
- *Телефон:* ${values.phone}
        `;

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });
            onClose(); // Закрываем окно сразу после отправки
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };

    return (
        <div className={styles.content}>
            <img className={styles.img} src='nutrition-app/images/application/applay.png' alt="Welcome" />
            <h3 className={styles.h3}>Добро пожаловать в BFN!</h3>
            <p className={styles.text}>
                Тебя ждет увлекательная работа с питанием, образом жизни и привычками. Результат, который гарантруем - лучшая физическая форма!
            </p>
            <form className={styles.forms} onSubmit={handleSubmit}>
                <Input
                    placeholder="Имя"
                    name="first_name"
                    styled="main"
                    type="text"
                    onChange={handleChange}
                    value={values.first_name}
                    minLength={2}
                    errorMessage="Введите имя"
                    required
                />
                <Input
                    placeholder="Номер Telegram"
                    name="phone"
                    styled="main"
                    onChange={handleChange}
                    value={values.phone}
                    pattern="^\+?\d{1,3}[-\s]?\d{1,14}$"
                    maxLength={15}
                    minLength={10}
                    errorMessage="Введите корректный номер"
                    required
                />
                <div className={styles.checkbox}>
                    <Checkbox
                        name="agree"
                        label="Согласие на обработку персональных данных"
                        onChange={(e) =>
                            handleChange({
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-expect-error
                                target: { name: 'agree', value: e.target.checked }, // handle boolean
                            })
                        }
                        checked={values.agree}
                        required
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        variant="default"
                        size='width'
                        buttonHtmlType="submit"
                        disabled={!values.agree} // Кнопка активна только при согласии
                    >
                        <p className={styles.btntxt}>Отправить заявку</p>
                    </Button>
                </div>
            </form>
        </div>
    );
};