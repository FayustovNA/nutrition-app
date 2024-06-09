/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './setting.module.css'
import { useEffect } from 'react'
import { useDispatch } from '../../services/hooks'
import { fetchFatSecretMonthData } from '../../services/slices/fatSecretSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/root-reducer'
import Button from '../../ui/button/button'
import Modal from '../../components/modal/modal'
import { useState } from 'react'
import { getFatSecretRequestLink } from '../../api/fatsecret'

interface SettingsProps {
    type?: string;
    avatar?: any;
    username?: string;
    location?: string;
    target?: string;
    startWeigth?: number;
    targetWeigth?: number;
    startDate?: string;
    age?: number;
    email?: '',
    password?: '',
    confirmPassword?: '',
}

export const Settings: React.FC<SettingsProps> = () => {
    const dispatch = useDispatch();
    const User = useSelector((state: RootState) => state.userData);
    const FatSecretStatus = useSelector((state: RootState) => state.userData.fatsecret_account);

    useEffect(() => {
        dispatch(fetchFatSecretMonthData());
    }, [dispatch]);

    // const [profileData, setProfileData] = useState({});

    const [isOpenModal, setisOpenModal] = useState(false);

    const openModal = () => {
        setisOpenModal(true)
    }

    const closeModal = () => {
        setisOpenModal(false)
    }

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
                                <img src={User.avatar} alt="Аватар" className={styles.avatar} />
                            </div>
                            <h3 className={styles.username}>{User.username}</h3>
                        </div>

                        <div className={styles.item_grid}>
                            <p className={styles.id}>
                                <h4 className={styles.h4}>BlackFox ID</h4>
                                {User.email}
                            </p>
                            <div className={styles.list}>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Возраст</h4>
                                    {User.age}
                                </p>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Город</h4>
                                    {User.location}
                                </p>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Пароль</h4>
                                    {User.password}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button
                            variant='default'
                            size='large'
                            buttonHtmlType='submit'
                            onClick={openModal}
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
                            {User.startDate}
                        </p>

                        <div className={styles.list}>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Цель</h4>
                                {User.target}
                            </p>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Стартовый вес</h4>
                                {User.startWeigth}
                            </p>
                            <p className={styles.item}>
                                <h4 className={styles.h4}>Целевой вес</h4>
                                {User.targetWeigth}
                            </p>

                        </div>

                    </div>
                    <div className={styles.button}>
                        {FatSecretStatus === false ?
                            <Button
                                variant='default'
                                size='large'
                                color='green-blue'
                                buttonHtmlType='submit'
                                onClick={getFatSecretRequestLink}
                            ><p>Связать FatSecret</p>
                            </Button> :
                            <Button
                                variant='default'
                                color='green'
                                disabled
                                size='large'
                                buttonHtmlType='submit'
                            ><p>FatSecret связан</p>
                            </Button>}
                    </div>
                </div>

                <div className={styles.exit_btn}>
                    <Button
                        variant='default'
                        size='large'
                        buttonHtmlType='submit'
                        onClick={openModal}
                    >
                        < p className={styles.btntxt}>Выйти</p>
                    </Button>
                </div>
            </div>

            {
                isOpenModal && (<Modal onClose={closeModal} children={undefined}></Modal>)
            }
        </div >
    );
};