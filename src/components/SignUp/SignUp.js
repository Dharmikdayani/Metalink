import React, { useEffect, useState } from "react";
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
import ManinHeader from "../Layout/ManinHeader";

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
  const dispatch = useDispatch();
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
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const myParam = urlParams.get('ref');
    setRefCode(myParam)
  }, [])
  

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        // size: "invisible",
        callback: (response) => {
          //console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onLoginSubmit();
        },
      },
      auth
    );
  };
  /*================ERROR MESSAGE============= */
  const [error, setError] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpwd: "",
    refCode: "",
  });
  function onLoginSubmit(e) {
    e.preventDefault();
    if (username === "") {
      setError({
        ...error,
        username: "*Usernameis required!",
      });
    } else if (email === "") {
      setError({
        ...error,
        email: "*Email address is required!",
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        ...error,
        email: "*Email address is invalid!",
      });
    } else if (phoneNumber === "") {
      setError({
        ...error,
        phoneNumber: "*PhoneNumber is required!",
      });
    } else if (phoneNumber.length <= 7 || phoneNumber.length >= 17) {
      setError({
        ...error,
        phoneNumber: "*PhoneNumber is required!",
      });
    } else if (password === "") {
      setError({
        ...error,
        password: "*Password is required!",
      });
    } else if (password.length < 8) {
      setError({
        ...error,
        password: "*Password must be 8 or more characters!",
      });
    } else if (cpwd === "") {
      setError({
        ...error,
        cpwd: "*Confirm Password is required!",
      });
    } else if (password !== cpwd) {
      setError({
        ...error,
        cpwd: "*Confirm password is not matched!",
      });
    } else if (refCode === "") {
      setError({
        ...error,
        refCode: `No referral code? Use metalink!`,
      });
    } else {
      SignUp();
    }
  }

  /*================SignUp API===============*/
  const a = phoneNumber.slice(countryCode.length - 1);
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
        <>
          <ManinHeader />
          <div className="logIn mining-bg">
            <section className="login-form signup-form">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="login-form-bg">
                      <h2 className="heading text-center"> Sign Up </h2>
                      <form
                        autoComplete="off"
                        autoCorrect="off"
                        onSubmit={onLoginSubmit}
                      >
                        <div className="d-grid justify-content-center">
                          <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                              setError({
                                ...error,
                                username:
                                  e.target.value === ""
                                    ? "*Username is required!"
                                    : "",
                              });
                            }}
                            placeholder="User Name"
                            className={`form-control user-name ${
                              error.username
                                ? " form-control-error user-name "
                                : ""
                            }`}
                          />

                          <div className="errorMsg">{error.username}</div>

                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
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
                            className={`form-control email-id mt-4 ${
                              error.email
                                ? "form-control-error email-id mt-4 "
                                : ""
                            }`}
                          />

                          <div className="errorMsg">{error.email}</div>

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
                                setcountryCode(`+${countryData.dialCode}`);
                                setPhoneNumber(inputPhone);
                                setphone(data);
                                setSelCountryExpectedLength(
                                  countryData.format.length
                                );
                                setError({
                                  ...error,
                                  phoneNumber:
                                    phoneNumber.length <= 7 ||
                                    phoneNumber.length >= 17
                                      ? "*PhoneNumber is wrong!"
                                      : "",
                                });
                              }}
                              inputStyle={{
                                background: "#E2F1FE",
                                padding: "25px 1px 20px 50px",
                                marginTop: "10px",
                                border: error.phoneNumber
                                  ? "red 1px solid"
                                  : "none",
                                boxShadow: error.phoneNumber ? "none" : null,
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
                            <div className="errorMsg">{error.phoneNumber}</div>
                          </div>
                          <div className="position-relative">
                            <input
                              type={`${showPass ? "text" : "password"}`}
                              name="password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setError({
                                  ...error,
                                  password:
                                    e.target.value === ""
                                      ? "*Password is required!"
                                      : e.target.value.length < 8
                                      ? "*Password must be 8 or more characters!"
                                      : null,
                                });
                              }}
                              onKeyPress={preventSpace}
                              placeholder="Password"
                              className={`form-control pwd ${
                                error.password ? "form-control-error pwd" : ""
                              }`}
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
                          <div className="errorMsg">{error.password}</div>
                          <div className="position-relative">
                            <input
                              type={`${showConfirmPass ? "text" : "password"}`}
                              name="cpwd"
                              value={cpwd}
                              onChange={(e) => {
                                setCpwd(e.target.value);
                                setError({
                                  ...error,
                                  cpwd:
                                    e.target.value === ""
                                      ? "*Confirm Password is required!"
                                      : e.target.value !== password
                                      ? "*Confirm password is not matched!"
                                      : null,
                                });
                              }}
                              onKeyPress={preventSpace}
                              placeholder="Confirm Password"
                              className={`form-control conf-pwd ${
                                error.cpwd ? "form-control-error conf-pwd" : ""
                              }`}
                            />
                            <img
                              role="button"
                              alt="Eye-icon-img"
                              onClick={onshowConfirmPass}
                              src={`${
                                showConfirmPass
                                  ? "../../img/profile/openeye.svg"
                                  : "../../img/profile/hiddenEye.svg"
                              }`}
                              className="Eye-icon"
                            />
                          </div>
                          <div className="errorMsg ">{error.cpwd}</div>
                          <input
                            type="text"
                            name="refCode"
                            value={refCode}
                            onChange={(e) => {
                              setRefCode(e.target.value);
                              setError({
                                ...error,
                                refCode:
                                  e.target.value === ""
                                    ? `No referral code? Use metalink!`
                                    : null,
                              });
                            }}
                            placeholder="Invite Code"
                            className={`form-control invite-codes ${
                              error.refCode
                                ? "form-control-error invite-codes"
                                : ""
                            }`}
                          />

                          <div className="errorMsg ">{error.refCode}</div>
                        </div>

                        <div id="sign-in-button" className="recaptcha" />
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
        </>
      )}
    </div>
  );
}

export default SignUp;
