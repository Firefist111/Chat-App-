import { useEffect, useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, updateUserProfile } from "../store/slice/user/userThunk";

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { user , buttonLoading } = useSelector((store) => store.user);
  useEffect(()=>{
  dispatch(getUserThunk());
  },[dispatch,user.avatar])
  const handleImageUpload = (e)=>{
   const file =  e.target.files[0]

   if (!file?.type.startsWith("image/")) {
     alert("Please select an image");
     return;
   }

   if (file?.size > 2 * 1024 * 1024) {
     alert("Image must be under 2MB");
     return;
   }

   const reader = new FileReader()

   reader.readAsDataURL(file)

   reader.onload = async()=>{
    const base64Img = reader.result
    dispatch(updateUserProfile({avatar:base64Img}))
    
   }
  }

  return (
    <div className="h-screen pt-2">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              {/* Gradient ring */}
              <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-secondary">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover bg-base-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-base-200 flex items-center justify-center text-4xl font-semibold text-base-content">
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Hover overlay */}
              <label
                htmlFor="avatar-upload"
                className="
        absolute inset-0 flex items-center justify-center
        rounded-full bg-black/40 opacity-0
        group-hover:opacity-100 transition
        cursor-pointer
      "
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <p className="text-sm text-zinc-400">
              {buttonLoading ? 'Uploading ....'  :`Click on the photo to update your profile picture`}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.userName}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
