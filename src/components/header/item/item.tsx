import styles from './item.module.css'
import { NavLink } from 'react-router-dom';


interface HeaderItemProps {
    title: string;
    path: string;
    selected: string;
    setSelected: (path: string) => void;
    children?: React.ReactNode;
}


export const HeaderItem: React.FC<HeaderItemProps> = ({
    title,
    children,
    path,
    selected,
    setSelected
}) => {
    return (
        <NavLink to={path} className={`${styles.item} ${selected === path && styles.active}`} onClick={() => setSelected(path)}>
            <div className={styles.content}>
                <div className={`${styles.icon} ${selected === path && styles.active}`}>
                    {children}
                </div>
                <h2 className={`${styles.title} ${selected === path && styles.active}`}>
                    {title}
                </h2>
            </div>
        </NavLink>
    );
};
