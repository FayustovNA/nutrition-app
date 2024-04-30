import styles from './road-map.module.css';
import { AccordionItem } from './accordion-item/accordion-item';
import { dataSet } from '../../../../utils/mock-road';
import { useState } from 'react';

export const SectionRoadMap = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleToggle = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    }

    return (
        <div className={styles.section} >
            <div className={styles.section_titles}>
                <h3 className={styles.title}>
                    Порядок работы
                </h3>
            </div>
            <div className={styles.accordion}>
                <div className={styles.grid}>
                    {dataSet.map((item, index) => (
                        < AccordionItem
                            key={index}
                            index={index}
                            isOpen={index === activeIndex}
                            toggleAccordion={() => handleToggle(index)}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </div >
    )
}
