
import style from './avatar-item.module.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../services/root-reducer';
import Avatar from '../../../images/avatar_def.png'


const AvatarItem = () => {
    const avatar = useSelector((state: RootState) => state.userData);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/settings');
    };

    const imageUrl = avatar.image ? avatar.image.replace('http://localhost', '') : Avatar;

    return (
        <div className={style.content} onClick={handleClick}>
            <img src={imageUrl || Avatar} alt="User Avatar" />
        </div>

    );
}

export default AvatarItem;


