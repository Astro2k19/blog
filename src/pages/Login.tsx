import React from 'react';
import '../App.css';
import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from "../firebase";
import {useNavigate} from "react-router";

const Login = ({isAuth, setIsAuth}) => {

    const navigate = useNavigate();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                localStorage.setItem('isAuth', JSON.stringify(true));
                setIsAuth(true);
                navigate('/');
            }).catch(e => {
                alert(e.message);
            })
    }

    return (
        <div className='loginPage'>
            <p>Login to blog with Google</p>
            <button className="login-with-google-btn" onClick={signIn}>Sign in</button>
        </div>
    )
}
export default Login;