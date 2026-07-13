import { useState } from 'react';
import styles from './ai-fab.module.css';
import AiSpark from '../../images/header/AiSpark.svg?react';
import AiModal from '../ai-modal/ai-modal';
import { DiaryEntryLike } from '../../utils/aiDiaryContext';

interface AiFabProps {
    statsData?: DiaryEntryLike[];
    user?: string;
}

// Плавающая кнопка запуска AI-помощника — только на странице статистики
const AiFab: React.FC<AiFabProps> = ({ statsData, user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className={styles.fab} onClick={() => setIsOpen(true)} title="AI BF">
                <AiSpark />
                <span className={styles.label}>AI BF</span>
            </button>

            {isOpen && <AiModal onClose={() => setIsOpen(false)} statsData={statsData} user={user} />}
        </>
    );
};

export default AiFab;
