import styles from './diary-panel.module.css'
import ItemDiary from './item/item'
import TabsFilter from '../tab-filter/tab-filter'
import { useState } from 'react'
import Modal from '../modal/modal'
import ModalDiary from './modal/modal-diary'
import { getFatSecretDiary } from '../../api/fatsecret'
import { Loader } from '../loader/loader'
import Refresh from '../../images/icon-status/Refresh.svg?react'
interface StatsDataItem {
    id?: any;
    date: any;
    calories_actual?: number;
    carbohydrate_actual?: number;
    fat_actual?: number;
    protein_actual?: number;
}

interface DiaryPanelProps {
    statsData: StatsDataItem[];
    user: any; // Данные приходят через пропс
    onRefresh: () => void;
}

export const DiaryPanel: React.FC<DiaryPanelProps> = ({ statsData, user, onRefresh }) => {
    const [activeTab, setActiveTab] = useState("Н");
    const [selectedItem, setSelectedItem] = useState(null);
    const [diaryData, setDiaryData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleItemClick = async (item: any) => {
        setSelectedItem(item);
        setLoading(true); // Устанавливаем состояние загрузки в true
        try {
            const response: any = await getFatSecretDiary(item.date, user);
            const data = response.food_entries.food_entry
            setDiaryData(data);
        } catch (error) {
            console.error('Error fetching diary data:', error);
        } finally {
            setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
        }
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setDiaryData(null);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const getFilteredData = () => {
        const today = new Date(); // Текущая дата
        const ranges: { [key: string]: number } = {
            'Н': 7,
            'M': 30,
            '3M': 90,
            '6M': 180,
        };

        // Определяем, сколько дней от текущей даты нужно учитывать
        const rangeDays = ranges[activeTab];

        if (rangeDays) {
            // Фильтруем данные по диапазону
            return statsData.filter(item => {
                const itemDate = new Date(item.date);
                const diffDays = (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
                return diffDays <= rangeDays;
            });
        }

        // Если активная вкладка не соответствует диапазону, возвращаем все данные
        return statsData;
    };

    const filteredData = getFilteredData(); // Переворачиваем, чтобы отображать от последних к первым

    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Последние дневники</h3>
            <button className={styles.refresh} onClick={onRefresh}><Refresh />Обновить</button>
            <div className={styles.grid_diary}>
                {filteredData.map((item: any) => {
                    return (
                        <ItemDiary
                            key={item.id}
                            calories={item.calories_actual}
                            carbohydrate={item.carbohydrate_actual}
                            date={item.date}
                            fat={item.fat_actual}
                            protein={item.protein_actual}
                            onclick={() => handleItemClick(item)}>
                        </ItemDiary>
                    );
                })}
            </div>
            <div className={styles.filter}>
                <TabsFilter activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            {selectedItem && (
                loading ? (
                    <Loader />
                ) : (
                    <Modal onClose={handleCloseModal}>
                        <ModalDiary data={diaryData}></ModalDiary>
                    </Modal>
                )
            )}
        </div >
    );
};
