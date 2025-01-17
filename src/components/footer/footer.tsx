import styles from './footer.module.css';
import { useState } from 'react';
import Modal from '../modal/modal';
import { PolicyComp } from '../policy/policy';

export const Footer = () => {
    const [isOpenModal, setisOpenModal] = useState(false);

    const telegramm = 'https://t.me/blackfoxnutrition';
    const instagram = 'https://www.instagram.com/blackfox_nutrition';
    const support = 'https://t.me/nikolayfayustov';
    const youtube = 'https://www.youtube.com/@blackfoxnutrition';

    const openModal = () => setisOpenModal(true);
    const closeModal = () => setisOpenModal(false);

    // Получаем текущий год
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.line}></div>
                <p className={styles.footer_legal_copyright}>
                    © BlackFox Nutrition,  {currentYear} г.  Все права защищены.
                </p>
                <div className={styles.footer_legal_links}>
                    <a className={styles.link} onClick={openModal}>Политика конфиденциальности</a>
                    {/* <a className={styles.link} href={telegramm} target="_blank" rel="noopener noreferrer">Использование cookies</a> */}
                    <a className={styles.link} href={support} target="_blank" rel="noopener noreferrer">Получить обратную связь</a>
                    <a className={styles.link} href={telegramm} target="_blank" rel="noopener noreferrer">Telegram</a>
                    <a className={styles.link} href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
                    <a className={styles.link} href={instagram} target="_blank" rel="noopener noreferrer">Instagram*</a>
                </div>
            </div>
            {
                isOpenModal && (<Modal onClose={closeModal}>
                    <PolicyComp />
                </Modal>)
            }
        </div>
    );
};
