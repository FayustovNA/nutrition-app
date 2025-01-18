import styles from './mock-page.module.css';
import { Footer } from '../../components/footer/footer';

interface MockPageProps {
    children: React.ReactNode; // Позволяет передавать любой React-элемент в качестве содержимого
}

const MockPage: React.FC<MockPageProps> = ({ children }) => {
    return (
        <div className={styles.content}>
            <div className={styles.body}>
                {children} {/* Отображает переданное содержимое */}
            </div>
            <Footer />
        </div>
    );
};

export default MockPage;