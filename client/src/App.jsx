import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { getUserThunk } from "./store/slice/user/userThunk";
import { useDispatch } from "react-redux";
import ProfilePage from "./Pages/ProfilePage";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserThunk())
  },[])
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
