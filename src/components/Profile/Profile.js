import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ManinHeader from "../Layout/ManinHeader";
import Footer from "../Layout/Footer";
import $, { data } from "jquery";
import "../../css/profile.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout, selecUser, signin, updateProfile } from "../feature/user";
import instance from "../baseUrl/baseUrl";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpVerificationFormobile from "../OtpVerification/OtpVerificationFormobile";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase-config";
import useEncryption from "../EncryptData/EncryptData";

const Profile = () => {
  document.title = "Profile";
  const [UserName, setUserName] = useState("");
  const [inviteCode, setinviteCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const effectCalled = useRef(false);
  const user = useSelector(selecUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setmobile] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [oldMobile, setOldMobile] = useState();
  const { encryptData, decryptData } = useEncryption();
  const [ProfileData, SetProfileData] = useState("");
  function closeOtpBox() {
    setShowOtpBox(false);
  }
  // const a = phoneNumber.slice(countryCode.length - 1);
  // console.log("ProfileData",ProfileData._id)

  const name = ProfileData._id;
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

  /*================editing btn========== */
  const profiles = () => {
    var selector = ".editing-btn";
    $(selector).on("click", function () {
      $(selector).removeClass("active");
      $(this).addClass("active");
    });
  };

  /*=================copy function==============*/

  const copyToClipboard = () => {
    copy(user.inviteCode);
    Toast.fire({
      icon: "success",
      title: `copied successfully`,
    });
  };

  /*=============== useEffect for getUserProfile calling======= */
  useEffect(() => {
    if (!effectCalled.current) {
      getUserProfile();

      effectCalled.current = true;
    }
  }, [user]);

  /*=============LOGOUT FUNCTION===========*/
  const handleogout = (e) => {
    e.preventDefault();

    dispatch(logout());

    localStorage.removeItem("user");
    navigate("/");
  };

  /*=================getUserProfile API============= */

  const getUserProfile = async () => {
    try {
      const result = await instance.get("/getUserProfile");

      const results = decryptData(result.data.data);
      console.log("getUserProfile", results);

      if (results.success) {
        // Toast.fire({
        //   icon: "success",
        //   title: results.message,
        // });
        SetProfileData(results.data);
        setUserName(results.data.username);
        setEmail(results.data.email);
        setcountryCode(results.data.countryCode);
        setPhoneNumber(results.data.phoneNumber);
        setinviteCode(results.data.inviteCode);
        setmobile(results?.data?.countryCode + results?.data?.phoneNumber);
        setOldMobile(results?.data?.countryCode + results?.data?.phoneNumber);
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
          updateProfile({
            _id: results.data._id,
            active: results.data.active,
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
      console.log("err" + err);
    }
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // savadata();
        },
      },
      auth
    );
  };

  /*=================updateProfile API============= */
  const savadata = async () => {
    if (oldMobile === mobile) {
      try {
        setShowOtpBox(false);
        const encrypt = encryptData(
          JSON.stringify({
            username: ProfileData.username !== UserName ? UserName : null,
            email: ProfileData.email !== email ? email : null,
            password: password,
            countryCode:
              ProfileData.countryCode !== countryCode ? countryCode : null,
            phoneNumber:
              ProfileData.phoneNumber !== phoneNumber ? phoneNumber : null,
          })
        );
        const result = await instance.put("/updateProfile", {
          data: encrypt,
        });

        const results = decryptData(result.data.data);

        if (results.success) {
          Toast.fire({
            icon: "success",
            title: results.message,
          });
          SetProfileData(results.data);
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

          setinviteCode(results.data.inviteCode);
          setUserName(results.data.username);
          setEmail(results.data.email);
          setPhoneNumber(results.data.phoneNumber);
          setcountryCode(results.data.countryCode);
          setmobile(results.data.countryCode + results.data.phoneNumber);
          setOldMobile(results.data.countryCode + results.data.phoneNumber);

          dispatch(
            updateProfile({
              _id: results.data._id,
              active: results.data.active,
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
        console.log("err" + err);
      }
    } else {
      setUpRecaptcha();
      const mobile = oldMobile;
      const appVerifier = window.recaptchaVerifier;
      console.log("otp sent on this number", mobile);
      signInWithPhoneNumber(auth, mobile, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          setShowOtpBox(true);
          console.log("otp sent");
          Toast.fire({
            icon: "success",
            title: "otp sent",
          });
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "SMS not sent Plase try again.",
          });
        });
    }
  };

  return (
    <div>
      {showOtpBox ? (
        <OtpVerificationFormobile
          countryCode={countryCode}
          phone={phoneNumber}
          oldMobile={oldMobile}
          username={UserName}
          email={email}
          password={password}
          closeOtpBox={closeOtpBox}
          setmobile={setmobile}
          setOldMobile={setOldMobile}
          ProfileData={ProfileData}
        />
      ) : (
        <div className="mining-bg">
          {/* <!-- ------------------- MINING START ----------------- --> */}

          <ManinHeader />
          {/* <!-- ------------------- Profile ----------------- -->     */}
          <div>
            <section className="profile w-100 d-md-inline-block position-relative">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-12">
                    <h3 className="common-heading text-center mb-0">Profile</h3>
                    <form className="currentuser-profile">
                      <div className="row profile-wrap">
                        <div className="col-md-6 profile-padding">
                          <div className="profile-box">
                            <h4 className="team-title">{UserName}</h4>

                            <label className="label-title1 position-absolute">
                              Username
                            </label>
                            <div
                              className="profile-name position-relative userNames"
                              onClick={profiles}
                            >
                              <span className="name-info1 w-100 d-inline-block">
                                {UserName}
                              </span>

                              <div className="editing-btn">
                                <img src="../../img/profile/editing.png" />

                                <input
                                  type="text"
                                  name="text"
                                  placeholder="User Name"
                                  className="profile-input"
                                  value={UserName ? UserName : ""}
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="label-title">
                                Invitation code to share
                              </label>
                              <div
                                id="inviteCode"
                                className="invite-page d-flex"
                              >
                                <input
                                  name="name"
                                  value={inviteCode ? inviteCode : ""}
                                  onChange={(e) =>
                                    setinviteCode(e.target.value)
                                  }
                                  readOnly
                                />

                                <div id="copyClipboard">
                                  <img
                                    src="../../img/profile/copy-icon.png"
                                    className="copy-invite-code"
                                    aria-hidden="true"
                                    data-copytarget="#link"
                                    onClick={copyToClipboard}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="label-title">
                                Referral link to share
                              </label>
                              <div className="referral-link d-flex justify-content-between">
                                minepl.com/johnwick54
                                <button
                                  onClick={() => setIsOpen(true)}
                                  className="share-button border-0 bg-transparent"
                                  type="button"
                                  title="Share this article"
                                >
                                  <img src="../../img/profile/share-link.png" />
                                </button>
                              </div>
                            </div>
                            <h6 className="account-title">
                              Account Verification
                            </h6>
                            <div className="form-group">
                              <label className="name-title">
                                Hide real name
                              </label>
                              <div className="members-info d-flex justify-content-between align-items-start">
                                Hide my real name from members of my earning
                                team
                                <div className="toggle-box d-flex">
                                  <input type="checkbox" id="switch" />
                                  <label htmlFor="switch">Toggle</label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="name-title">
                                Account deletion
                              </label>
                              <div className="members-info d-flex justify-content-between align-items-center">
                                Tap here to delete your account.
                                <div className="request-info">
                                  <a href="#" className="request-btn">
                                    Request
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-6 profile-padding"
                          onClick={() => profiles()}
                        >
                          <div className="profile-tabs d-flex align-items-start justify-content-between">
                            <h6 className="account-title mt-0">Profile</h6>
                            <div id="sign-in-button" />

                            <a
                              href="#"
                              className="save-btn text-decoration-none"
                              onClick={savadata}
                            >
                              Save
                            </a>
                          </div>
                          <div className="form-group multi-field-wrapper position-relative">
                            <div className="profile-name position-relative">
                              <span className="name-info w-100 d-inline-block">
                                {email}
                              </span>
                              <div className="editing-btn">
                                <img src="../../img/profile/editing.png" />
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email id"
                                  minLength="8"
                                  className="profile-input"
                                  value={email ? email : ""}
                                  oonChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group multi-field-wrapper position-relative">
                            <div className="profile-name position-relative">
                              <span className="name-info w-100 d-inline-block">
                                ********
                              </span>
                              <div className="editing-btn">
                                <img src="../../img/profile/editing.png" />
                                <input
                                  type="password"
                                  name="pwd"
                                  placeholder="Password"
                                  minLength="8"
                                  className="profile-input"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group multi-field-wrapper position-relative">
                            <div className="profile-name position-relative">
                              <span className="name-info w-100 d-inline-block">
                                {/* {countryCode} {phoneNumber} */}
                                {mobile}
                              </span>
                              <div className="editing-btn">
                                <img src="../../img/profile/editing.png" />

                                <div className=" phone ">
                                  <PhoneInput
                                    className="profile-input"
                                    name="phoneNumber "
                                    type="phone"
                                    placeholder=" Phone Number "
                                    specialLabel={""}
                                    country={"in"}
                                    value={mobile}
                                    onChange={(
                                      inputPhone,
                                      countryData,
                                      value,
                                      data,
                                      dialcode,
                                      inputNumber,
                                      e
                                    ) => {
                                      setcountryCode(
                                        `+${countryData.dialCode}`
                                      );
                                      setPhoneNumber(
                                        inputPhone.slice(countryCode.length - 1)
                                      );

                                      setmobile("+" + inputPhone);
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
                                  {/* {setOldMobile} */}
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="signout-btn"
                        onClick={(e) => handleogout(e)}
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- Referral_link_to_share_Popup --> */}
              <div className={isOpen ? "share-dialog is-open" : "share-dialog"}>
                <div className="modal-headertop d-flex justify-content-between align-items-center">
                  <h3 className="dialog-title mb-0">Share this pen</h3>
                  <button
                    onClick={() => setIsOpen((data = false))}
                    className="close-button border-0 bg-transparent"
                  >
                    <a href="#close">
                      <img src="../../img/profile/close.png" />
                    </a>
                  </button>
                </div>
                <div className="targets">
                  <div className="footer-social d-flex">
                    <div className="social-bg position-relative mt-0">
                      <a href="#" className="social-icon">
                        <img src="../../img/icon/facebook.png" alt="" />
                      </a>
                    </div>
                    <div className="social-bg position-relative mt-0">
                      <a href="#" className="social-icon">
                        <img src="../../img/icon/twitter.png" alt="" />
                      </a>
                    </div>
                    <div className="social-bg position-relative mt-0">
                      <a href="#" className="social-icon">
                        <img src="../../img/icon/instagram.png" alt="" />
                      </a>
                    </div>
                    <div className="social-bg position-relative mt-0">
                      <a href="#" className="social-icon">
                        <img src="../../img/icon/discord.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* <!--------------- Footer Start --------------> */}
          <Footer />

          {/* <!-- ------------------- CURRENT MINING RATE END ----------------- --> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
