import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../css/otp.css";
import baseUrl from "../baseUrl/baseUrl";
import { useSelector } from "react-redux";
import { selecUser, signup } from "../feature/user";
import { useDispatch } from "react-redux";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";

function OtpVerificationFormobile({
  code,
  mobile,
  phone,
  username,
  email,
  password,
  closeOtpBox,
  setmobile,
  setOldMobile,
}) {
  // console.log(mobiles);
  const [OTP, setOTP] = useState("");
  const dispatch = useDispatch();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  /*============= Toast Fire Notifaction==========*/

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

  /*=================otpverification API============= */

  const otpverification =  () => {
    const otpcode = OTP;
    window.confirmationResult
      .confirm(otpcode)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        try {
          const result = await baseUrl.put("/updateProfile", {
            username: username,
            password: password,
            email: email,
            countryCode: code,
            phoneNumber: phone,
          });

          if (result.data.success) {
            console.log(result);
            Toast.fire({
              icon: "success",
              title: result.data.message,
            });
            setmobile(code + phone);
            setOldMobile(code + phone);
            localStorage.setItem(
              "user",
              JSON.stringify({
                _id: result.data.data._id,
                active: result.data.data.active,
                username: result.data.data.username,
                email: result.data.data.email,
                countryCode: result.data.data.countryCode,
                phoneNumber: result.data.data.phoneNumber,
              })
            );
            dispatch(
              signup({
                _id: result.data.data._id,
                active: result.data.data.active,
                username: result.data.data.username,
                email: result.data.data.email,
                countryCode: result.data.data.countryCode,
                phoneNumber: result.data.data.phoneNumber,
                refCode: result.data.data.inviteCode,
              })
            );
            // navigate("/profile")
            closeOtpBox(code + phone);
          } else {
            Toast.fire({
              icon: "error",
              title: result.data.message,
            });
          }
        } catch (err) {
          console.log("err" + err);
        }
        // navigate("/mine");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("err", error);
        Toast.fire({
          icon: "error",
          title: "invalid verification code",
        });
      });
  };

  /*=================ResendOTPverification API============= */

  const ResendOTPverification = async () => {
    await setUpRecaptcha();
    const mobile = code + phone;
    const appVerifier = window.recaptchaVerifier;
    console.log("otp sent on this number", mobile);
    signInWithPhoneNumber(auth, mobile, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("otp sent");

        Toast.fire({
          icon: "success",
          title: "OTP sent",
        });
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "SMS not sent Please try again.",
        });
      });
    const code = OTP;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        Toast.fire({
          icon: "success",
          title: "user is verified",
        });
        // navigate("/resetpassword");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("err", error);
        Toast.fire({
          icon: "error",
          title: "invalid verification code",
        });
      });
  };

  return (
    <>
      <div className="logIn otp1-bg">
        <section className="login-form">
          <div className="container ">
            <div className="d-flex justify-content-between align-items-center header-md ">
              <div>
                <Link to="/">
                  <img
                    src="../../img/logo/logo.png"
                    alt=""
                    className="header-logo img-fluid"
                  />
                </Link>
              </div>
            </div>
            <div className="row justify-content-center text-center pulse">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="otp-bg">
                  <h2 className="heading text-center"> OTP Verification </h2>
                  <p className="sub-heading mb-0">
                    Enter the OTP you received at
                  </p>
                  <p className="otp-no mb-0">{code + phone}</p>
                  <div className="otp-group">
                    <form>
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                      />
                    </form>
                  </div>
                  <div id="sign-in-button" />

                  <button className="otp-verify-btn" onClick={otpverification}>
                    Verify
                  </button>
                  <Link
                    to="#"
                    onClick={ResendOTPverification}
                    className="resend-otp"
                  >
                    Resend OTP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default OtpVerificationFormobile;
