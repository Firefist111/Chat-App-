import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignupThunk } from "../../store/slice/user/userThunk";
const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signupDetails, setSignupDetails] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  };

  const handleSignup = async()=>{
    
   const response = await dispatch(userSignupThunk(signupDetails))

   if(response?.payload?.success){
      navigate('/')
   }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black glass">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-sm border p-4 text-md">
        <legend className="fieldset-legend text-lg">Signup</legend>

        <label className="label">Full name</label>
        <input
          name="fullName"
          type="text"
          className="input w-full"
          onChange={handleInputChange}
          placeholder="Full Name"
        />

        <label className="label">Username</label>
        <input
          name="userName"
          type="text"
          className="input w-full"
          onChange={handleInputChange}
          placeholder="Username"
        />

        <label className="label">Password</label>
        <input
          name="password"
          type="password"
          className="input w-full"
          placeholder="Password"
          onChange={handleInputChange}
        />

        <label className="label">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          className="input w-full"
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />

        <button className="btn btn-neutral mt-4 bg-amber-700 w-full" onClick={handleSignup}>
          Signup
        </button>

        <div className="flex gap-2 my-3 justify-center ">
          <p>Already have an account?</p>
          <Link to="/login" className="text-amber-700 font-semibold">
            Login
          </Link>
        </div>
      </fieldset>
    </div>
  );
};

export default Signup;
