import React, { useState } from "react";
import { register } from '../../axios-services/user'
import "./loginStyle.css"

const Register = () => {
    // used reg as a prefix for these in case we need to differentiate them from login stuff
    const [regEmail, setRegEmail] = useState("")
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");


    const userToRegister = {
        email: regEmail,
        username: regUsername,
        password: regPassword


    }

    const handleRegister = async (event) => {
        event.preventDefault()
        if (regUsername === '' || regPassword === '' || regEmail === '') {
            alert('Please complete all fields')
            return;
        }
        const waitRegister = await register(userToRegister)
        if (waitRegister) alert(`Welcome, ${waitRegister.user.username}. ${waitRegister.message}`)
        setRegEmail('');
        setRegUsername('');
        setRegPassword('');
    }

    return (
        <form className="registerPage" onSubmit={handleRegister}>
            <h2>Create New Account</h2>
            <label>Email</label>
            <br />
            <input type={"text"}
                id='regEmailInput'
                value={regEmail}
                onChange={(event) => {
                    setRegEmail(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Username</label>
            <br />
            <input type="text"
                id='regUsernameInput'
                value={regUsername}
                onChange={(event) => {
                    setRegUsername(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input type="text"
                id='regPasswordInput'
                min="8"
                value={regPassword}
                onChange={(event) => {
                    setRegPassword(event.target.value)
                }}
            />

            <button>Register</button>
        </form>
    )
}

export default Register