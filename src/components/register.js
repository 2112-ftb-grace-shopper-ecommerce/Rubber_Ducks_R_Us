import React, { useState } from "react";
import { register } from '../axios-services/user'

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
        const waitRegister = await register(userToRegister)
        if (waitRegister) alert(`Welcome, ${waitRegister.user.username}. ${waitRegister.message}`)
        setRegEmail('');
        setRegUsername('');
        setRegPassword('');
    }

    return (
        <form className="loginButtons" onSubmit={handleRegister}>

            <label>Email:</label>
            <input type={"text"}
                id='regEmailInput'
                value={regEmail}
                onChange={(event) => {
                    setRegEmail(event.target.value)
                }}
                placeholder={"Enter email"} />

            <label>Username:</label>
            <input type="text"
                id='regUsernameInput'
                value={regUsername}
                onChange={(event) => {
                    setRegUsername(event.target.value)
                }}
                placeholder={"Enter username"} />

            <label>Password:</label>
            <input type="text"
                id='regPasswordInput'
                min="8"
                value={regPassword}
                onChange={(event) => {
                    setRegPassword(event.target.value)
                }}
                placeholder={"Enter password"} />

            <button>Register</button>
        </form>
    )
}

export default Register