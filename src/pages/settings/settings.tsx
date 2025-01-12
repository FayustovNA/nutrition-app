/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './setting.module.css'
import { useEffect } from 'react'
import { useDispatch } from '../../services/hooks'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '../../services/root-reducer'
import Button from '../../ui/button/button'
import { useState } from 'react'
import { getFatSecretRequestLink } from '../../api/fatsecret'
import { logoutUser } from '../../services/slices/userSlice'
import SetProfileSetting from '../../components/modal-action/set-profile-setting/set-profile-setting';
import SetAvatar from '../../components/modal-action/avatar/avatar';
import ModalAction from '../../components/modal-action/modal-action';
import Avatar from '../../images/avatar_def.png'
import { fetchUserData } from '../../services/slices/userSlice';
import { getProjectBySearch } from '../../services/slices/projectSlice';
import { Loader } from '../../components/loader/loader';
interface SettingsProps {
    type?: string;
    image?: any;
    username?: string;
    target?: string;
    startWeigth?: number;
    targetWeigth?: number;
    startDate?: string;
}

export const Settings: React.FC<SettingsProps> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state: RootState) => state.userData);
    const Projects = useSelector((state: RootState) => state.projectData);
    const Project = useSelector((state: RootState) => state.projectData.projectData);
    const FatSecretStatus = useSelector((state: RootState) => state.userData.fatsecret_account);
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const [isOpenModal, setisOpenModal] = useState(false);

    const imageUrl = User.image ? User.image.replace('http://localhost', '') : Avatar;

    // Флаги загрузки и ошибки
    const isLoading = Projects.getProjectRequest;
    const hasError = Projects.getProjectFailed;
    const isUserRole = User.role === 'user';

    // Эффект для загрузки данных пользователя и проекта
    useEffect(() => {
        if (User.username) {
            dispatch(fetchUserData());
            dispatch(getProjectBySearch(User.username));
        }
    }, [dispatch, User.username]);

    // Обработчики модальных окон
    const openModal = () => setisOpenModal(true);
    const closeModal = () => setisOpenModal(false);
    const openAvatarModal = () => setAvatarModalOpen(true);
    const closeAvatarModal = () => setAvatarModalOpen(false);

    // Обработчик выхода
    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };

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
                                <img
                                    src={imageUrl || Avatar}
                                    alt="Аватар"
                                    className={styles.avatar}
                                    onClick={openAvatarModal}
                                />
                            </div>
                        </div>

                        <div className={styles.item_grid}>
                            <p className={styles.id}>
                                <h4 className={styles.h4}>BlackFox ID</h4>
                                {User.username}
                            </p>
                            <div className={styles.list}>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Фамилия</h4>
                                    {User.last_name}
                                </p>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>Имя</h4>
                                    {User.first_name}
                                </p>
                                <p className={styles.item}>
                                    <h4 className={styles.h4}>E-mail</h4>
                                    {User.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            variant='default'
                            size='width'
                            buttonHtmlType='submit'
                            onClick={openModal}
                        >
                            < p className={styles.btntxt}>Изменить данные</p>
                        </Button>
                        <Button
                            variant='default'
                            size='width'
                            buttonHtmlType='submit'
                            onClick={() => navigate('/reset-password')}
                        >
                            < p className={styles.btntxt}>Изменить пароль</p>
                        </Button>
                    </div>

                </div>

                {isUserRole && (
                    <div className={styles.info_block}>

                        <h3 className={styles.h3}>
                            Информация процесса
                        </h3>

                        <div className={styles.main_process}>

                            {/* Учет состояния загрузки и ошибок */}
                            {isLoading ? (
                                <Loader />
                            ) : hasError ? (
                                <p className={styles.error}>Ваш проект пока не создан!</p>
                            ) : (
                                <div className={styles.process}>
                                    <p className={styles.item}>
                                        <h4 className={styles.h4}>Ваш тренер</h4>
                                        {Project?.coach.username || 'Не назначен'}
                                    </p>
                                    <p className={styles.item}>
                                        <h4 className={styles.h4}>Дата старта</h4>
                                        {Project?.start_date || 'Не назначена'}
                                    </p>
                                    <p className={styles.item}>
                                        <h4 className={styles.h4}>Стартовый вес</h4>
                                        {Project?.start_weight || 'Не внесен'}
                                    </p>
                                    <p className={styles.item}>
                                        <h4 className={styles.h4}>Целевой вес</h4>
                                        {Project?.target_weight || 'Не внесен'}
                                    </p>
                                </div>
                            )}

                            <div className={styles.list}>

                                <div className={styles.nutrition}>
                                    <div className={styles.buttons}>
                                        {FatSecretStatus === false ?
                                            <Button
                                                variant='default'
                                                size='width'
                                                color='green-blue'
                                                buttonHtmlType='submit'
                                                onClick={getFatSecretRequestLink}
                                            ><p>Связать FatSecret</p>
                                            </Button> :
                                            <Button
                                                variant='default'
                                                color='green'
                                                disabled
                                                size='width'
                                                buttonHtmlType='submit'
                                            ><p>FatSecret связан</p>
                                            </Button>}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>)}

                <div className={styles.exit_btn}>
                    <Button
                        variant='default'
                        size='width'
                        buttonHtmlType='submit'
                        onClick={handleLogout} // Связываем кнопку с функцией handleLogout
                    >
                        < p className={styles.btntxt}>Выйти</p>
                    </Button>
                </div>

            </div>

            {
                isOpenModal && (<ModalAction onClose={closeModal}>
                    <SetProfileSetting onClose={closeModal} />
                </ModalAction>)
            }
            {
                isAvatarModalOpen && (<ModalAction onClose={closeAvatarModal}>
                    <SetAvatar onClose={closeAvatarModal} />
                </ModalAction>)
            }
        </div >
    );
};