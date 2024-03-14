import styles from './first-info.module.css';


export const SectionFirstInfo = () => {


    return (
        <div className={styles.section} >
            <section className={styles.section_banner}>
                <h3 className={styles.section_banner_content}>
                    BlackFox Nutrition
                    <p className={styles.section_banner_subtitle}>Приводим в форму. Легко. Комфортно. Навсегда.</p>
                </h3>
            </section>
        </div >
    )
}