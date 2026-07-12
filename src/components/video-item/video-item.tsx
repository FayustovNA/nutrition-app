import styles from './video-item.module.css';
import { useState } from 'react';
import Play from '../../images/header/Video.svg?react';

interface VideoItemProps {
    id: string;
    title?: string;
    number?: number;
    onPlay: (id: string) => void;
}

export const VideoItem: React.FC<VideoItemProps> = ({ id, title, number, onPlay }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.item}>
            <div
                className={styles.cover}
                onClick={() => onPlay(id)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img className={styles.img} src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} />
                <div className={styles.playIcon}>
                    <Play />
                </div>
                {isHovered && <p className={styles.hover_text}>Смотреть</p>}
            </div>
            <div className={styles.maininfo}>
                {number !== undefined && <p className={styles.number}>{number}</p>}
                <h3 className={styles.title}>{title}</h3>
            </div>
        </div>
    );
};
