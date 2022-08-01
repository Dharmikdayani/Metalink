import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import instance from "../baseUrl/baseUrl";
import { signin } from "../feature/user";
import useEncryption from "../EncryptData/EncryptData";
import ManinHeader from "../Layout/ManinHeader";

function SignIn() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { encryptData, decryptData } = useEncryption();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
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
    email: "",
    password: "",
  });
  function onLoginSubmit(e) {
    e.preventDefault();
    if (email === "") {
      // console.log("first")
      setError({
        ...error,
        email: "*Email address is required!",
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        ...error,
        email: "*Email address is invalid!",
      });
    } else if (password === "") {
      setError({
        ...error,
        password: "*Password is required!",
      });
    } else {
      SignIn();
    }
  }

  /*================SignIn API===============*/
  const navigate = useNavigate();
  const SignIn = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          emailOrMobile: email,
          password,
        })
      );
      const result = await instance.post("/signin", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);
      //console.log("SignIn", results);

      if (results.success) {
        Toast.fire({
          icon: "success",
          title: results.message,
        });

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
    <>
      <ManinHeader />
      <div className="logIn signin-bg">
        <section className="login-form signup-form">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="login-form-bg">
                  <h2 className="heading text-center"> Sign In </h2>
                  <form autoComplete="off" onSubmit={onLoginSubmit}>
                    <div className="d-grid justify-content-center">
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
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
                        placeholder="Email Address"
                        className={`form-control email-id mt-0 ${
                          error.email ? "form-control-error email-id mt-0 " : ""
                        }`}
                      />
                      <div className="errorMsg">{error.email}</div>
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
                                  ? "*Password is required!"
                                  : null,
                            });
                          }}
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
                      <Link to="/SigninPno">Sign In with Phone Number </Link>
                    </p>

                    <p className="text-center ">
                      Don't have an account?
                      <Link to="/signup"> Sign Up </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignIn;
