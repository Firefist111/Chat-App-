import UserSideBar from "./userSideBar";
import MessageContainer from "./messageContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import InitialPage from "./InitialPage.jsx";
import { useEffect } from "react";
import {
  clearSocket,
  initializeSocket,
  setOnlineUsers,
} from "../store/slice/socket/socketSlice.js";
import { setMessage } from "../store/slice/message/messageSlice.js";
const HomePage = () => {
  const { isAuthenticated, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socket);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(user?._id));
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUser) => {
      dispatch(setOnlineUsers(onlineUser));
    });
    socket.on('newMessages',(newMessages)=>{
      dispatch(setMessage(newMessages))
    })
    return () => {
      dispatch(clearSocket());
      socket.disconnect();
    };
  }, [socket, dispatch]);

  const { selectedUser } = useSelector((store) => store.user);
  return (
    <div className="flex h-screen">
      <UserSideBar />
      {selectedUser ? <MessageContainer /> : <InitialPage />}
    </div>
  );
};

export default HomePage;
