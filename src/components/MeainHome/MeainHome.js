import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/coming-soon.css";


function MeainHome() {
  const [Timedays, Setday] = useState("00");
  const [TimeHours, SetHours] = useState("00");
  const [Timeminutes, Setminutes] = useState("00");
  const [Timeseconds, Setseconds] = useState("00");

  let interval = useRef();

  const StartTimer = () => {
    const countdown = new Date("08 15, 2022 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdown - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        Setday(days);
        SetHours(hours);
        Setminutes(minutes);
        Setseconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    StartTimer();
    return () => {
      //eslint-disable-next-line
      clearInterval(interval.current);
    };
  });
  return (
    <div className="MeainHome-bg ">
      <>
        {/* ============ Header Start =========== */}
        <section className="header index-header">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center header-md">
              <div>
                <Link to="/">
                  <img
                    src="../../img/logo/logo.png"
                    alt=""
                    className="header-logo img-fluid"
                  />
                </Link>
              </div>
              <div className="icon">
                <div className="footer-social d-sm-flex d-none">
                  <div className="social-bg">
                    <a
                      href="https://www.facebook.com/Metalink-101550999177220"
                      target="_blank"
                      className="social-icon"
                      rel="noreferrer" 
                    >
                      <img
                        src="../../img/icon/facebook.svg"
                        alt=""
                        className="simple-social-icon"
                      />
                      <img
                        src="../../img/icon/facebook-hover.svg"
                        alt=""
                        className="fill-social-icon"
                      />
                    </a>
                  </div>
                  <div className="social-bg">
                    <a
                      href="https://twitter.com/MetalinkNetwork"
                      target="_blank"
                      className="social-icon"
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
                      href="https://www.instagram.com/metalinknetwork/"
                      target="_blank"
                      className="social-icon"
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
                  <div className="social-bg">
                    <a href="/#" className="social-icon">
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
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============ Header End =========== */}
        {/* ============ Hero Section Start =========== */}
        <section className="hero coming-soon">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="heading">
                  Digital Currency You Can Mine On Your Mobile/Computer And
                  Withdraw Instantly
                </h1>
                <p className="content">
                  Download the app &amp; earn metalink cryptocurrency for free.
                  Build team under you by inviting friends &amp; family and earn
                  with higher rate.{" "}
                </p>
                <div className="footer-social d-sm-none d-flex justify-content-center mt-5">
                  <div className="social-bg">
                    <a
                      href="https://www.facebook.com/Metalink-101550999177220"
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer" 
                    >
                      <img
                        src="../../img/icon/facebook.svg"
                        alt=""
                        className="simple-social-icon"
                      />
                      <img
                        src="../../img/icon/facebook-hover.svg"
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
                  <div className="social-bg">
                    <a
                      href="/#"
                      className="social-icon"
                      target="_blank"
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
                </div>
              </div>
              <div className="col-lg-6">
                <div className="animation-container">
                  <div className="y-axis-container">
                    <div className="container">
                      <div className="flash" />
                      <div className="coin side">
                        <div className="shine" />
                      </div>
                      <div className="side-coin" />
                      <div className="coin">
                        <div className="dai">
                          <img src="../../img/logo/coming-soon-m.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shadow" />
                  <div
                    className="money-text-loading"
                    data-loading-text="LoadingMoney..."
                  />
                </div>
                <h1 id="headline" className="headline">
                  Coming <span className="soon-bg"> Soon </span>
                </h1>
                <div id="countdown" className="countdown">
                  <ul>
                    <li>
                      <span>{Timedays}</span>
                      days
                    </li>
                    <li>
                      <span>{TimeHours}</span>
                      Hours
                    </li>
                    <li>
                      <span>{Timeminutes}</span>
                      Minutes
                    </li>
                    <li>
                      <span>{Timeseconds}</span>
                      Seconds
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="privacy-policy container  pt-5">
          <a href="privacy-policy.html">Privacy Policy</a>
        </div>

        {/* ============ Hero Section End =========== */}
      </>
    </div>
  );
}

export default MeainHome;
