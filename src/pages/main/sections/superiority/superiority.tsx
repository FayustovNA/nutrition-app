import styles from './superiority.module.css';
import video from '../../../../videos/films.mp4'


export const SectionSuperiority = () => {


    return (
        <div className={styles.section} >
            <div className={styles.videobox}>
                <video src={video} autoPlay loop muted className={styles.video} />
            </div>

        </div >
    )
}