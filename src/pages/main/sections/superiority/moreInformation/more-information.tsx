import styles from './more-information.module.css';
import { dataSet } from '../../../../../utils/mock-moreInformation';

export const MoreInformation = () => {

    const items: any = dataSet[0];
    const list = dataSet[0].points;

    return (
        <div className={styles.content}>
            <img className={styles.img} src='nutrition-app/images/moreInfo2.png'></img>
            <div className={styles.main}>
                <h3 className={styles.h3}>Почему мы для каждого?</h3>
                <p className={styles.text}>
                    {items.intro}
                </p>
                <p className={styles.text}>
                    {items.mainpoint}
                </p>

                <div className={styles.list}>
                    <p className={styles.h4}>Мы для тебя, если ты</p>
                    {list.map((item, index) => {
                        return (
                            <p className={styles.list_item}><span className={styles.number}>{index + 1} </span>  {item}</p>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};