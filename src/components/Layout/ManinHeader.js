import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../css/header.css";

const ManinHeader = ({ socket }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getItem = JSON.parse(localStorage.getItem("user"));
  const [openNotifaction, setOpenNotifaction] = useState(false);
  let location = useLocation();
  /*========outside click event withdraw =========== */

  const withdraw = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu

      if (withdraw.current && !withdraw.current.contains(e.target)) {
        setOpenNotifaction(false);

        document.querySelector("#popup1").style.display = "none";
        console.log("first");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openNotifaction]);

  function Markasread (){
    // document.getElementById("popup1").style.background="red"
  }
  return (
    <>
      <section className="header index-header fix ">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center header-md">
            <div>
              <NavLink to="/">
                <img
                  src="../../img/logo/logo.png"
                  alt=""
                  className="header-logo img-fluid pulse"
                />
              </NavLink>
            </div>
            {/* =======================Mobile-view Section============= */}
            <nav>
              <div id="menuToggle" className="d-sm-none">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/platform" className="nav-link">
                      Platform
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/team" className="nav-link">
                      Team
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contactus" className="nav-link">
                      Contact Us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/#" className="nav-link">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <div className="border-bottom" />
                  </li>
                  <li>
                    <div>
                      <NavLink to="/">
                        <img
                          src="../../img/logo/logo.png"
                          alt=""
                          className="header-logo img-fluid pulse"
                        />
                      </NavLink>
                    </div>
                  </li>
                  <div className="footer-social d-flex ">
                    <div className="social-bg">
                      <a
                        href="https://dsc.gg/metalink"
                        className="social-icon"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="../../img/icon/discord.svg"
                          alt=""
                          className="simple-social-icon"
                        />
                        <img
                          src="../../img/icon/discord-hover.png"
                          alt=""
                          className="fill-social-icon"
                        />
                      </a>
                    </div>
                    <div className="social-bg">
                      <a
                        href="https://twitter.com/MetalinkNetwork"
                        className="social-icon"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="../../img/icon/twitter.svg"
                          alt=""
                          className="simple-social-icon"
                        />
                        <img
                          src="../../img/icon/twitter-hover.png"
                          alt=""
                          className="fill-social-icon"
                        />
                      </a>
                    </div>
                    <div className="social-bg">
                      <a
                        href="https://www.linkedin.com/company/metalink-network"
                        className="social-icon"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="../../img/icon/linkedinhover.png"
                          alt=""
                          className="simple-social-icon"
                        />
                        <img
                          src="../../img/icon/linkedin.png"
                          alt=""
                          className="fill-social-icon"
                        />
                      </a>
                    </div>

                    <div className="social-bg">
                      <a
                        href="https://www.instagram.com/metalinknetwork/"
                        className="social-icon"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="../../img/icon/instagram.svg"
                          alt=""
                          className="simple-social-icon"
                        />
                        <img
                          src="../../img/icon/instagram-hover.png"
                          alt=""
                          className="fill-social-icon"
                        />
                      </a>
                    </div>
                  </div>
                </ul>
              </div>
            </nav>

            {/*================= desktop Section======= */}
            <div className="d-flex align-items-center header-page-name">
              <ul>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : "none"}`}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item d-lg-flex align-items-baseline d-md-inline-block ">
                  <NavLink
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : null}`}
                    to={getItem ? "/mine" : "/signin"}
                  >
                    Mine
                    <img src="../../img/logo/header-m.png" alt="" />
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : null}`}
                    to="/platform"
                  >
                    Platform
                  </NavLink>
                </li>

                <li className="nav-item ">
                  <NavLink
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : null}`}
                    to="/team"
                  >
                    Team
                  </NavLink>
                </li>
                {/* =========notification popup============ */}
                {location.pathname === "/mine" ? (
                  <ul>
                    <a
                      className="Notification button"
                      href="#popup1"
                      onClick={() => setOpenNotifaction(true)}
                    >
                      <img
                        src="../../img/icon/notification.png"
                        alt=""
                        className="Notification-without-hover"
                      />
                      <img
                        src="../../img/icon/notifiction-hover.png"
                        alt=""
                        className="d-none Notification-hover"
                      />
                      {openNotifaction ? (
                        <div id="popup1" className="overlay" ref={withdraw}>
                          <span className="space-menu-rect"></span>
                          <div className="popup">
                            <div className="d-flex justify-content-between border-bottom content">
                              <h2 className="notification-font">
                                Notification
                              </h2>
                              <p className="mark-read" onClick={Markasread}>Mark as read</p>
                            </div>

                            <div className="user-notification mt-2 d-flex border-bottom">
                              <img
                                className="user-icon"
                                src="../../img/icon/Group.svg"
                                alt="user-icon"
                              />
                              <div className="mt-3 mx-2">
                                <h2 className="user-name">Notification</h2>
                                <p className="user-Describe">
                                  Describe the event here.
                                </p>
                              </div>
                            </div>

                            <div className="user-notification mt-2 d-flex border-bottom">
                              <img
                                className="user-icon"
                                src="../../img/icon/Group.svg"
                                alt="user-icon"
                              />
                              <div className="mt-3 mx-2">
                                <h2 className="user-name">Notification</h2>
                                <p className="user-Describe">
                                  Describe the event here.
                                </p>
                              </div>
                            </div>

                            <div className="user-notification mt-2 d-flex border-bottom">
                              <img
                                className="user-icon"
                                src="../../img/icon/Group.svg"
                                alt="user-icon"
                              />
                              <div className="mt-3 mx-2">
                                <h2 className="user-name">Notification</h2>
                                <p className="user-Describe">
                                  Describe the event here.
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="View mt-3 mx-1">
                                View all notifications
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </a>
                  </ul>
                ) : null}
                {/* <a className="close" href="#">
                      &times;
                    </a> */}
                {getItem ? (
                  <ul>
                    <li className="nav-item">
                      <Link className="connect-wallet" to="/profile">
                        {getItem.username}
                        <div>
                          <img
                            src="../../img/icon/user-icon.png"
                            alt=""
                            className="wallet-icon"
                          />
                        </div>
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <>
                    {/* <li className="sign-in-bg">
                      <Link className="sign-in" to="/signin">
                        Sign In
                      </Link>
                    </li> */}
                    <li className="sign-up-bg">
                      <Link className="sign-up" to="/signin">
                        Sign In
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManinHeader;
