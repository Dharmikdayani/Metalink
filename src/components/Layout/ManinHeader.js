import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../css/header.css";

const ManinHeader = ({ socket }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getItem = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <section className="header index-header">
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

                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${(navData) =>
                      navData.isActive ? "active" : null}`}
                    to="/team"
                  >
                    Team
                  </NavLink>
                </li>

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
