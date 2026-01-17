import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSend } from "react-icons/io";

import User from "../components/User";
import Message from "../components/Message";
import {
  getMessageThunk,
  sendMessageThunk,
} from "../store/slice/message/messageThunk";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const [sentMessage, setSentMessage] = useState("");

  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }));
    }
  }, [selectedUser?._id, dispatch]);

  const handleSendMessage = () => {
    if (!sentMessage.trim()) return;

    dispatch(
      sendMessageThunk({
        receiverId: selectedUser._id,
        message: sentMessage,
      })
    );

    setSentMessage("");
  };

  const handleInput = (e) => {
    setSentMessage(e.target.value);
  };

  if (!selectedUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="border-b border-white/10">
        <User userData={selectedUser} />
      </div>

      <div className="flex-1 px-3 py-2 overflow-y-auto">
        {messages?.filter(Boolean).map((message) => (
          <Message key={message._id} messageData={message} />
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-2 items-center px-3 pb-3">
        <input
          type="text"
          placeholder="Type here ..."
          className="input input-lg w-full rounded-3xl"
          value={sentMessage}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="btn btn-active bg-amber-700 btn-lg"
          onClick={handleSendMessage}
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
