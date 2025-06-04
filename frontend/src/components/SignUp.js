import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/api/v1/users/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result);
        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.data));
            navigate('/');
        }
    }

    return (
        <div className="sign-up">
            <div className="signupBox">
                <h3>Register</h3>
                <input type="text" className="inputbox" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" className="inputbox" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="inputbox" placeholder="Enter Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="appButton" onClick={collectData} type="button">Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp;