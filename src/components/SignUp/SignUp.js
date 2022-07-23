import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { signup } from "../feature/user";
import instance from "../baseUrl/baseUrl";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";
import OtpVerification from "../OtpVerification/OtpVerification";
import useEncryption from "../EncryptData/EncryptData";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [refCode, setRefCode] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const { encryptData, decryptData } = useEncryption();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
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
          //console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  };
  /*================ERROR MESSAGE============= */
  const dispatch = useDispatch();
  let errorsObj = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpwd: "",
    refCode: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  const a = phoneNumber.slice(countryCode.length - 1);

  const onSignInSubmit = (e) => {
    e.preventDefault();

    let error = false;

    errorsObj = { ...errorsObj };

    if (username === "") {
      errorsObj.username = "*Username is required!";
      error = true;
    }

    if (phoneNumber === "") {
      errorsObj.phoneNumber = "*PhoneNumber is required!";
      error = true;
    } else if (!IsValid) {
      errorsObj.phoneNumber = "*PhoneNumber is wrong!";
      error = true;
    }

    if (email === "") {
      errorsObj.email = "*Email address is required!";
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = "*Email address is invalid!";
      error = true;
    }

    if (password === "") {
      errorsObj.password = "*Password is required!";
      error = true;
    } else if (password.length < 8) {
      errorsObj.password = "Password must be 8 or more characters";
      error = true;
    }

    if (cpwd === "") {
      errorsObj.cpwd = "*Confirm Password is required!";
      error = true;
    }

    if (password !== cpwd) {
      errorsObj.cpwd = "*Confirm password is not matched!";
      error = true;
    }

    if (refCode === "") {
      errorsObj.refCode = `No referral code? Use metalink!`;
      error = true;
    }

    setErrors(errorsObj);
    if (error) return;
    SignUp();
  };

  /*================SignUp API===============*/
  const SignUp = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          username,
          email,
          countryCode,
          phoneNumber: a,
          password,
          refCode,
        })
      );
      const result = await instance.post("/signup", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);
      //console.log("SignUp", results);

      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });
        setUpRecaptcha();
        const mobile = countryCode + a;
        const appVerifier = window.recaptchaVerifier;
        //console.log("otp sent on this number", mobile);
        signInWithPhoneNumber(auth, mobile, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //console.log("otp sent");
            setShowOtpBox(true);
            Toast.fire({
              icon: "success",
              title: "OTP sent",
            });
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
        dispatch(
          signup({
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
      //console.log("err" + err);
    }
  };

  //* Prevent User For Entering Spaces
  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };

  /*=======SHOW PASSWORD====== */
  const onShowPassword = () => {
    setShowPass(!showPass);
  };

  /*=======SHOW Confirm PASSWORD====== */
  const onshowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  return (
    <div>
      {showOtpBox ? (
        <OtpVerification
          username={username}
          email={email}
          refCode={refCode}
          phoneNumber={a}
          countryCode={countryCode}
          password={password}
        />
      ) : (
        <div className="logIn mining-bg">
          <section className="login-form signup-form">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center header-md">
                <div>
                  <Link to="/">
                    {" "}
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
                    <h2 className="heading text-center"> Sign Up </h2>
                    <form
                      autoComplete="off"
                      autoCorrect="off"
                      onSubmit={(e) => onSignInSubmit(e)}
                    >
                      <div className="d-grid justify-content-center">
                        <input
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="User Name"
                          className={`${
                            errors.username
                              ? " form-control-error user-name"
                              : "form-control user-name"
                          }`}
                        />
                        {errors.username && (
                          <div className="errorMsg">{errors.username}</div>
                        )}
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address "
                          className={
                            errors.email
                              ? "form-control-error email-id mt-4"
                              : "form-control email-id mt-4"
                          }
                        />
                        {errors.email && (
                          <div className="errorMsg">{errors.email}</div>
                        )}
                        <div className="position-relative mt-4 p-0">
                          <PhoneInput
                            name="phoneNumber"
                            type="phone"
                            placeholder=" Phone Number "
                            specialLabel={""}
                            searchPlaceholder="Search"
                            country={"in"}
                            countryCodeEditable={false}
                            enableClickOutside
                            disableCountryCode={false}
                            jumpCursorToEnd={false}
                            value={phoneNumber}
                            enableSearch
                            onChange={(
                              inputPhone,
                              countryData,
                              value,
                              data,
                              dialcode,
                              inputNumber,
                              e,
                              formattedValue
                            ) => {
                              // //console.log("phone", phone.length);
                              // //console.log("IsValid", IsValid);
                              setcountryCode(`+${countryData.dialCode}`);
                              setPhoneNumber(inputPhone);
                              setphone(data);
                              setSelCountryExpectedLength(
                                countryData.format.length
                              );
                              // //console.log(
                              //   "selCountryExpectedLength",
                              //   selCountryExpectedLength
                              // );
                            }}
                            inputStyle={{
                              background: "#E2F1FE",
                              padding: "25px 1px 20px 50px",
                              marginTop: "10px",
                              // color: "#9098AE",
                              border: errors.phoneNumber
                                ? "red 1px solid"
                                : "none",
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
                          {errors.phoneNumber && (
                            <div className="errorMsg">{errors.phoneNumber}</div>
                          )}
                        </div>
                        <div className="position-relative">
                          <input
                            type={`${showPass ? "text" : "password"}`}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={preventSpace}
                            placeholder="Password"
                            className={
                              errors.password
                                ? "form-control-error pwd "
                                : "form-control pwd"
                            }
                            // security="password"
                          />
                          <img
                            role="button"
                            alt="Eye-icon-img"
                            onClick={onShowPassword}
                            src={`${
                              showPass
                                ? "../../img/profile/openeye.png"
                                : "../../img/profile/hiddenEye.png"
                            }`}
                            className="Eye-icon"
                          />
                        </div>

                        {errors.password && (
                          <div className="errorMsg">{errors.password}</div>
                        )}
                        <div className="position-relative">
                          <input
                            type={`${showConfirmPass ? "text" : "password"}`}
                            name="cpwd"
                            value={cpwd}
                            onChange={(e) => setCpwd(e.target.value)}
                            onKeyPress={preventSpace}
                            placeholder="Confirm Password"
                            className={
                              errors.cpwd
                                ? "form-control-error conf-pwd "
                                : "form-control conf-pwd"
                            }
                          />
                          <img
                            role="button"
                            alt="Eye-icon-img"
                            onClick={onshowConfirmPass}
                            src={`${
                              showConfirmPass
                                ? "../../img/profile/openeye.png"
                                : "../../img/profile/hiddenEye.png"
                            }`}
                            className="Eye-icon"
                          />
                        </div>

                        {errors.cpwd && (
                          <div className="errorMsg ">{errors.cpwd}</div>
                        )}
                        <input
                          type="text"
                          name="refCode"
                          value={refCode}
                          onChange={(e) => setRefCode(e.target.value)}
                          placeholder="Invite Code"
                          className={
                            errors.refCode
                              ? "form-control-error invite-codes"
                              : "form-control invite-codes"
                          }
                        />
                        {errors.refCode && (
                          <div className="errorMsg ">{errors.refCode}</div>
                        )}
                      </div>

                      <div id="sign-in-button"  className="recaptcha" />
                      <button
                        className="sign-in"
                        type="submit"
                        // onClick={SignUp}
                      >
                        Sign Up
                      </button>
                      <p className="text-center">
                        Have an account?
                        <Link to="/signin"> Sign In </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default SignUp;
