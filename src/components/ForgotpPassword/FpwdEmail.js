import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/forgotPassword.css";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";
import OtpVerification1 from "../OtpVerification/OtpVerification1";
import useEncryption from "../EncryptData/EncryptData";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";
import ManinHeader from "../Layout/ManinHeader";

function FpwdEmail() {
  const [email, setemail] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [storedata, setstoredata] = useState("");
  const { encryptData, decryptData } = useEncryption();
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
        // size: "invisible",
        theme: "red",
        callback: (response) => {
          // console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignUp();
        },
      },
      auth
    );
  };

  /*================ERROR MESSAGE============= */
  const [error, setError] = useState({
    email: "",
  });
  function onSignUp(e) {
    e.preventDefault();
    if (email === "") {
      setError({
        ...error,
        email: "*Email address is required!",
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        ...error,
        email: "*Email address is invalid!",
      });
    } else {
      forgotPassword();
    }
  }

  /*=============== forgotPassword API===========*/

  const forgotPassword = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          emailOrMobile: email,
        })
      );
      const result = await baseUrl.post("/forgotPassword", {
        data: encrypt,
      });
      const results = decryptData(result.data.data);
      // console.log("SignUp", results);
      // console.log("storedata", storedata);
      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });

        setstoredata(results.data);

        setUpRecaptcha();
        const mobile = results.data.countryCode + results.data.phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        // console.log("otp sent on this number", mobile);
        signInWithPhoneNumber(auth, mobile, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // console.log("otp sent");
            setShowOtpBox(true);
            Toast.fire({
              icon: "success",
              title: "OTP sent",
            });
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
            // console.log("error", error);
            Toast.fire({
              icon: "error",
              title: "SMS not sent Please try again.",
            });
          });
      } else {
        Toast.fire({
          icon: "error",
          title: results.message,
        });
      }
    } catch (err) {
      // console.log("err123" + err);
    }
  };

  return (
    <>
      {showOtpBox ? (
        <OtpVerification1
          countryCode={storedata.countryCode}
          phone={storedata.phoneNumber}
        />
      ) : (
        <>
          <ManinHeader />
          <div className="logIn forgot-password-bg forgot-password">
            <section className="login-form ">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="login-form-bg">
                      <h2 className="heading text-center"> Forgot Password</h2>
                      <form autoComplete="off" onSubmit={onSignUp}>
                        <div className="d-grid justify-content-center">
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value);
                              setError({
                                ...error,
                                email:
                                  e.target.value === ""
                                    ? "*Email address is required!"
                                    : !/\S+@\S+\.\S+/.test(e.target.value)
                                    ? "*Email address is invalid!"
                                    : "",
                              });
                            }}
                            placeholder="Email Address "
                            className={`form-control email-id mt-0 ${
                              error.email
                                ? "form-control-error email-id mt-0 "
                                : ""
                            }`}
                          />

                          <div className="errorMsg">{error.email}</div>
                        </div>
                        <div id="sign-in-button" className="recaptcha" />
                        <button
                          type="submit"
                          className="sign-in"
                          // onClick={}
                        >
                          Send OTP
                        </button>
                        <p className="text-center">
                          <Link to="/forgotPassword">
                            Forgot password via Number
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default FpwdEmail;
