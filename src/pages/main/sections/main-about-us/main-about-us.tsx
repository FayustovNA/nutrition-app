import styles from './main-about-us.module.css';
import Slider, { Settings } from 'react-slick';
import { dataSet } from '../../../../utils/mocks-about-us';
import { ItemAbout } from './item/item-about';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const SectionMainAboutUs = () => {

    const items = dataSet;

    const settings: Settings = {
        centerPadding: '10px',
        slidesToShow: 4,
        // slidesToScroll: 4,
        infinite: true,
        arrows: false,
        speed: 10000,
        autoplay: true,
        autoplaySpeed: 10000,
        cssEase: 'linear',
        dots: true,
        swipeToSlide: true,
        pauseOnHover: true,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const renderSlides = items.map((item, index) => {
        return (
            <ItemAbout data={item} index={index} />
        );
    });

    return (
        <div className={styles.section} >
            <div className={styles.section_titles}>
                <h3 className={styles.title}>
                    Взгляни ближе на BFN
                </h3>
            </div>
            <div className={styles.slider}>
                {renderSlides.length > 0 ? < Slider {...settings}>{renderSlides}</Slider> : null}
            </div>
        </div >
    )
}