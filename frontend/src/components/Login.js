import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const collectLoginData = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:5000/api/v1/users/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result);
        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.data));
            navigate('/');
        } else {
            alert(result.data)
        }
    }
    return (
        <div className="login">
            <div className="loginBox">
                <h3>Login</h3>
                <input type="email" className="inputbox" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="inputbox" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="appButton" onClick={collectLoginData} type="button">Submit</button>
            </div>
        </div>
    )
}

export default Login;