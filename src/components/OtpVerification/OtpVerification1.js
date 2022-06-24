import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../css/otp.css";
import baseUrl from "../baseUrl/baseUrl";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";

function OtpVerification1({ phone, countryCode }) {
  const [OTP, setOTP] = useState("");

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
  /*=================verifyForgotPasswordOtp API============= */
  const navigate = useNavigate();

  const verifyForgotPasswordOtp = () => {
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
        navigate("/resetpassword");
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
    const mobile = countryCode + phone;
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
        console.log(countryCode + phone);
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
          <div className="container">
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
                  <p className="otp-no mb-0">{countryCode + phone}</p>
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

                  <button
                    className="otp-verify-btn"
                    onClick={verifyForgotPasswordOtp}
                  >
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

export default OtpVerification1;
