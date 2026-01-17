import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { userLoginThunk } from '../../store/slice/user/userThunk';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [loginDetails,setLoginDetails] = useState({
    userName : '',
    password : ''
  })

  const handleInputChange = (e)=>{
      const {name,value} = e.target
      setLoginDetails({
        ...loginDetails,
        [name] : value
      })

    }
  
  const handleLogin = async()=>{
    const response = await dispatch(userLoginThunk(loginDetails))
    if (response?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <div className=" glass h-screen  flex justify-center items-center bg-black backdrop-blur-2xl flex-col">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4 text-md">
        <legend className="fieldset-legend text-lg">Login</legend>

        <label className="label">Username</label>
        <input
        name='userName'
          type="text"
          className="input"
          placeholder="Username"
          onChange={handleInputChange}
        />

        <label className="label">Password</label>
        <input
        name='password'
          type="password"
          className="input"
          placeholder="Password"
          onChange={handleInputChange}
        />

        <button className="btn btn-neutral mt-4 bg-amber-700" onClick={handleLogin}>Login</button>

        <div className="flex gap-3 my-3 justify-center">
          <p>Do not have an account?</p>
          <Link to="/signup" className="text-amber-700">
            Signup
          </Link>
        </div>
      </fieldset>
    </div>
  );
}

export default Login