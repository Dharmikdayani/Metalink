import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/resetpassword.css";
import Swal from "sweetalert2";
import baseUrl from "../baseUrl/baseUrl";
import useEncryption from "../EncryptData/EncryptData";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [cpwd, setCpwd] = useState("");
  const { encryptData, decryptData } = useEncryption();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
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
      error = true;
    } else if (password.length < 8) {
      errorsObj.password = "New Password must be 8 or more characters";
      error = true;
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
    setNewPassword();
  }

  /*================setNewPassword API===============*/
  const navigate = useNavigate();

  const setNewPassword = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          password: password,
          cpassword: cpwd,
        })
      );
      const result = await baseUrl.put("/setNewPassword", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);
      console.log("SignUp", results);

      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });

        navigate("/signinpno");
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

  /*=======SHOW PASSWORD====== */
  const onShowPassword = () => {
    setShowPass(!showPass);
  };

  /*=======SHOW Confirm PASSWORD====== */
  const onshowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  //* Prevent User For Entering Spaces
  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
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
                  <div className="d-grid justify-content-center">
                    <div className="position-relative">
                      <input
                        type={`${showPass ? "text" : "password"}`}
                        name="password"
                        value={password}
                        onKeyPress={preventSpace}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
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
                    <div className="position-relative">
                      <input
                        type={`${showConfirmPass ? "text" : "password"}`}
                        name="cpwd"
                        value={cpwd}
                        onKeyPress={preventSpace}
                        onChange={(e) => setCpwd(e.target.value)}
                        placeholder="New Confirm Password"
                        className={
                          errors.cpwd
                            ? "form-control-error conf-pwd "
                            : "form-control conf-pwd"
                        }
                      />
                      <img
                        role="button"
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
                      <div className="errorMsg">{errors.cpwd}</div>
                    )}
                  </div>

                  <button className="sign-in" type="submit">
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
