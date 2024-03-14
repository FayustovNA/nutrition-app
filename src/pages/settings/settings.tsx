/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './setting.module.css';
// import Modal from '../../components/modal/modal';
// import { useState } from 'react';


interface SettingsProps {
    type?: string;
    startdate?: Date;
    avatar?: any;
    username?: string;
    location?: string;
    target?: string;
    startWeigth?: number;
    targetWeigth?: number;
    age?: number;
    email?: '',
    password?: '',
    confirmPassword?: '',
}

export const Settings: React.FC<SettingsProps> = () => {
    const username = 'Иван Иванов'
    const email = 'i.i.gmail.com'
    const age = '45'
    const location = 'Samara'
    const target = 'Рекомпозиция'
    const startWeigth = 105
    const targetWeigth = 88
    const startdate: Date = new Date(2023, 6, 28);

    // const [profileData, setProfileData] = useState({});

    // const [isOpenModal, setisOpenModal] = useState(false);

    // const openModal = () => {
    //     setisOpenModal(true)
    // }

    // const closeModal = () => {
    //     setisOpenModal(false)
    // }

    return (
        <div className={`${styles.accountsummary}`}>
            <h2 className={styles.title}>
                Настройки учетной записи
            </h2>

            <div className={styles.content}>

                <div className={styles.maininfo}>

                    <div className={styles.maininfolabel}>
                        <h3 className={styles.labeltitle}>
                            Обзор учетной записи
                        </h3>
                        <div className={styles.avatar_username}>
                            <div className={styles.avatarbox}>
                                <img src={'../../images/avatar_def.png'} alt="Аватар" className={styles.avatar} />
                            </div>
                            <h3 className={styles.username}>{username}</h3>
                        </div>
                    </div>

                    <div className={styles.maininfocontent}>

                        <div className={styles.generalinfo}>
                            <p className={styles.iteminfo}>
                                <h4 className={styles.iteminfotitle}>BlackFox ID</h4>
                                {email}
                            </p>
                            <div className={styles.iteminforow}>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Возраст</h4>
                                    {age}
                                </p>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Город</h4>
                                    {location}
                                </p>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Пароль</h4>
                                    {email}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className={styles.maininfo}>
                    <h3 className={styles.maininfolabel}>
                        Процесс
                    </h3>
                    <div className={styles.maininfocontent}>

                        <div className={styles.generalinfo}>
                            <p className={styles.iteminfo}>
                                <h4 className={styles.iteminfotitle}>Дата старта</h4>
                                {startdate.toLocaleDateString()}
                            </p>
                            <div className={styles.iteminforow}>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Цель</h4>
                                    {target}
                                </p>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Стартовый вес</h4>
                                    {startWeigth}
                                </p>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Целевой вес</h4>
                                    {targetWeigth}
                                </p>
                                <p className={styles.iteminfo}>
                                    <h4 className={styles.iteminfotitle}>Текущий вес</h4>
                                    {targetWeigth}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* {
                isOpenModal && (<Modal onClose={closeModal}></Modal>)
            } */}
        </div >

    );
};