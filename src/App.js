import React, { useEffect, useRef, useState } from "react";
import ContactUs from "./components/contactUs/ContactUs";
import Home from "./components/Home/Home";
import Mine from "./components/Mine/Mine";
import Platfrom from "./components/Platfrom/Platfrom";
import Team from "./components/Team/Team";
import Otpverification from "./components/OtpVerification/OtpVerification";
import Otpverification1 from "./components/OtpVerification/OtpVerification1";
import ForgotPassword from "./components/ForgotpPassword/ForgotPassword";
import Resetpassword from "./components/ResetPassword/ResetPassword";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import SigninPno from "./components/SignIn/SigninPno";
import FpwdEmail from "./components/ForgotpPassword/FpwdEmail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import Protected from "./components/ProtectedRouter/Protected";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selecUser } from "./components/feature/user";
const App = () => {
  const effectCalled = useRef(false);
  const [socket, setSocket] = useState("");
  const [currentBalance, setCurrentBalance] = useState({});
  const [miningStatus, setMiningStatus] = useState(false);
  const getItem = JSON.parse(localStorage.getItem("user"));

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  
  const user = useSelector(selecUser);


  useEffect(() => {
    // console.log("first",user)
    if (!effectCalled.current && getItem ) {
      const socket = io("https://metalink-technomads.herokuapp.com");
      socket.on(
        "connect",
        () => {
          setSocket(socket);
          socket.emit("joinRoom", JSON.parse(localStorage.getItem("user"))._id);
          socket.on("currentBalance", (data) => {
           
            console.log("data",data);
            setMiningStatus(data.miningStatus);
            setCurrentBalance(data);
          });
        },
    
      );
      effectCalled.current = true;
    }
  }, [user?._id]);

  return (
    <>
      <Routes>
        <Route element={<Protected />}>
          <Route
            path="/mine"
            element={
              <Mine
                socket={socket}
                currentBalance={currentBalance}
                miningStatus={miningStatus}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route exact path="/" element={<Home />} />

        <Route path="/platform" element={<Platfrom />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signinpno" element={<SigninPno />} />

        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/otpverification" element={<Otpverification />} />
        <Route path="/otpverification1" element={<Otpverification1 />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/fpwdemail" element={<FpwdEmail />} />
      </Routes>
    </>
  );
};

export default App;
