import React from 'react'
import styles from './item.module.css'


interface ItemTargetProps {
    title?: string;
    children?: any;
}


const ProcessItem: React.FC<ItemTargetProps> = ({ title, children }) => {

    return (
        <div className={styles.item}>
            <h4 className={styles.title}>{title}
            </h4>
            <div className={styles.units}>
                {children}
            </div >
        </div >
    );
};

export default ProcessItem;
