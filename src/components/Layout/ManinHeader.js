import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../css/header.css";
import { ImMenu } from "react-icons/im";
const ManinHeader = ({ socket }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getItem = JSON.parse(localStorage.getItem("user"));
  let location = useLocation();
  console.log("location", location.pathname);
  return (
    <>
      <section className="header index-header fix">
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
                  <li className="nav-item  ">
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

                {location.pathname === "/mine" ? (
                  <ul>
                    <a className="Notification" href="#">
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
                    </a>
                  </ul>
                ) : null}

                {getItem ? (
                  <ul>
                    <li className="nav-item">
                      <Link className="connect-wallet" to="/profile">
                        {getItem.username}
                        <img
                          src="../../img/icon/user-icon.png"
                          alt=""
                          className="wallet-icon"
                        />
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
