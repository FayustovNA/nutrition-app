import styles from './benefits.module.css';
import { dataSet } from '../../../../utils/mock-benefits';

export const SectionBenefits = () => {

    const items = dataSet;

    return (
        <div className={styles.section} >
            <div className={styles.section_titles}>
                <h3 className={styles.title}>
                    Что ты получить по итогу работы?
                </h3>
            </div>
            <div className={styles.content}>
                <div className={styles.grid}>
                    {items.map((item, index) => {
                        return (
                            <div key={index} className={styles.item}>
                                <img className={styles.img} src={item.img}>
                                </img>
                                <p className={styles.text}>{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>


        </div >
    )
}