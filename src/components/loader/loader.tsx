import styles from './loader.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import Logo from '../../images/loader.svg?react';

export const Loader = () => {


    return (
        <div className={styles.loader_main}>
            <ModalOverlay />
            <p className={styles.logo}>
                <div className={styles.item}>
                    <Logo />
                    <div className={styles.loader}></div>
                </div>

            </p>
        </div>
    );
};