import styles from './footer.module.css';


export const Footer = () => {
    const telegramm = 'https://t.me/blackfoxnutrition'
    const instagram = 'https://t.me/blackfoxnutrition'
    const support = 'https://t.me/nikolayfayustov'


    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.line}></div>
                <p className={styles.footer_legal_copyright}>
                    © BlackFox Nutrition, 2024 г. Все права защищены.
                </p>
                <div className={styles.footer_legal_links}>
                    <a className={styles.link} href={telegramm}>Политика конфиденциальности</a>
                    <a className={styles.link} href={telegramm}>Использование cookies</a>
                    <a className={styles.link} href={support}>Получить обратную связь</a>
                    <a className={styles.link} href={telegramm}>Telegram</a>
                    <a className={styles.link} href={instagram}>YouTube</a>
                    <a className={styles.link} href={instagram}>Instagram*</a>
                </div>
            </div>
        </div>
    )
}
