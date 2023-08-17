import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import ErrorBox from "../components/ErrorBox";
import routes from "../api/routes";

const Login = () => {

    const navigate = useNavigate();

    const [error, setError] = useState({
        any: false,
        msg: ""
    })

    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = values;
    try {
      const {data} = await axios.post(routes.login, {
        username,
        password
      })

      if(data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/chat");
        
      } 
      

    } catch (error) {
      setError({any:true, msg: error.response.data.msg})
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="flex items-center gap-4 justify-center">
          <img src="/logo.svg" className="w-16 h-16" />
          {/* <h1 className="text-white uppercase font-bold text-2xl">Snappy</h1> */}
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
            name="password"
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
          />
          <button type="submit" className="link green-link w-full">
            Login
          </button>
          <h2 className="text-gray-400 text-center text-sm">
            Don&apos;t have an account?
            <Link to="/register" className="text-blue-300 hover:text-blue-400">
              {" "}
              Register
            </Link>
          </h2>
        </form>
      </div>
      { error.any && 
        <ErrorBox 
          title="Error Occured"
          message={error.msg}
          onClose={() => setError({any: false,msg: ""})}
        />
      }
    </>
  );
};

export default Login;
