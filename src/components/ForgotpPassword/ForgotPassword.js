import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";
import OtpVerification1 from "../OtpVerification/OtpVerification1";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";
import useEncryption from "../EncryptData/EncryptData";
import ManinHeader from "../Layout/ManinHeader";

function Forgotpassword() {
  const [emailOrMobile, setemailOrMobile] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const { encryptData, decryptData } = useEncryption();
  const [IsValid, setIsValid] = useState(false);
  const [phone, setphone] = useState("");
  const [selCountryExpectedLength, setSelCountryExpectedLength] = useState(0);

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
        callback: (response) => {
          // console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onLogin(response);
          console.log("response", response);
        },
      },
      auth
    );
  };
  /*================ERROR MESSAGE============= */
  const [error, setError] = useState({
    emailOrMobile: "",
    password: "",
  });

  function onLogin(e) {
    e.preventDefault();

    if (emailOrMobile === "") {
      setError({
        ...error,
        emailOrMobile: "*PhoneNumber is required!",
      });
    } else if (phone.length !== selCountryExpectedLength) {
      setError({
        ...error,
        emailOrMobile: "*PhoneNumber is wrong!",
      });
    } else {
      forgotPassword();
    }
  }

  /*=============== forgotPassword API===========*/
  const a = emailOrMobile.slice(countryCode.length - 1);
  const forgotPassword = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          emailOrMobile: a,
          countryCode,
        })
      );
      const result = await baseUrl.post("/forgotPassword", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);
      // console.log("SignUp", results);

      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });
        setUpRecaptcha();
        const mobile = countryCode + a;
        const appVerifier = await window.recaptchaVerifier;
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
            // console.log(error);
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
      // console.log("err" + err);
    }
  };

  return (
    <>
      {showOtpBox ? (
        <OtpVerification1 countryCode={countryCode} phone={a} />
      ) : (
        <>
          <ManinHeader />
          <div className="logIn forgot-password-bg forgot-password">
            <section className="login-form ">
              <div className="container">
                {/* <div className="d-flex justify-content-between align-items-center header-md">
                <div>
                  <Link to="/">
                    <img
                      src="../../img/logo/logo.png"
                      alt=""
                      className="header-logo img-fluid"
                    />
                  </Link>
                </div>
              </div> */}
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="login-form-bg">
                      <h2 className="heading text-center"> Forgot Password</h2>
                      <form autoComplete="off" onSubmit={onLogin}>
                        <div className="d-grid justify-content-center">
                          <PhoneInput
                            className="daa"
                            name="phoneNumber"
                            type="phone"
                            placeholder=" Phone Number "
                            specialLabel={""}
                            searchPlaceholder="Search"
                            country={"in"}
                            value={emailOrMobile}
                            countryCodeEditable={false}
                            enableSearch
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
                              setphone(data);
                              setSelCountryExpectedLength(
                                countryData.format.length
                              );
                              setError({
                                ...error,
                                emailOrMobile:
                                  emailOrMobile === ""
                                    ? "*PhoneNumber is required!"
                                    : emailOrMobile.length <= 7 ||
                                      emailOrMobile.length >= 17
                                    ? "*PhoneNumber is is wrong!"
                                    : "",
                              });
                            }}
                            inputStyle={{
                              background: "#E2F1FE",
                              padding: "26px 1px 20px 50px",
                              marginTop: "22px",
                              border: error.emailOrMobile
                                ? "red 1px solid"
                                : "none",
                              boxShadow: error.emailOrMobile ? "none" : "",
                            }}
                            inputProps={{
                              required: true,
                              autoFocus: true,
                            }}
                            onBlur={() => {
                              phone.length !== selCountryExpectedLength
                                ? setIsValid(false)
                                : setIsValid(true);
                            }}
                            isValid={() =>
                              !IsValid
                                ? phone.length === selCountryExpectedLength
                                : IsValid
                            }
                          />

                          <div className="errorMsg">{error.emailOrMobile}</div>
                        </div>
                        <div id="sign-in-button" className="recaptcha" />
                        <button type="submit" className="sign-in">
                          Send OTP
                        </button>
                        <p className="text-center">
                          <Link to="/fpwdemail">
                            Forgot password via Email{" "}
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

export default Forgotpassword;
