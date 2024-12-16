import styles from './more-info.module.css';
import { dataSet } from '../../../../../../src/utils/mock-moreInformation2';


export const MoreInfo = () => {

    const list: any = dataSet;

    return (
        <div className={styles.content}>
            <img className={styles.img} src='../../../../../images/moreInfo.png'></img>
            <div className={styles.main}>
                <h3 className={styles.h3}>О проекте BFN</h3>
                <div className={styles.list}>
                    {list.map((item: any) => {
                        return (
                            <div className={styles.list_items}>
                                {/* <p className={styles.number}>{item.number}</p> */}
                                <div className={styles.item}>
                                    <h4 className={styles.h4}>{item.title}</h4>
                                    <p className={styles.text}>{item.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div >
    );
};