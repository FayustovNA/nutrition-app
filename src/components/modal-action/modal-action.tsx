import styles from './modal-action.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { useEffect, FC, ReactNode } from "react";

interface IModal {
    onClose?: (() => void) | boolean | string | any;
    children: ReactNode;
}

const ModalAction: FC<IModal> = ({ children, onClose }) => {

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
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div >
        </>,
        document.getElementById('portal')!
    )
}

export default ModalAction;