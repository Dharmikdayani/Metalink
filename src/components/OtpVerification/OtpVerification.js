import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../css/otp.css";
import baseUrl from "../baseUrl/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { selecUser, signup } from "../feature/user";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";
import useEncryption from "../EncryptData/EncryptData";

function OtpVerification({
  username,
  email,
  refCode,
  phoneNumber,
  countryCode,
  password,
}) {
  const [OTP, setOTP] = useState("");
  const user = useSelector(selecUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { encryptData, decryptData } = useEncryption();

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

  /*=================otpverification API============= */

  const OnsubmitOtp = async () => {
    const code = OTP;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        try {
          const encrypt = encryptData(
            JSON.stringify({
              username: username,
              email: email,
              countryCode: countryCode,
              phoneNumber: phoneNumber,
              refCode: refCode,
              password: password,
              isVerified: true,
            })
          );
          const result = await baseUrl.post("/verifyPhoneNumber", {
            data: encrypt,
          });
          const results = decryptData(result.data.data);
          console.log("SignOtpVerificationUp", results);

          if (results.success) {
            Toast.fire({
              icon: "success",
              title: results.message,
            });
            dispatch(
              signup({
                _id: results.data._id,
                active: results.data.active,
                username: results.data.username,
                email: results.data.email,
                countryCode: results.data.countryCode,
                phoneNumber: results.data.phoneNumber,
                refCode: results.data.inviteCode,
              })
            );
            localStorage.setItem(
              "user",
              JSON.stringify({
                _id: results.data._id,
                active: results.data.active,
                username: results.data.username,
                email: results.data.email,
                countryCode: results.data.countryCode,
                phoneNumber: results.data.phoneNumber,
                refCode: results.data.inviteCode,
              })
            );
          } else {
            Toast.fire({
              icon: "error",
              title: results.message,
            });
          }
        } catch (err) {
          console.log("err" + err);
        }
        Toast.fire({
          icon: "success",
          title: "user is verified",
        });

        navigate("/mine");
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
    const mobile = countryCode + phoneNumber;
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
          title: "New OTP is sent",
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
                  <p className="otp-no mb-0">
                    {user.countryCode + user.phoneNumber}
                  </p>
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

                  <button className="otp-verify-btn" onClick={OnsubmitOtp}>
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

export default OtpVerification;
