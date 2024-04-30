import styles from './accordion-item.module.css';
import Chevron from '../../../../../images/chevron.svg';


type AccordionItemProps = {
    title?: string,
    text?: string,
    img?: string,
    index: number,
    isOpen: boolean;
    toggleAccordion: () => void;
}

export const AccordionItem = ({ title, text, img, index, isOpen, toggleAccordion }: AccordionItemProps) => {

    return (
        <div className={styles.content}>
            <button className={styles.btn} onClick={toggleAccordion}>
                <p className={styles.title}> <span className={styles.number}>{index + 1}</span>{title}</p>
                <img className={`${styles.chevron} ${isOpen ? styles.open : ""}`} src={Chevron} />
            </button>
            {isOpen &&
                <><p className={styles.text}>{text}
                </p>
                    <img className={styles.img} src={img} />
                </>
            }
        </div >
    );
};