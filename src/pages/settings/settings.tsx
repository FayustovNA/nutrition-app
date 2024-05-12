/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './setting.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/root-reducer';
import Button from '../../ui/button/button';
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

    const Avatar = useSelector((state: RootState) => state.userData.avatar);

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
        <div className={`${styles.account_settings}`}>

            <h2 className={styles.title}>
                Настройки учетной записи
            </h2>

            <div className={styles.content}>

                <div className={styles.info_block}>

                    <h3 className={styles.h3}>
                        Обзор учетной записи
                    </h3>

                    <div className={styles.general}>

                        <div className={styles.avatar_user}>
                            <div className={styles.avatarbox}>
                                <img src={Avatar} alt="Аватар" className={styles.avatar} />
                            </div>
                            <h3 className={styles.username}>{username}</h3>
                        </div>

                        <div className={styles.item_grid}>
                            <p className={styles.id}>
                                <h4 className={styles.h4}>BlackFox ID</h4>
                                {email}
                            </p>
                            <div className={styles.list}>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Возраст</h4>
                                    {age}
                                </p>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Город</h4>
                                    {location}
                                </p>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Пароль</h4>
                                    {email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.button}>
                        <Button
                            variant='default'
                            size='large'
                            buttonHtmlType='submit'
                        >
                            < p className={styles.btntxt}>Изменить данные</p>
                        </Button>
                    </div>
                </div>


                <div className={styles.info_block}>

                    <h3 className={styles.h3}>
                        Процесс
                    </h3>

                    <div className={styles.general}>

                        <p className={styles.item}>
                            <h4 className={styles.h4}>Дата старта</h4>
                            {startdate.toLocaleDateString()}
                        </p>

                        <div className={styles.list}>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Цель</h4>
                                {target}
                            </p>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Стартовый вес</h4>
                                {startWeigth}
                            </p>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Целевой вес</h4>
                                {targetWeigth}
                            </p>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Текущий вес</h4>
                                {targetWeigth}
                            </p>

                        </div>

                    </div>

                    <div className={styles.button}>
                        <Button
                            variant='default'
                            size='large'
                            buttonHtmlType='submit'
                        >
                            < p className={styles.btntxt}>Изменить данные</p>
                        </Button>
                    </div>
                </div>

            </div>

            {/* {
                isOpenModal && (<Modal onClose={closeModal}></Modal>)
            } */}
        </div >

    );
};