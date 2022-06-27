import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
      errorsObj.emailOrMobile = "*phoneNumber is required";
      error = true;
    }

    if (password === "") {
      errorsObj.password = "*phoneNumber is required";
      error = true;
    }

    setErrors(errorsObj);

    if (error) return;
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
      console.log(results);

      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });
        dispatch(
          signin({
            _id: result.data.data._id,
            active: result.data.data.active,
            username: result.data.data.username,
            email: result.data.data.email,
            countryCode: result.data.data.countryCode,
            phoneNumber: result.data.data.phoneNumber,
            refCode: result.data.data.inviteCode,
          })
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: result.data.data._id,
            active: result.data.data.active,
            username: result.data.data.username,
            email: result.data.data.email,
            countryCode: result.data.data.countryCode,
            phoneNumber: result.data.data.phoneNumber,
            refCode: result.data.data.inviteCode,
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
      console.log("err" + err);
    }
  };

  return (
    <div className="logIn signin-bg">
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
                <h2 className="heading text-center"> Sign In </h2>
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

                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control pwd"
                  />
                  {errors.password && (
                    <div className="errorMsg">{errors.password}</div>
                  )}

                  <Link
                    to="/forgotPassword"
                    className="text-end w-100 d-inline-block forgot-password"
                  >
                    Forgot Password?
                  </Link>
                  <button type="submit" className="sign-in" onClick={SigninPno}>
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
