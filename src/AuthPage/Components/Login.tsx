import React, {useState} from "react";
import s from "../../AppPage/Components/ResultForm/ResultStyle.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import auth from "../../API/authAPI";

const Login = () => {
    const navigate = useNavigate();
    let [error, setError] = React.useState('zxc');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.length >= 2 && password.length >= 2) {
            auth.login(username, password, navigate, updateError);
        } else {
            updateError("минимальная длина логина и пороля 3 символа")
        }
    };

    // @ts-ignore
    let updateError = (value) => {
        setError(value)
    }
    return (
        <div>
            <div>
                <NavLink to="/registration" children={"registration"} style={s}/>
            </div>
            {/*<div>*/}
            {/*    <NavLink to="/app" children={"app"} style={s}/>*/}
            {/*</div>*/}
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>username</label>
                        <input id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type={"submit"}> log</button>
                    </div>
                </form>
                <h1> {error}</h1>
            </div>
        </div>
    )
}

export default Login