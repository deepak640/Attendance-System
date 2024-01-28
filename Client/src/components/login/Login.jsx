import "./Login.scss"
import React from 'react';
import { useState } from "react"
function Login() {
    const [ Email, setEmail ] = useState('')
    const [ Password, setPassword ] = useState('')
    const [ Fac_ID, setFac_ID ] = useState('')
    const userlogin = async (e) => {
        e.preventDefault();
        try {
            if (Email === "ayushdeepnegi@gmail.com" && Password === 'Ayushdeep') {
                localStorage.setItem("Admin", Email)
                window.location = "/Admin"
            } else {
                const res = await fetch('https://attendance-s52k.onrender.com/users/Login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Email,
                        Password,
                        Fac_ID
                    })
                })
                const data = await res.json()
                console.log(data);
                if (res.status === 400) {
                    const invalid = document.getElementById("ban")
                    invalid.style.display = "block"
                    setTimeout(function () {
                        invalid.style.display = "none"
                    }, 3000);
                } else if (res.status === 200) {
                    localStorage.setItem("token", JSON.stringify(data));
                    window.location = "/cards"
                } else if (res.status === 403) {
                    const invalid = document.getElementById("ban")
                    invalid.innerHTML = "Please fill correct information"
                    invalid.style.display = "block"
                    setTimeout(function () {
                        invalid.style.display = "none"
                    }, 3000);
                }
            }
        } catch (err) {
            console.log(err);
        }


    }
    return (<>
        <p className="login-error alert alert-danger" id="ban">Something went wrong</p>
        <div className="Login-main-container">
            <div className="left">
                <h1>welcome <span>to</span> college Attendance system </h1>
                <p style={{ width: '85%' }}>  Easier to mark student attendance as well as record them in Digital sheets. Print students record as per the attendance sheet.</p>
                <button onClick={() => { window.location = "/contact" }} className="btn-1">Contact</button>
            </div>
            <form method="POST" onSubmit={userlogin} className="Login-container">
                <div>
                    <h1 className="text-center">Log in</h1>
                    <h3 className="text-center">Mark  attendance in a digital way!</h3>
                    <hr className="hr1" />
                </div>
                <div className="your-input">
                    <div className="your-input">
                        <div className="input">
                            <input type="email" name="Email" id="Email" placeholder="Enter Email"
                                autoComplete="off"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input">
                            <input type="text" name="Fac_ID" id="Fac_ID" placeholder="Enter ID" autoComplete="off"
                                value={Fac_ID}
                                onChange={(e) => setFac_ID(e.target.value)} />
                            <label htmlFor="facID">Faculty ID</label>
                        </div>
                        <div className="input">
                            <input type="password" name="Password" id="Password"
                                placeholder="Enter Password" autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">
                                Password
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div></>
    );
}
export default Login;
