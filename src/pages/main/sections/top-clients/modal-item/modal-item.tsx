import styles from './modal-item.module.css';

interface ClientInfoProps {
    data: {
        name?: string,
        info?: string,
        modal_img?: string,
        text?: string
    } & any;
}


export const ClientInfo = ({ data }: ClientInfoProps) => {
    return (
        <div className={styles.content}>
            <h3 className={styles.h3}>{data.name}</h3>
            <p className={styles.info}>{data.info}</p>
            <img className={styles.img} src={data.modal_img}></img>
            <p className={styles.text}>{data.text}</p>
        </div>
    );
};