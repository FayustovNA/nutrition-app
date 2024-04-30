import styles from './item.module.css';

interface ItemBenefitsProps {
    data: {
        title: string,
        img: string,
        text: string,
    };
    index: any,
}

export const ItemBenefits = ({ data }: ItemBenefitsProps) => {
    return (
        <div className={styles.item}>
            <p className={styles.item_title}>{data.title}</p>
        </div>
    );
};