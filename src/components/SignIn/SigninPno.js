import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import instance from "../baseUrl/baseUrl";
import { useDispatch } from "react-redux";
import { signin } from "../feature/user";
import useEncryption from "../EncryptData/EncryptData";

function SigninPno() {
  const [emailOrMobile, setemailOrMobile] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [password, setPassword] = useState("");
  const { encryptData, decryptData } = useEncryption();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
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

  /*================ERROR MESSAGE============= */

  let errorsObj = {
    emailOrMobile: "",
    password: "",
  };

  const [errors, setErrors] = useState(errorsObj);
  function onLogin(e) {
    e.preventDefault();
    let error = false;
    errorsObj = { ...errorsObj };

    if (emailOrMobile === "") {
      errorsObj.emailOrMobile = "*PhoneNumber is required!";
      error = true;
    }else if (!IsValid) {
      errorsObj.emailOrMobile = "*PhoneNumber is wrong!";
      error = true;
    }

    if (password === "") {
      errorsObj.password = "*Password is required!";
      error = true;
    }

    setErrors(errorsObj);

    if (error) return;
    SigninPno();
  }

  /*================SigninPno API===============*/

  const navigate = useNavigate();
  const a = emailOrMobile.slice(countryCode.length - 1);

  const SigninPno = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          countryCode,
          emailOrMobile: a,
          password,
        })
      );
      const result = await instance.post("/signin", {
        data: encrypt,
      });
      const results = decryptData(result.data.data);
      //console.log(results);

      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });
        dispatch(
          signin({
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
        navigate("/mine");
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

  /*=======SHOW PASSWORD====== */
  const onShowPassword = () => {
    setShowPass(!showPass);
  };

    //* Prevent User For Entering Spaces
  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };

  return (
    <div className="logIn signin-bg">
      <section className="login-form signup-form">
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
                <h2 className="heading text-center"> Sign In </h2>
                <form autoComplete="off" onSubmit={onLogin}>
                  <div className="d-grid justify-content-center">
                    <PhoneInput
                      className="daa"
                      name="phoneNumber"
                      type="phone"
                      placeholder=" Phone Number "
                      specialLabel={"+91"}
                      country={"in"}
                      searchPlaceholder="Search"
                      enableSearch
                      countryCodeEditable={false}
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
                        setphone(data);
                        setSelCountryExpectedLength(
                          countryData.format.length
                        );
                      }}
                      inputStyle={{
                        background: "#E2F1FE",
                        padding: "26px 1px 20px 50px",
                        marginTop: "22px",
                        border: errors.emailOrMobile ? "red 1px solid" : "none",
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
                          ? phone.length == selCountryExpectedLength
                          : IsValid
                      }
                    />
                    {errors.emailOrMobile && (
                      <div className="errorMsg">{errors.emailOrMobile}</div>
                    )}
                    <div className="position-relative">
                      <input
                        type={`${showPass ? "text" : "password"}`}
                        name="password"
                        value={password}
                        onKeyPress={preventSpace}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={
                          errors.password
                            ? "form-control-error pwd "
                            : "form-control pwd"
                        }
                      />
                      <img
                        role="button"
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

                    <Link
                      to="/forgotPassword"
                      className="text-end w-100 d-inline-block forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button type="submit" className="sign-in">
                    Sign In
                  </button>
                  <p className="text-center">
                    <Link to="/Signin">Sign In with Email </Link>{" "}
                  </p>
                  <p className="text-center">
                    Don't have an account? <Link to="/signup">Sign Up </Link>{" "}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SigninPno;
