import styles from './sucess-signup.module.css';
import { Footer } from '../../components/footer/footer';


const SucessSignup: React.FC = () => {


    return (
        <div className={styles.content}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>Вы успешно зарегестрированы на</span>
                    <span> BlackFox Nutrition</span>
                </div>
                <div className={styles.message}>
                    Для дальнейшего входа в аккаунт проверьте почту и подтвердите email!
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default SucessSignup;