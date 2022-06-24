import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";
import OtpVerification1 from "../OtpVerification/OtpVerification1";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";

function Forgotpassword() {
  const [emailOrMobile, setemailOrMobile] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

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
          onLogin();
        },
      },
      auth
    );
  };
  /*================ERROR MESSAGE============= */
  let errorsObj = {
    emailOrMobile: "",
  };

  const [errors, setErrors] = useState(errorsObj);

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    errorsObj = { ...errorsObj };

    if (emailOrMobile === "") {
      errorsObj.emailOrMobile = "*phoneNumber is required";
      error = true;
    }

    setErrors(errorsObj);

    if (error) return;
  }

  /*=============== forgotPassword API===========*/
  const a = emailOrMobile.slice(countryCode.length - 1);
  const forgotPassword = async () => {
    try {
      const result = await baseUrl.post("/forgotPassword", {
        emailOrMobile: a,
        countryCode,
      });
      if (result.data.success) {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        });
        await setUpRecaptcha();
        const mobile = countryCode + a;
        const appVerifier = window.recaptchaVerifier;
        console.log("otp sent on this number", mobile);
        signInWithPhoneNumber(auth, mobile, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("otp sent");
            setShowOtpBox(true);
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
      } else {
        Toast.fire({
          icon: "error",
          title: `hyy${result.data.message}`,
        });
      }
    } catch (err) {
      console.log("err" + err);
    }
  };

  return (
    <>
      {showOtpBox ? (
        <OtpVerification1 countryCode={countryCode} phone={a} />
      ) : (
        <div className="logIn forgot-password-bg forgot-password">
          <section className="login-form ">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center header-md">
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
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                  <div className="login-form-bg">
                    <h2 className="heading text-center"> Forgot Password</h2>
                    <form autoComplete="off" onSubmit={onLogin}>
                      <PhoneInput
                        className="daa"
                        name="phoneNumber"
                        type="phone"
                        placeholder=" Phone Number "
                        specialLabel={""}
                        country={"in"}
                        value={emailOrMobile}
                        onChange={(
                          inputPhone,
                          countryData,
                          value,
                          data,
                          dialcode,
                          inputNumber,
                          e
                        ) => {
                          setcountryCode(`+${countryData.dialCode}`);
                          setemailOrMobile(inputPhone);
                        }}
                        inputStyle={{
                          background: "#E2F1FE",
                          padding: "25px 1px 20px 50px",
                          marginTop: "22px",
                        }}
                        inputProps={{
                          required: true,
                          autoFocus: true,
                        }}
                      />
                      {errors.emailOrMobile && (
                        <div className="errorMsg">{errors.emailOrMobile}</div>
                      )}
                      <div id="sign-in-button" />
                      <button
                        type="submit"
                        className="sign-in"
                        onClick={forgotPassword}
                      >
                        Send OTP
                      </button>
                      <p className="text-center">
                        <Link to="/fpwdemail">Forgot password via Email </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Forgotpassword;
