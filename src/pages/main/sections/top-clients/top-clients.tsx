import styles from './top-clients.module.css';
import Slider, { Settings } from 'react-slick';
import { dataSet } from '../../../../utils/mocks-top-clients';
import { useState } from 'react';
import Modal from '../../../../components/modal/modal';
import { ClientInfo } from './modal-item/modal-item';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SectionTopClients = () => {

    const items = dataSet;

    const [isOpenModal, setisOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();


    const settings: Settings = {
        centerMode: false,
        centerPadding: '10px',
        slidesToShow: 10,
        speed: 900,
        slidesToScroll: 2,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 381,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
        ],
    };


    const openModal = (item: any) => {
        setisOpenModal(true);
        setSelectedItem(item);
    }

    const closeModal = () => {
        setisOpenModal(false)
    }

    const renderSlides = items.map((item, index) => {
        return (
            <div key={index} className={styles.item}>
                <div className={styles.avatar} onClick={() => openModal(item)}>
                    <img className={styles.img} src={item.img}></img>
                </div>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.info}>{item.info}</p>
            </div>
        );
    });

    return (
        <div className={styles.section} >

            <div className={styles.section_content}>
                <div className={styles.section_titles}>
                    <h3 className={styles.title}>
                        С кем работали
                    </h3>
                </div>
                <div className={styles.slider}>
                    {renderSlides.length > 0 ? < Slider {...settings}>{renderSlides}</Slider> : null}
                </div>
            </div>
            {
                isOpenModal && (<Modal onClose={closeModal}>
                    <ClientInfo data={selectedItem} />
                </Modal>)
            }
        </div >
    )
}