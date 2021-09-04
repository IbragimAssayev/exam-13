import { Link } from "react-router-dom";

const RegisterHeader = () => {
    return (
        <div className="header">
            <div className='header--box'>
                <Link to="/" className="button">Photo Gallery</Link>
            </div>
            <div className='header'>
                <div className='header--box'>
                    <Link to="/register" className="button">Register</Link>
                </div>
                <div className='header--box'>
                    <Link to="/login" className="button" >Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterHeader;