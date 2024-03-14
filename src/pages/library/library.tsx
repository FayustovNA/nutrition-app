import { LibraryItem } from '../library/library-item/library-item';
import styles from './library.module.css';
import { dataSet } from '../../utils/mock-labrary'


export const Library = () => {

    const items = dataSet;

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>
                Полезная библиотека
            </h1>
            <div className={styles.grid}>
                {items.map((item, index) => {
                    return (
                        <LibraryItem
                            number={index + 1}
                            key={index}
                            img={item.img}
                            title={item.title}
                            link={item.link}
                            section={item.section}
                            type={'default'}
                        />
                    );
                })}
            </div>
        </div>
    );
};
