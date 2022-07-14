import React, { useCallback, useEffect, useState } from "react";
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
import useEncryption from "../EncryptData/EncryptData";

function OtpVerificationFormobile({
  ProfileData,
  countryCode,
  mobile,
  oldMobile,
  phone,
  username,
  email,
  password,
  closeOtpBox,
  setmobile,
  setOldMobile,
}) {
  // //console.log("setmobile",countryCode , "setOldMobile", phone);
  const [OTP, setOTP] = useState("");
  const dispatch = useDispatch();
  const { encryptData, decryptData } = useEncryption();

  const defaultCount = 60;
  const intervalGap = 1000;
  const [timerCount, setTimerCount] = useState(defaultCount);

  /*===== RESEND OTP TIMER======== */
  const startTimerWrapper = useCallback((func) => {
    let timeInterval: NodeJS.Timer;
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
      setTimerCount(defaultCount);
      timeInterval = setInterval(() => {
        func(timeInterval);
      }, intervalGap);
    };
  }, []);

  const timer = useCallback(
    startTimerWrapper((intervalfn: NodeJS.Timeout) => {
      setTimerCount((val) => {
        if (val === 0) {
          clearInterval(intervalfn);
          return val;
        }
        return val - 1;
      });
    }),
    []
  );

  useEffect(() => {
    timer();
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          //console.log(response);
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

  /*=======ERROR MESSAGE =========*/
  let errorsObj = {
    otp1: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  const onSignInSubmit = (e) => {
    e.preventDefault();

    let error = false;

    errorsObj = { ...errorsObj };

    if (OTP.length < 6) {
      errorsObj.otp1 = "*OTP is required!";
      error = true;
    }

    setErrors(errorsObj);
    if (error) return;
    otpverification();
  };
  /*=================otpverification API============= */

  const otpverification = () => {
    const otpcode = OTP;
    window.confirmationResult
      .confirm(otpcode)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        //console.log(JSON.stringify(user));
        try {
          const encrypt = encryptData(
            JSON.stringify({
              username: ProfileData.username !== username ? username : null,
              password: password,
              email: ProfileData.email !== email ? email : null,
              countryCode: countryCode,
              phoneNumber: phone,
            })
          );
          const result = await baseUrl.put("/updateProfile", {
            data: encrypt,
          });
          const results = decryptData(result.data.data);
          //console.log("SignUp", results);
          if (results.success) {
            Toast.fire({
              icon: "success",
              title: results.message,
            });
            setmobile(countryCode + phone);
            setOldMobile(countryCode + phone);
            //console.log("setmobile", mobile, "setOldMobile", oldMobile);

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

            closeOtpBox(countryCode + phone);
          } else {
            Toast.fire({
              icon: "error",
              title: results.message,
            });
          }
        } catch (err) {
          //console.log("err" + err);
        }
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        //console.log("err", error);
        Toast.fire({
          icon: "error",
          title: "invalid verification code",
        });
      });
  };

  /*=================ResendOTPverification API============= */

  const ResendOTPverification = async () => {
    await setUpRecaptcha();
    const mobile = oldMobile;
    const appVerifier = window.recaptchaVerifier;
    //console.log("otp sent on this number", mobile);
    signInWithPhoneNumber(auth, mobile, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        //console.log("otp sent");

        Toast.fire({
          icon: "success",
          title: "OTP sent",
        });
        setTimerCount(defaultCount);
        timer();
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        //console.log(error);
        Toast.fire({
          icon: "error",
          title: "SMS not sent Please try again.",
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
                  <p className="otp-no mb-0">{oldMobile}</p>
                  <form onSubmit={(e) => onSignInSubmit(e)}>
                    <div className="otp-group">
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                      />
                      {errors.otp1 && (
                        <div className="errorMsg">{errors.otp1}</div>
                      )}
                      <div id="sign-in-button" />
                      <button className="otp-verify-btn" type="submit">
                        Verify
                      </button>
                    </div>
                  </form>

                  {!timerCount == 0 ? (
                    <p className="resend-otp">
                      Resend OTP in
                      <span> {timerCount}</span>
                    </p>
                  ) : (
                    <Link
                      to="#"
                      disabled={!timerCount == 0}
                      className="resend-otp"
                      onClick={ResendOTPverification}
                    >
                      Resend OTP
                    </Link>
                  )}
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
