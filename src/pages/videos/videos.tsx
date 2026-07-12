import { useState } from 'react';
import styles from './videos.module.css';
import { VideoItem } from '../../components/video-item/video-item';
import VideoModal from '../../components/video-modal/video-modal';
import { videoDataSet } from '../../utils/mock-videos';

export const Videos = () => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Видео
            </h1>
            <div className={styles.grid}>
                {videoDataSet.map((video) => (
                    <VideoItem
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        onPlay={setActiveVideoId}
                    />
                ))}
            </div>

            {activeVideoId && (
                <VideoModal videoId={activeVideoId} onClose={() => setActiveVideoId(null)} />
            )}
        </div>
    );
};
