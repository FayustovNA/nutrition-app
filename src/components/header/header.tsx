import styles from './header.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../images/logo.svg?react';
import Button from '../../ui/button/button';
import { HeaderItem } from './item/item';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/root-reducer';
import AvatarItem from './avatar-item/avatar-item';
import Telegram from '../../images/social/telegram.svg';


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

                <div className={styles.items}>
                    {isUser == "user" ?
                        <HeaderItem
                            title={'Моя статистика'}
                            path={'/stats'}
                            selected={selected}
                            setSelected={setSelected} >
                        </HeaderItem> : null}
                </div>

                <div className={styles.items}>
                    {isUser == "coach" ?
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

                    <HeaderItem
                        title={'Калькуляторы'}
                        path={'/calculators'}
                        selected={selected}
                        setSelected={setSelected} >
                    </HeaderItem>
                </div>

                <div className={styles.login_block}>

                    <a className={styles.telegram} href={'https://t.me/nikolayfayustov'}>
                        <img className={styles.icon} src={Telegram} alt="telegram" />
                    </a>

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
                                < p className={styles.btntxt}>Войти</p>
                            </Button>
                        </div>

                    }
                </div>

            </div>
        </div >
    );
};