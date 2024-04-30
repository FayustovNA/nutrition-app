import styles from './first-info.module.css';
import Button from '../../../../ui/button/button';
import { useState } from 'react';
import Modal from '../../../../components/modal/modal';
import { ApplicationWindow } from '../../../../components/application/application';
import { MoreInfo } from './moreInformation/more-info';


export const SectionFirstInfo = () => {

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
            <section className={styles.section_banner}>
                <div className={styles.section_banner_content}>
                    BlackFox Nutrition
                    <p className={styles.section_banner_subtitle}>Приводим в форму. Легко. Комфортно. Навсегда.</p>
                    <div className={styles.btns}>
                        <Button
                            variant='default'
                            size='large'
                            color='opacity'
                            onClick={() => openModal()}
                        >
                            Записаться
                        </Button>
                        <Button
                            variant='default'
                            color='none-blue'
                            onClick={() => openModalMore()}
                        >
                            Подробнее
                        </Button>
                    </div>
                </div>
            </section>
            {
                isOpenModal && (<Modal onClose={closeModal}>
                    <ApplicationWindow />
                </Modal>)
            }
            {
                isOpenModalMore && (<Modal onClose={closeModal}>
                    <MoreInfo />
                </Modal>)
            }
        </div >
    )
}