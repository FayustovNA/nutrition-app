import styles from './main.module.css';
import { Footer } from '../../components/footer/footer';
import { SectionFirstInfo } from './sections/first-info/first-info';
import { SectionRoadMap } from './sections/road-map/road-map';
import { SectionTopClients } from './sections/top-clients/top-clients';
import { SectionSuperiority } from './sections/superiority/superiority';
import { SectionMainAboutUs } from './sections/main-about-us/main-about-us';
import { SectionBenefits } from './sections/benefits/benefits';


interface MainPageProps {

}

export const MainPage: React.FC<MainPageProps> = () => {

    return (
        <div className={styles.content}>
            <SectionFirstInfo />
            <SectionSuperiority />
            <SectionMainAboutUs />
            <SectionRoadMap />
            <SectionBenefits />
            <SectionTopClients />
            <Footer />
        </div>
    );
};