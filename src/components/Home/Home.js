import React from "react";
import AOS from "aos";
import Footer from "../Layout/Footer";
import Cards from "./Cards";
import ManinHeader from "../Layout/ManinHeader";
import "../../css/home.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line
{
  AOS.init();
}
function Home() {
  document.title = "Home";

  localStorage.getItem("user");
  return (
    <>
      <div className="index-bg">
        <ManinHeader />
        {/*============ Hero Section Start =========== */}
        <section className="hero">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="heading">
                  Most valued Digital Currency You Can Mine On Your
                  Phone/Computer And Withdraw Instantly
                </h1>
                <p className="content">
                  Download the app & earn metalink cryptocurrency for free.
                  Build team under you by inviting friends & family and earn
                  with higher rate.
                </p>
                <div className="app-store d-flex justify-content-lg-start justify-content-center">
                  <a href="/#">
                    <img
                      src="../../img/index-page/google-play.png"
                      alt=""
                      className="play-store"
                    />
                  </a>
                  <a href="/#">
                    <img src="../../img/index-page/app-store.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 text-lg-end text-center digital-currency d-md-block d-sm-none">
                <img
                  src="../../img/index-page/Token_mining1 1.png"
                  alt=""
                  className="img-fluid Tokrn-mining"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ============ Hero Section End =========== --> */}

        {/* <!--============ Get Started Start  ===========--> */}
        <section className="get-started">
          <div className="container">
            <div>
              <h1 className="main-heading">How Do I Get Started?</h1>
            </div>

            <div className="position-relative">
              <img
                src="../../img/index-page/MicrosoftTeams-image.png"
                alt=""
                className="get-started-bg"
                data-aos="zoom-in"
                data-aos-duration="2000"
              />

              <img
                src="../../img/index-page/vector-inner.png"
                alt=""
                className="vector-inner img-fluid"
              />

              <div>
                <Link to="/" className="join">
                  <img src="../../img/index-page/join.png" alt="" />
                  <h3>Join M</h3>
                </Link>
              </div>

              <div className="started-tree">
                <div className="row mx-0 justify-content-between first-layer">
                  <div className="col-xl-3 col-2  justify-content-center track-box d-flex align-items-baseline">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <a href="/#" className="track-content">
                      Start Mining
                    </a>
                  </div>
                  <div className="col-xl-6 col-8"></div>
                  <div className="col-xl-3 col-2 justify-content-center track-box d-flex align-items-baseline">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <a href="/#" className="track-content">
                      Increase Supremacy
                    </a>
                  </div>
                </div>

                <div className="row mx-0 justify-content-between secound-layer">
                  <div className="col-xl-3 col-2 justify-content-center track-box d-flex align-items-baseline mining-higher-rate">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <a href="/#" className="track-content">
                      Earn Metalink
                    </a>
                  </div>
                  <div className="col-xl-6 col-8"></div>
                  <div className="col-xl-3 col-2 justify-content-center track-box d-flex align-items-baseline mining-higher-rate">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <a href="/#" className="track-content">
                      Mine with higher rate
                    </a>
                  </div>
                </div>

                <div className="row mx-0  justify-content-between thierd-layer">
                  <div className="col-xl-3 col-2 justify-content-center track-box d-flex align-items-baseline">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <a href="/#" className="track-content">
                      Team Building
                    </a>
                  </div>
                  <div className="col-xl-6 col-8"></div>
                  <div className="col-xl-3 col-2 justify-content-center track-box d-flex align-items-baseline">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <a href="/#" className="track-content">
                      Withdraw
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!--============ Get Started End  ===========--> */}

        {/* <!--============ Metalink Network Start  ===========--> */}
        <Cards />

        {/* <!--------------- Download Section Start  --------------> */}

        <section className="download-app">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="sub-heading">
                  Download the mobile app to start mining today?
                </h1>
                <p className="content">
                  Join the great mining community of metalink and earn free
                  metalink with single click.
                </p>
                <div className="light-play-store">
                  <a href="/#">
                    <img
                      src="../../img/index-page/light-google-play.png"
                      alt=""
                      className="light-google-play"
                    />
                  </a>

                  <a href="/#">
                    <img
                      src="../../img/index-page/light-app-store.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 text-lg-end text-md-center">
                <img
                  src="../../img/index-page/mobile_screen.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <!--------------- Download Section End --------------> */}

        <Footer />
      </div>
    </>
  );
}

export default Home;
