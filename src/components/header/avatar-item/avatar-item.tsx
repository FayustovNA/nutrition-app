
import style from './avatar-item.module.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../services/root-reducer';


const AvatarItem = () => {
    const avatar = useSelector((state: RootState) => state.userData.avatar);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/settings');
    };

    return (
        <div className={style.content} onClick={handleClick}>
            <img src={avatar} alt="User Avatar" />
        </div>

    );
}

export default AvatarItem;


