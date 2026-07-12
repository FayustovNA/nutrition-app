import { useState } from 'react';
import styles from './ai-fab.module.css';
import AiSpark from '../../images/header/AiSpark.svg?react';
import AiModal from '../ai-modal/ai-modal';

// Плавающая кнопка запуска AI-помощника — только на странице статистики
const AiFab = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className={styles.fab} onClick={() => setIsOpen(true)} title="AI BF">
                <AiSpark />
                <span className={styles.label}>AI BF</span>
            </button>

            {isOpen && <AiModal onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default AiFab;
