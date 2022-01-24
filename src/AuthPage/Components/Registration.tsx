import React from "react";
import s from "../../AppPage/Components/ResultForm/ResultStyle.module.css";
import {NavLink} from "react-router-dom";
import auth from "../../API/authAPI";

const Registration = () => {


    let [error, setError] = React.useState('zxc');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        auth.register(username, password,updateError);
    };
    // @ts-ignore
    let updateError = (value) => {
        setError(value)
    }
    return (
        <div>
            <div>
                <NavLink to="/login" children={"login"} style={s}/>
            </div>
            регайся тварь
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
                    <button type={"submit"}> reg</button>
                </div>
            </form>
            <h1>{error}</h1>
        </div>
    )
}

export default Registration