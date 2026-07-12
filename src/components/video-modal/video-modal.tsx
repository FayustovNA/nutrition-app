import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './video-modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import closeIcon from '../../images/close-button.svg';

interface VideoModalProps {
    videoId: string;
    onClose: () => void;
}

const VideoModal: FC<VideoModalProps> = ({ videoId, onClose }) => {
    useEffect(() => {
        const closeEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', closeEsc);
        return () => window.removeEventListener('keydown', closeEsc);
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={styles.modalwindow}>
                <img className={styles.closeicon} src={closeIcon} onClick={onClose} alt="Закрыть" />
                <div className={styles.player}>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </>,
        document.getElementById('portal')!
    );
};

export default VideoModal;
