import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../store/userActions';

const Register = () => {

    const dispatch = useDispatch();

    const registerError = useSelector(state => state.user.registerError);

    const [state, setState] = useState({
        username: "",
        password: ""
    });



    const inputHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(registerUser(state));
    };

    return (
        <div className='box'>
            <form className="df" onSubmit={(e) => submitFormHandler(e)}>
                {registerError ? <div className="ml" style={{ color: 'red', fontSize: 15 }}>{registerError.error}</div> : null}
                <input onChange={inputHandler} required={true} name='username' placeholder="Username" id="username"></input>
                <input onChange={inputHandler} required={true} name="password" placeholder="Password" id="password" ></input>
                <button className='box--button' type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;