import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import routes from "../api/routes.js";

import ErrorBox from "../components/ErrorBox.jsx";

const Register = () => {

    const navigate = useNavigate();

    const [error, setError] = useState({
        any: false,
        msg: ""
    })

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = handleValidation();
        if (!error) {
            const {username, email, password} = values;
            try {
                const { data } = await axios.post(routes.register, {
                    username,
                    email,
                    password
                });
                if(data.status === true) {
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                    navigate("/setAvatar")
                }
            } catch (error) {
                setError({any: true, msg: error.response.data.msg});
            }
        }
    }

    const handleChange = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        let errorMsg;
        let error= false;

        if (!/[a-z]{3,}/.test(username)){
            error= true;
            errorMsg = "Username should be more than 3 characters and all alphabets.";
        }

        else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            error=true;
            errorMsg = "Email must be valid.";
        }

        else if (password !== confirmPassword || !password) {
            error=true;
            errorMsg = "Password must not be empty and must match Confirm Password.";
        }

        setError({any: error, msg: errorMsg});

        return error;

    }

    return (
        <>
        <div className="form-container">
            <div className="flex items-center gap-4">
                <img src="/logo.svg" className="w-16 h-16"/>
                <h1 className="text-white uppercase font-bold text-2xl">Snappy</h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-center w-full"
            >
                <input 
                    name="username"
                    placeholder="Username"
                    className="input-field"
                    onChange={handleChange}
                />
                <input 
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="input-field"
                    onChange={handleChange}
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    onChange={handleChange}
                />
                <input 
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="input-field"
                    onChange={handleChange}
                />
                <button type="submit" className="link blue-link w-full">Register</button>
                <h2 className="text-gray-400">Already Have an account? 
                    <Link to="/login" className="text-green-300 hover:text-green-400"> Login</Link>
                </h2>
            </form>
        </div>
        {
            error.any &&  (
                <ErrorBox 
                    title="Error Occured" 
                    message={error.msg}
                    onClose={() => setError({any:false, msg:""})}
                />
            )
        }
        </>
    )
}

export default Register;