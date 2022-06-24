import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/footer.css";


const Footer = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  const getItem = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <section className="footer">
        <div className="container ">
          <div className="footer-inside footer-Icon">
            <div className="row align-items-baseline">
              <div className=" col-md-6">
                <Link to="/">
                 
                  <img
                    src="../../img/logo/footer-logo.png"
                    alt=""
                    className="img-fluid"
                  />
                </Link>
                <div className="footer-social d-flex ">
                  <div className="social-bg">
                    <a
                      href="https://www.facebook.com/Metalink-101550999177220"
                      className="social-icon"
                      target="_blank"
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
                      href="https://dsc.gg/metalink"
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
              <div className="col-md-6">
                <div className="row d-flex justify-content-end hiden">
                  <div className="col-xl-3 col-md-5 col-6">
                    <p className="company mb-0">COMPANY</p>
                    <ul className="list-unstyled">
                      <li className="nav-item">
                        <Link
                          to={getItem ? "/mine" : "/signin"}
                          className="nav-link"
                          
                        >
                          Mine
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/platform"
                          className="nav-link"
                          
                        >
                          Platform
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/team"
                          className="nav-link"
                         
                        >
                          Team
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" className="nav-link">
                          Support
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xl-3 col-md-5 col-6">
                    <p className="company mb-0">SUPPORT</p>
                    <ul className="list-unstyled">
                      <li className="nav-item">
                        <Link to="/contactus" className="nav-link">
                          Contact Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" className="nav-link">
                          About Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" className="nav-link">
                          Terms of Use
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p className="border"></p>
            <p className="content">2022 Ⓒ METALINK LTD, All Rights Reserved</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
