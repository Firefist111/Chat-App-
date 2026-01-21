import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

import User from "../components/User";
import {
  getOtherUserThunk,
  userLogoutThunk,
} from "../store/slice/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response =await  dispatch(userLogoutThunk());
    if (response?.payload?.success) {
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(getOtherUserThunk());
  }, [dispatch]);

  const { otherUsers,user } = useSelector((store) => store.user);
    const [searchUser,setSearchUser] = useState([])

    useEffect(()=>{
      setSearchUser(otherUsers)
    },[otherUsers])
  return (
    <aside
      className="
        h-screen
        w-full
        sm:w-80
        lg:w-96
        flex
        flex-col
        border-r
        border-white/20
        bg-base-100
      "
    >
      {/* Header */}
      <div className="px-5 py-4 text-xl font-bold border-b border-white/10">
        Chat App
      </div>

      {/* Search */}
      <div className="p-4">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaSearch className="opacity-60" />
          <input
            type="search"
            placeholder="Search"
            className="grow"
            onChange={(e) => {
              let value = e.target.value.toLowerCase();
              if(!value){
                setSearchUser(otherUsers)
              }
              let users = otherUsers.filter((user) => user.fullName.toLowerCase().includes(value));

              setSearchUser(users);
            }}
          />
        </label>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-2">
        {searchUser?.map((user) => (
          <User userData={user} key={user._id} />
        ))}
      </div>

      {/* Footer */}
      <div className="h-16 px-4  py-2 flex items-center justify-between border-t border-white/10">
        <div className="chat-image avatar flex items-center gap-3">
          <div>
            <div className="w-12 h-12 rounded-full bg-gray-500 text-neutral-content flex items-center justify-center border-4 border-amber-700">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="font-semibold text-lg">
                  {user?.userName?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div className="font-semibold underline-offset-1 ">
            {user?.fullName}
          </div>
        </div>
        <button className="flex gap-1 items-center pl-9" onClick={()=>{
          navigate('/user-profile')
        }}>
              <CiEdit/> <span>Edit</span>
        </button>
        <button
          className="btn btn-sm bg-amber-700 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default UserSideBar;
