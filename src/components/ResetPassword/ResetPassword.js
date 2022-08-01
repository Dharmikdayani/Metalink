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

  const [error, setError] = useState({
    password: "",
    cpwd: "",
  });
  function onSignUp(e) {
    e.preventDefault();

    if (password === "") {
      setError({
        ...error,
        password: "*New Password is required",
      });
    } else if (password.length < 8) {
      setError({
        ...error,
        password: (password = "*New Password must be 8 or more characters"),
      });
    } else if (cpwd === "") {
      setError({
        ...error,
        cpwd: "*New Confirm Password is required",
      });
    } else if (password !== cpwd) {
      setError({
        ...error,
        cpwd: "*New Confirm Password is not matched With Password",
      });
    } else {
      setNewPassword();
    }
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
      //console.log("SignUp", results);

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
      //console.log("err" + err);
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
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError({
                            ...error,
                            password:
                              e.target.value === ""
                                ? "*New Password is required!"
                                : e.target.value.length < 8
                                ? "*New Password must be 8 or more characters!"
                                : null,
                          });
                        }}
                        placeholder="New Password"
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
                        onKeyPress={preventSpace}
                        onChange={(e) => {
                          setCpwd(e.target.value);
                          setError({
                            ...error,
                            cpwd:
                              e.target.value === ""
                                ? "*New Confirm Password is required!"
                                : e.target.value !== password
                                ? "*New Confirm password is not matched!"
                                : null,
                          });
                        }}
                        placeholder="New Confirm Password"
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
                            ? "../../img/profile/openeye.png"
                            : "../../img/profile/hiddenEye.png"
                        }`}
                        className="Eye-icon"
                      />
                    </div>

                    <div className="errorMsg">{error.cpwd}</div>
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
