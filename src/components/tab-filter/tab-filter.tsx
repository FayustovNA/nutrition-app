import styles from './tab-filter.module.css'
import { FC } from "react"

interface TabsFilterProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}


const TabsFilter: FC<TabsFilterProps> = ({ activeTab, onTabChange }) => {

    const toggleTabs = (item: string) => {
        onTabChange(item);
    }

    return (
        <div className={styles.tabs}>
            <div className={styles.line}>

                <button className={`${styles.btn} ${activeTab === 'Н' && styles.active}`}
                    onClick={() => toggleTabs('Н')}
                >Н</button>

                <button className={`${styles.btn} ${activeTab === 'M' && styles.active}`}
                    onClick={() => toggleTabs('M')}
                >M</button>

                <button className={`${styles.btn} ${activeTab === '3M' && styles.active}`}
                    onClick={() => toggleTabs('3M')}
                >3M</button>

                <button className={`${styles.btn} ${activeTab === '6M' && styles.active}`}
                    onClick={() => toggleTabs('6M')}
                >6M</button>

            </div>
        </div >
    );
};

export default TabsFilter;