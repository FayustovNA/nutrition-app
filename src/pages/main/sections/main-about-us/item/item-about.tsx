import styles from './item-about.module.css';
import { useState } from 'react';

interface ItemAboutProps {
    data: {
        title: string,
        subtitle: string,
        img: string,
        text: string,
    };
    index: any,
}

export const ItemAbout = ({ data }: ItemAboutProps) => {

    const [isContent1Visible, setIsContent1Visible] = useState(false);

    const handleButtonClick = () => {
        setIsContent1Visible(!isContent1Visible);
    };

    return (
        <div className={styles.content}>
            {!isContent1Visible ? <div className={`${styles.item} ${isContent1Visible ? styles.fadeOut : styles.fadeIn}`} style={{ backgroundImage: `url(${data.img})`, backgroundSize: 'cover' }} onClick={handleButtonClick}>
                {/* <p className={styles.number_item}>{index + 1}</p> */}
                <p className={styles.item_title}>{data.title}</p>
                <p className={styles.item_subtitle}>{data.subtitle}</p>
            </div> :
                <div className={`${styles.item_back} ${isContent1Visible ? styles.fadeIn : styles.fadeOut}`} onClick={handleButtonClick}>
                    <h4 className={styles.title}>{data.title}</h4>
                    {/* <p className={styles.number}>{index + 1}</p> */}
                    <p className={styles.text}>{data.text}</p>
                </div>}
        </div>
    );
};