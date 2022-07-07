import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/forgotPassword.css";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";
import OtpVerification1 from "../OtpVerification/OtpVerification1";
import useEncryption from "../EncryptData/EncryptData";

function FpwdEmail() {
  const [email, setemail] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
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

  /*================ERROR MESSAGE============= */

  let errorsObj = {
    email: "",
  };

  const [errors, setErrors] = useState(errorsObj);

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    errorsObj = { ...errorsObj };

    if (email === "") {
      errorsObj.email = "*Email address is required!";
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = "*Email address is invalid!";
      error = true;
    }

    setErrors(errorsObj);
    if (error) {
      return;
    }
    forgotPassword();
  }

  /*=============== forgotPassword API===========*/
  // const navigate = useNavigate();

  const forgotPassword = async () => {
    console.log(email);
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
      console.log("SignUp", results);
      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });
        setShowOtpBox(true);
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
    <div>
      {showOtpBox ? (
        <OtpVerification1 email={email} />
      ) : (
        <div className="logIn forgot-password-bg forgot-password">
          <section className="login-form ">
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
                    <h2 className="heading text-center"> Forgot Password</h2>
                    <form autoComplete="off" onSubmit={onSignUp}>
                      <div className="d-grid justify-content-center">
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          placeholder="Email Address "
                          className="form-control email-id"
                        />
                        {errors.email && (
                          <div className="errorMsg">{errors.email}</div>
                        )}
                      </div>

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
      )}
    </div>
  );
}

export default FpwdEmail;
