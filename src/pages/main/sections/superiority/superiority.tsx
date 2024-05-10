import styles from './superiority.module.css';
import video from '../../../../videos/films.mp4';
import Button from '../../../../ui/button/button';
import Modal from '../../../../components/modal/modal';
import { useState } from 'react';
import { ApplicationWindow } from '../../../../components/application/application';
import { MoreInformation } from './moreInformation/more-information';

export const SectionSuperiority = () => {
    const [isOpenModal, setisOpenModal] = useState(false);
    const [isOpenModalMore, setisOpenModalMore] = useState(false);

    const openModal = () => {
        setisOpenModal(true);
    }

    const openModalMore = () => {
        setisOpenModalMore(true);
    }

    const closeModal = () => {
        setisOpenModal(false)
        setisOpenModalMore(false)
    }

    return (
        <div className={styles.section} >
            <div className={styles.textbox}>
                <h3 className={styles.title}>Образ жизни - как основа!</h3>
                <p className={styles.text}><span className={styles.span}>BlackFox Nutrition </span>- это не просто проект, помогающий разобраться в вопросах питания, а уже полноценно выстроенная система внедрения полезных привычек, направленных на улучшение физической формы, бережному отношению к здоровью и не только.</p>
                <div className={styles.btns}>
                    <Button
                        variant='default'
                        size='large'
                        onClick={() => openModal()}
                    >
                        Записаться
                    </Button>
                    <Button
                        variant='default'
                        color='none'
                        onClick={() => openModalMore()}
                    >
                        Подробнее
                    </Button>
                </div>
            </div>
            <div className={styles.videobox}>
                <video src={video} autoPlay loop muted playsInline className={styles.video} />
            </div>
            {
                isOpenModal && (<Modal onClose={closeModal}>
                    <ApplicationWindow />
                </Modal>)
            }
            {
                isOpenModalMore && (<Modal onClose={closeModal}>
                    <MoreInformation />
                </Modal>)
            }
        </div >
    )
}