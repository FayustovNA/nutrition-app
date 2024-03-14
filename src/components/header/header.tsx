import styles from './header.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../images/logo.svg?react';
import Button from '../../ui/button/button';
import { HeaderItem } from './item/item';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/root-reducer';
import AvatarItem from './avatar-item/avatar-item';


export const Header = () => {
    const [selected, setSelected] = useState('');
    const isUser = useSelector((state: RootState) => state.userData.role);
    const isLoggedIn = useSelector((state: RootState) => state.userData.isLoggedIn);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setSelected(location.pathname)
    }, [location])

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className={styles.header}>
            <div className={styles.menu}>
                <div className={styles.logo}>
                    <NavLink to={'/'}>
                        <Logo />
                    </NavLink>
                </div>

                {isLoggedIn ?
                    <div
                        className={styles.avatar_btn}>
                        <AvatarItem />
                    </div>
                    : <div
                        className={styles.button}>
                        <Button
                            variant={'default'}
                            size={'small'}
                            onClick={handleClick}>
                            < p className={styles.btntxt}> Войти</p>
                        </Button>
                    </div>

                }

                <div className={styles.items}>
                    {isLoggedIn ?
                        <HeaderItem
                            title={'Клиенты'}
                            path={'/clients'}
                            selected={selected}
                            setSelected={setSelected} >
                        </HeaderItem> : null}
                </div>

                <div className={styles.items}>

                    <HeaderItem
                        title={'Библиотека'}
                        path={'/library'}
                        selected={selected}
                        setSelected={setSelected} >
                    </HeaderItem>
                </div>

                <div className={styles.items}>
                    {isUser == "isUser" ?
                        <HeaderItem
                            title={'Моя статистика'}
                            path={'/statistics'}
                            selected={selected}
                            setSelected={setSelected} >
                        </HeaderItem> : null}
                </div>
            </div>
        </div >
    );
};