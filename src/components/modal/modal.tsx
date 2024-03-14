import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { useEffect, FC, ReactNode } from "react";
import closeIcon from '../../images/close-button.svg'

interface IModal {
    onClose?: (() => void) | boolean | string | any;
    children: ReactNode;
}

const Modal: FC<IModal> = ({ children, onClose }) => {

    const onModalClose = () => {
        onClose()
    }

    useEffect(() => {
        const closeEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onModalClose()
            }
        }
        window.addEventListener('keydown', closeEsc)
        return () => window.removeEventListener('keydown', closeEsc)
    }, [])


    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onModalClose} />
            <div className={styles.modalwindow}>
                <img className={styles.closeicon} src={closeIcon} onClick={onModalClose} />
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div >
        </>,
        document.getElementById('portal')!
    )
}

export default Modal;