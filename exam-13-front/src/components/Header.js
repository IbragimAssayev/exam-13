import React from 'react';
import LoginedHeader from './LoginedHeader';
import RegisterHeader from './RegisterHeader';

const Header = ({ user }) => {
    return (
        <div >
            {user ?
                (<LoginedHeader user={user} />) :
                (<RegisterHeader />)}
        </div>
    )
}

export default Header;