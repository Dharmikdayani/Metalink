import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/resetpassword.css";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [cpwd, setCpwd] = useState("");
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
    password: "",
    cpwd: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    errorsObj = { ...errorsObj };

    if (password === "") {
      errorsObj.password = "*New Password is required";
    } else if (password.length < 8) {
      errorsObj.password = "New Password must be 8 or more characters";
    }

    if (cpwd === "") {
      errorsObj.cpwd = "*New Confirm Password is required";
      error = true;
    }

    if (password != cpwd) {
      errorsObj.cpwd = "*New Confirm Password is not matched With Password";
      error = true;
    }

    setErrors(errorsObj);

    if (error) return;
  }

  /*================setNewPassword API===============*/
  const navigate = useNavigate();

  const setNewPassword = async () => {
    try {
      const result = await baseUrl.put("/setNewPassword", {
        password: password,
        cpassword: cpwd,
      });
      if (result.data.success) {
        Toast.fire({
          icon: "success",
          title: result.data.message,
        });

        navigate("/signinpno");
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
                <h2 className="heading text-center"> Reset Password</h2>
                <form autoComplete="off" onSubmit={onSignUp}>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="form-control pwd"
                  />
                  {errors.password && (
                    <div className="errorMsg1">{errors.password}</div>
                  )}
                  <input
                    type="password"
                    name="cpwd"
                    value={cpwd}
                    onChange={(e) => setCpwd(e.target.value)}
                    placeholder="New Confirm Password"
                    className="form-control conf-pwd"
                  />
                  {errors.cpwd && (
                    <div className="errorMsg1">{errors.cpwd}</div>
                  )}

                  <button
                    className="sign-in"
                    type="submit"
                    onClick={setNewPassword}
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resetpassword;
