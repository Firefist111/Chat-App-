import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slice/user/userSlice";

const User = ({userData }) => {
  const dispatch = useDispatch()
  const {onlineUsers} = useSelector((store)=>store.socket)
  const initial = userData?.userName?.charAt(0)?.toUpperCase() || "?";
   const {selectedUser} = useSelector((store)=>store.user)
    const ref = useRef(null)
   const online = onlineUsers?.includes(userData._id)
   
   useEffect(()=>{
    ref.current?.scrollIntoView({
      behavior : 'smooth'
    })
   },[userData])
  return (
    <div
      ref={ref}
      className={`flex gap-7 h-14 items-center px-3 w-full hover:bg-gray-700 my-2 cursor-pointer ${selectedUser?._id === userData?._id && "bg-gray-700"} rounded-xl`}
      onClick={() => {
        dispatch(setSelectedUser(userData));
      }}
    >
      <div className={`avatar ${online ? "avatar-online" : "avatar-offline"}`}>
        <div className="w-12 h-12 bg-gray-500 rounded-full text-neutral-content flex items-center justify-center">
          {userData?.avatar ? (
            <img
              src={userData?.avatar}
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="font-semibold text-l">{initial}</span>
          )}
        </div>
      </div>

      <div>
        <h2>{userData?.fullName}</h2>
        <p className="text-xs">{userData?.userName}</p>
      </div>
    </div>
  );
};

export default User;
