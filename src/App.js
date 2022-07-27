import React, { useEffect, useState } from "react";
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
import { Routes, Route } from "react-router-dom";
import Protected from "./components/ProtectedRouter/Protected";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selecUser } from "./components/feature/user";
import MeainHome from "./components/MeainHome/MeainHome";
import OtpVerificationFormobile from "./components/OtpVerification/OtpVerificationFormobile";
const App = () => {
  const [socket, setSocket] = useState("");
  const [currentBalance, setCurrentBalance] = useState({});
  const [miningStatus, setMiningStatus] = useState(false);
  const getItem = JSON.parse(localStorage.getItem("user"));

  //eslint-disable-next-line
  const user = useSelector(selecUser);

  useEffect(() => {
    setCurrentBalance({});
    setMiningStatus(false);
    setSocket("");
    // console.log("getItem", getItem);
    if (getItem) {
      const socket = io("http://localhost:3008");
      socket.on("connect", () => {
        setSocket(socket);
        // console.log("id", getItem._id);
        socket.emit("joinRoom", getItem._id);
        socket.on("currentBalance", (data) => {
          // console.log("data", data);
          setMiningStatus(data?.miningStatus);
          setCurrentBalance(data);
        });
      });

         
      // effectCalled.current = true;
    }
    //eslint-disable-next-line
  }, [getItem?._id]);

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
          <Route path="/profile" element={<Profile socket={socket} />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path="/meainhome" element={<MeainHome />} />
        <Route path="/platform" element={<Platfrom />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signinpno" element={<SigninPno />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/otpverification" element={<Otpverification />} />
        <Route
          path="/otpverificationForForgotPassword"
          element={<Otpverification1 />}
        />
        <Route
          path="/OtpVerificationForUpdatemobile"
          element={<OtpVerificationFormobile />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/fpwdemail" element={<FpwdEmail />} />
      </Routes>
    </>
  );
};

export default App;
