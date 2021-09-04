import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../store/userActions';

const Login = () => {

    const dispatch = useDispatch();

    const loginError = useSelector(state => state.user.loginError);

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const inputHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const submitFormHandler = async event => {
        event.preventDefault();
        await dispatch(loginUser(state));
    };

    return (
        <div className='box'>
            <form className="df" onSubmit={submitFormHandler}>
                {loginError ? <div className="ml" style={{ color: 'red', fontSize: 15 }}>{loginError.error}</div> : null}
                <input onChange={inputHandler} required={true} name='username' placeholder="Username" id="username"></input>
                <input onChange={inputHandler} required={true} type="password" name="password" placeholder="Password" id="password" ></input>
                <button className='box--button' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;