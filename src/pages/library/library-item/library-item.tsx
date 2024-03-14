import styles from '../library-item/library-item.module.css';
import { useState } from 'react';


interface LibraryItemProps {
    img?: string;
    title?: string;
    link?: string;
    section?: string;
    number?: number;
    type?: 'default'
}

export const LibraryItem: React.FC<LibraryItemProps> = ({
    img,
    link,
    title,
    section,
    number,
}) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    const onClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <div className={styles.item}>
            <div className={styles.cover}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <img className={styles.img} src={img} />
                {isHovered && <p className={styles.hover_text}>Изучить</p>}
            </div>
            <div className={styles.maininfo}>
                <p className={styles.number}>{number}</p>
                <div className={styles.titles}>
                    <h3 className={styles.title}>{title}</h3>
                    <h4 className={styles.section}>{section}</h4>
                </div>
            </div>
        </div>
    );
};