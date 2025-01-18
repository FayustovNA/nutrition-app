import styles from './sucess-signup.module.css';
import { Footer } from '../../components/footer/footer';


const SucessSignup: React.FC = () => {


    return (
        <div className={styles.content}>
            <div className={styles.body}>
                <p className={styles.title}>
                    <span>Вы успешно зарегестрированы на</span>
                    <span> BlackFox Nutrition</span>
                </p>
                <p className={styles.message}>
                    Для дальнейшего входа в аккаунт проверьте почту и подтвердите email!
                </p>
            </div>
            <Footer />
        </div >
    );
};

export default SucessSignup;