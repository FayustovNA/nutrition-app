import styles from './diary-panel.module.css'
import { RootState } from '../../services/root-reducer'
import { useSelector } from 'react-redux'
import ItemDiary from './item/item'
import TabsFilter from '../tab-filter/tab-filter'
import { useState } from 'react'


export const DiaryPanel = () => {
    const monthData = useSelector((state: RootState) => state.fatSecretDataMonth.month.day);
    const [activeTab, setActiveTab] = useState("Н");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    }

    const getFilteredData = () => {
        switch (activeTab) {
            case 'Н':
                return monthData.slice(-7);
            case 'M':
                return monthData.slice(-30);
            case '3M':
                return monthData.slice(-90);
            case '6M':
                return monthData.slice(-180);
            default:
                return monthData;
        }
    }

    const filteredData = getFilteredData().reverse();

    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Последние дневники</h3>
            <div className={styles.grid_diary}>
                {filteredData.map((item: any) => {
                    return (
                        <ItemDiary {...item}></ItemDiary>
                    );
                })}
            </div>
            <div className={styles.filter}>
                <TabsFilter activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
        </div>
    );
};
