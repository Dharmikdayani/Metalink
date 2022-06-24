import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { signup } from "../feature/user";
import instance from "../baseUrl/baseUrl";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";
import OtpVerification from "../OtpVerification/OtpVerification";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [refCode, setRefCode] = useState("");
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
      errorsObj.username = "Invalid Username!";
      error = true;
    }

    if (phoneNumber === "") {
      errorsObj.phoneNumber = "Invalid PhoneNumber!";
      error = true;
    }

    if (email === "") {
      errorsObj.email = "Invalid Email!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = "Invalid Email!";
    }

    if (password === "") {
      errorsObj.password = "Invalid Password!";
    } else if (password.length < 8) {
      errorsObj.password = "Password must be 8 or more characters";
    }

    if (cpwd === "") {
      errorsObj.cpwd = "Invalid Confirm Password!";
      error = true;
    }

    if (password !== cpwd) {
      errorsObj.cpwd = "*Confirm password is not matched.";
      error = true;
    }

    if (refCode === "") {
      errorsObj.refCode = `No referral code? Use metalink!`;
      error = true;
    }

    setErrors(errorsObj);
    if (error) return;
    SignUp()
  };

  /*================SignUp API===============*/

  const navigate = useNavigate();

  const SignUp = async () => {
    try {
      const result = await instance.post("/signup", {
        username,
        email,
        countryCode,
        phoneNumber: a,
        password,
        refCode,
      });

      if (result.data.success) {
        console.log(result);

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
        dispatch(
          signup({
            _id: result.data.data._id,
            active: result.data.data.active,
            username: result.data.data.username,
            email: result.data.data.email,
            countryCode: result.data.data.countryCode,
            phoneNumber: result.data.data.phoneNumber,
            refCode:result.data.data.inviteCode
          })
        );
      } else {
        Toast.fire({
          icon: "error",
          title: result.data.message,
        });
      }
    } catch (err) {
      console.log("err" + err);
    }
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
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="User Name"
                        className="form-control user-name"
                      />
                      {errors.username && (
                        <div className="errorMsg ">{errors.username}</div>
                      )}
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address "
                        className="form-control email-id"
                      />
                      {errors.email && (
                        <div className="errorMsg">{errors.email}</div>
                      )}
                      <PhoneInput
                        className="daa"
                        name="phoneNumber"
                        type="phone"
                        placeholder=" Phone Number "
                        specialLabel={""}
                        country={"in"}
                        value={phoneNumber}
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
                          setPhoneNumber(inputPhone);
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
                      {errors.phoneNumber && (
                        <div className="errorMsg">{errors.phoneNumber}</div>
                      )}

                      <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="form-control pwd"
                        // security="password"
                      />
                      {errors.password && (
                        <div className="errorMsg">{errors.password}</div>
                      )}
                      <input
                        type="text"
                        name="cpwd"
                        value={cpwd}
                        onChange={(e) => setCpwd(e.target.value)}
                        placeholder="Confirm Password"
                        className="form-control conf-pwd"
                      />
                      {errors.cpwd && (
                        <div className="errorMsg ">{errors.cpwd}</div>
                      )}
                      <input
                        type="text"
                        name="refCode"
                        value={refCode}
                        onChange={(e) => setRefCode(e.target.value)}
                        placeholder="Invite Code"
                        className="form-control invite-codes"
                      />
                      {errors.refCode && (
                        <div className="errorMsg ">{errors.refCode}</div>
                      )}
                      <div id="sign-in-button" />
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
