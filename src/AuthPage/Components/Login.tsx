import React, {useState} from "react";
import s from "../../AppPage/Components/ResultForm/ResultStyle.module.css";
import {NavLink} from "react-router-dom";
import auth from "../../API/authAPI";
const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        auth.login(username, password);
    };
    return (
        <div>
            <div>
                <NavLink to="/registration" children={"registration"} style={s}/>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input  id='email' value={username} onChange={(e) => setUsername(e.target.value)}/>
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
            </div>
        </div>
    )
}

export default Login