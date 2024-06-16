import styles from './diary-panel.module.css'
import { RootState } from '../../services/root-reducer'
import { useSelector } from 'react-redux'
import ItemDiary from './item/item'
import TabsFilter from '../tab-filter/tab-filter'
import { useState } from 'react'
import Modal from '../modal/modal'
import ModalDiary from './modal/modal-diary'
import { getFatSecretDiary } from '../../api/fatsecret'
import ModalOverlay from '../modal-overlay/modal-overlay'

export const DiaryPanel = () => {
    const monthData = useSelector((state: RootState) => state.fatSecretDataMonth.month.day);
    const [activeTab, setActiveTab] = useState("Н");

    const [selectedItem, setSelectedItem] = useState(null);
    const [diaryData, setDiaryData] = useState(null);
    const [loading, setLoading] = useState(false); // Добавлено состояние для отслеживания загрузки

    const handleItemClick = async (item: any) => {
        setSelectedItem(item);
        setLoading(true); // Устанавливаем состояние загрузки в true
        try {
            console.log(item.date_int)
            const response = await getFatSecretDiary(item.date_int);
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
                        <ItemDiary
                            key={item.date_int}
                            calories={item.calories}
                            carbohydrate={item.carbohydrate}
                            date_int={item.date_int}
                            fat={item.fat}
                            protein={item.protein}
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
                    <div className={styles.loader}>
                        <ModalOverlay />
                        <p className={styles.load}>Loading...</p>
                    </div>

                    // Отображаем загрузчик, пока данные загружаются
                ) : (
                    <Modal onClose={handleCloseModal}>
                        <ModalDiary data={diaryData}></ModalDiary>
                    </Modal>
                )
            )}
        </div >
    );
};
