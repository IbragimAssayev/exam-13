import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../store/userActions';

const LoginedHeader = (user) => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div className='header'>
            <div className='header--box'>
                <Link to="/" className="button">Photo Gallery</Link>
            </div>
            <div className="header">
                <Link to={`/gallery/${user.user.username}`}><h1 className="username">Hello, {user.user.username}</h1></Link>
                <div className='header--box'>
                    <div className="button" onClick={() => logoutHandler()}>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default LoginedHeader;