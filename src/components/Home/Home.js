import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Footer from "../Layout/Footer";
import Cards from "./Cards";
import ManinHeader from "../Layout/ManinHeader";
import "../../css/home.css";
import { Link } from "react-router-dom";
import useEncryption from "../EncryptData/EncryptData";
import instance from "../baseUrl/baseUrl";
import Swal from "sweetalert2";
// eslint-disable-next-line
{
  AOS.init();
}
function Home() {
  document.title = "Home";
  const { decryptData } = useEncryption();
  const [data, setdata] = useState("");
  const effectCalled = useRef(false);
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
  useEffect(() => {
    if (!effectCalled.current) {
      donwloadAPk();
      // socket.disconnect();
      effectCalled.current = true;
    }
    //eslint-disable-next-line
  }, []);
  /*================SignUp API===============*/
  const donwloadAPk = async () => {
    try {
      const result = await instance.get("/getApplication");
      const results = decryptData(result.data.data);
      if (results.status) {
        // Toast.fire({
        //   icon: "success",
        //   title: results.message,
        // });
        setdata(results?.data);
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
  // console.log("data", data);

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
                <div className="app-store d-flex justify-content-lg-start justify-content-center ">
                  <a
                    href={`https://metalink-technomads.herokuapp.com/${data}` }
                    className="card1 "
                  >
                    <img
                      id="cast"
                      src="../../img/index-page/light-andriod.svg"
                      alt="ios"
                    />
                  </a>
                  <a
                    href={`https://metalink-technomads.herokuapp.com/${data}`}
                    className="card2"
                  >
                    <img
                      id="cast"
                      src="../../img/index-page/light-ios.svg"
                      alt="robert shaw"
                    />
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
                className="get-started-bg "
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

              <div className="started-tree ">
                <div className="row mx-0 justify-content-between first-layer">
                  <div className="col-xl-3 col-2 track-box ">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid "
                    />

                    <p className="track-content">Start Mining</p>
                  </div>
                  <div className="col-xl-6 col-8"></div>
                  <div className="col-xl-3 col-2 track-box">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="track-content">Increase Supremacy</p>
                  </div>
                </div>

                <div className="row mx-0 justify-content-between secound-layer">
                  <div className="col-xl-3 col-2 track-box  mining-higher-rate">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="track-content">Earn Metalink</p>
                  </div>
                  <div className="col-xl-6 col-8"></div>
                  <div className="col-xl-3 col-2  track-box  mining-higher-rate">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="track-content">Mine with higher rate</p>
                  </div>
                </div>

                <div className="row mx-0  justify-content-between thierd-layer">
                  <div className="col-xl-3 col-2  track-box ">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="track-content">Team Building</p>
                  </div>
                  <div className="col-xl-6 col-8"></div>
                  <div className="col-xl-3 col-2  track-box ">
                    <img
                      src="../../img/index-page/track-one.png"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="track-content">Withdraw</p>
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
                  Download the mobile app to start mining today for free.
                </h1>
                <p className="content">
                  Join the great mining community of metalink and earn free
                  metalink with single click.
                </p>
                <div className="light-play-store  d-flex justify-content-lg-start justify-content-center">
                  {/* <div className="light-google-play"> */}
                  <Link
                    to={`http://192.168.29.107:3008/${data}`}
                    className="card3"
                  >
                    <img
                      id="cast"
                      src="../../img/index-page/andriod-dark.svg"
                      alt="ios"
                    />
                  </Link>
                  <Link
                    to={`http://192.168.29.107:3008/${data}`}
                    className="card4"
                  >
                    <img
                      id="cast"
                      src="../../img/index-page/ios-dark.svg"
                      alt="Lorraine Gary"
                    />
                  </Link>
                  {/* </div> */}
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
