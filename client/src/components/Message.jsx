import React from "react";
import { useSelector } from "react-redux";

const Message = ({ messageData }) => {
  // if (!messageData) return null;

  const { user, selectedUser } = useSelector((store) => store.user);

  const isMe = user?._id === messageData.senderId;
  const avatarUser = isMe ? user : selectedUser;
  const initial = avatarUser?.userName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-12 h-12 rounded-full bg-gray-500 text-neutral-content flex items-center justify-center">
          {avatarUser?.avatar ? (
            <img
              src={avatarUser.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="font-semibold text-lg">{initial}</span>
          )}
        </div>
      </div>

      <div className="chat-header">
        <time className="text-xs opacity-50">
          {messageData.createdAt
            ? new Date(messageData.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </time>
      </div>

      <div className="chat-bubble">{messageData.message}</div>
    </div>
  );
};

export default Message;
