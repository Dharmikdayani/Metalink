import React, { useEffect } from "react";
import Footer from "../Layout/Footer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Mining from "./CurrentMiningRate/Mining";
import Roles from "./Roles/Roles";
import Layer from "./Layers/Layer";
import History from "./TransactionHistory/History";
import ManinHeader from "../Layout/ManinHeader";
import Invited from "./InvitedByYou/Invited";
import "../../css/mine.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import instance from "../baseUrl/baseUrl";
import { Link } from "react-router-dom";
import Odometer from "react-odometerjs";
import useEncryption from "../EncryptData/EncryptData";

function Mine({ socket, miningStatus, currentBalance }) {
  document.title = "Mine";

  useEffect(() => {
    loadCaptchaEnginge(6, "#d0eaff", "black", "top");
  }, []);
  const getItem = JSON.parse(localStorage.getItem("user"));
  // const [isOpen, setIsOpen] = useState(false);
  const {  decryptData } = useEncryption();


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

  /*=========== react-simple-captcha========== */

  const refresh = () => {
    loadCaptchaEnginge(6, "#d0eaff", "black", "top");
  };

  const doSubmit = async () => {
    let user_captcha = document.getElementById("user_captcha_input").value;

    if (validateCaptcha(user_captcha) === true) {
      loadCaptchaEnginge(6);
      document.getElementById("user_captcha_input").value = "";
      document.querySelector(".layer-two ").classList.add("active");
      document.querySelector("#captcha-modals").style.display = "none";

      Toast.fire({
        icon: "success",
        title: "Your Mining is started",
      });
      try {
        const result = await instance.get("/activeUser");

        const results = decryptData(result.data.data);
        console.log("doSubmit", results);

        if (results.success) {         
          Toast.fire({
            icon: "success",
            title: results.message,
          });
          socket.emit("joinRoom", results.data._id);
       
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
      <div className="toast-fire">
        {Toast.fire({
          icon: "error",
          title: "Captcha Does Not Match",
        })}
      </div>;

      document.getElementById("user_captcha_input").value = "";
    }
  };

  /* =================start button===============*/
  const block = () => {
    const ebModal = document.getElementById("captcha-modals");
    ebModal.style.display = "block";
    // isOpen = true
  };

  /*===========withdraw-modals==================*/
  const withdraw = () => {
    var wModal = document.getElementById("withdraw-modals");
    wModal.style.display = "block";
  };

  /*=====================deposit-modals====================*/
  const deposit = () => {
    var depositModal = document.getElementById("deposit-modals");
    depositModal.style.display = "block";
  };
  // const a= element.innerHTML = 123
  /*=================copy function==============*/

  function copy() {
    var copyText = document.getElementById("copyClipboard");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    Toast.fire({
      icon: "success",
      title: "copied successfully",
    });
  }

  return (
    <div className="mining-bg">
      {/* <!-- ------------------- MINING START ----------------- --> */}
      <ManinHeader />
      <section className="header">
        <div className="container">
          <div className="user-stage text-center ">
            <h3 className="heading">{currentBalance?.userRole}</h3>
            <h6 className="sub-heading">
              Team Members: {currentBalance?.totalChild}
            </h6>
          </div>

          <div className="mining-box">
            <div className="layer-one ">
              <div
                className={`layer-two ${
                  miningStatus ? "layer-two-active " : ""
                } `}
              >
                <span className="loader-ball "></span>
                <div className="layer-three ">
                  <div className="loader-inner "></div>
                </div>
              </div>

              <div className="mining-calculation">
                <h1 className="Earnings">Earnings</h1>
                <div className="d-flex align-items-baseline justify-content-center">
                  <h1 className="mining-amount d-flex">
                    <Odometer
                      format="(.ddd),dd"
                      theme="default"
                      duration={1000}
                      value={currentBalance.currentBalance?.toFixed(3)}
                    />
                  </h1>
                  <img
                    src="../../img/icon/Metalink2.png"
                    alt=""
                    className="metalink-lg metaimg"
                  />
                </div>
                <div className="d-flex align-items-baseline justify-content-center">
                  <h3 className="mining-per-hour">
                    Meta Rate: {currentBalance.metaRate}
                  </h3>
                  <img
                    src="../../img/logo/header-m.png"
                    // alt=""
                    // className="metalink-sm metaRate"
                    className="metalink-sm metaRate"
                  />
                  <span className="hours">/H</span>
                </div>
                {miningStatus ? (
                  <h3 className="mining-start-btn-active " id="captcha-modal">
                    Mining..
                  </h3>
                ) : (
                  <h3
                    className="btn mining-start-btn"
                    id="captcha-modal"
                    onClick={block}
                  >
                    Start
                  </h3>
                )}
              </div>
            </div>
          </div>

          {/* <!-- ------- Captcha Modal Start ---------- --> */}

          <div id="captcha-modals">
            <section className="captcha">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="captcha-modal">
                      <h4 className="captcha-content d-flex justify-content-between align-items-center">
                        Prove you're a human
                        <a href="#close" >
                          <img src="../../img/profile/close.png" />
                        </a>
                      </h4>
                      <div className="d-flex input-groups">
                        <input
                          placeholder="Enter Captcha Value"
                          id="user_captcha_input"
                          name="user_captcha_input"
                          type="text"
                          className="form-control"
                        />

                        <button onClick={() => doSubmit()}>Submit</button>
                      </div>

                      <div className="row justify-content-between">
                        <div className="col-lg-10 ">
                          <div className="captcha-bg">
                            <LoadCanvasTemplateNoReload />
                          </div>
                        </div>
                        <div className="col-lg-2 text-end">
                          <div className="refresh-bg">
                            <Link to="#">
                              <img
                                src="../../img/icon/refresh.png"
                                alt=""
                                className="captcha-refresh"
                                onClick={refresh}
                              />
                            </Link>
                          </div>
                          <div className="help-bg">
                            <Link to="#">
                              <img
                                src="../../img/icon/help.png"
                                alt=""
                                className="captcha-help"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* <!-- ------- Captcha Modal End ---------- --> */}

          <div className="mining-with-depo-btn text-center">
            <h3
              className="btn Withdraw mb-0"
              id="withdraw-modal"
              onClick={withdraw}
            >
              Withdraw <img src="../../img/icon/minus.png" alt="" />
            </h3>

            {/* <!-- ------- Withdraw Modal Start ---------- --> */}
            <div id="withdraw-modals">
              <div className="container">
                <div className="row justify-content-center ">
                  <div className="col-xl-7 col-md-9">
                    <div className="withdraw-popup">
                      <h2 className="heading text-center mb-0">Withdraw</h2>
                      <div className="row align-items-center">
                        <div className="col-md-8 text-start">
                          <h4 className="balance-heading mb-0">Your Balance</h4>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex justify-content-end align-items-center">
                            <h5 className="wallet-amount mb-0">23,456.47 </h5>
                            <span>
                              <img
                                src="../../img/logo/withdraw.png"
                                alt=""
                                className="img-fluid"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 text-start">
                          <form action="">
                            <label htmlFor="enter-amount">Enter Amount</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Min/Max Amount: 1000/1,00,00,000"
                            />

                            <label htmlFor="enter-amount">Wallet Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="46328925xx34"
                            />
                          </form>
                        </div>
                      </div>
                      <button className="withdraw-btn">Withdraw</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- ------- Withdraw Modal End ---------- --> */}

            <h3
              className="btn deposit mb-0"
              id="deposit-modal"
              onClick={deposit}
            >
              Deposit <img src="../../img/icon/plus.png" alt="" />
            </h3>

            {/* <!-- ------- Deposit Modal Start ---------- --> */}

            <div id="deposit-modals">
              <div className="container">
                <div className="row justify-content-center ">
                  <div className="col-xl-7 col-md-9">
                    <div className="deposit-popup">
                      <h2 className="heading text-center mb-0">Deposit</h2>
                      <img src="../../img/icon/qr-code.png" alt="qr-code" />
                      <p className="deposit-alert mb-0">
                        Send only
                        <span>
                          <img src="../../img/icon/depoit-add.png" alt="" />
                        </span>
                        to this deposit address.
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="smart-chain-bg">
                            <h3 className="sub-heading mb-0 text-start">
                              Network
                            </h3>
                            <div className="d-flex justify-content-between align-items-center">
                              <h3 className="content mb-0 text-start">
                                Smart Chain
                              </h3>
                              <img
                                src="../../img/icon/smart-chain.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mt-md-0 mt-5">
                          <div className="smart-chain-bg">
                            <h3 className="sub-heading mb-0 text-start">
                              Selected Wallet
                            </h3>
                            <h3 className="content mb-0 text-start">
                              Spot Wallet
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="row justify-content-center ">
                        <div className="col-lg-8">
                          <div className="deposit-statement">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="content m-0">Minimum deposit</p>
                              <p className="d-amount mb-0">
                                12.012
                                <span>
                                  <img
                                    src="../../img/icon/minimum-deposit.png"
                                    alt=""
                                  />
                                </span>
                              </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center ">
                              <p className="content m-0">Expected arrival</p>
                              <p className="d-amount mb-0">
                                10 network confirmation
                              </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="content m-0">Expected unlock</p>
                              <p className="d-amount mb-0">
                                10 network confirmation
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="deposit-btn">Deposit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- ------- Deposit Modal End ---------- --> */}
          </div>
          <div className="d-md-block d-none">
            <div className="row mx-0 justify-content-center">
              <div className="col-md-8 invite-bg">
                <div className="row justify-content-between">
                  <div className="col-xl-8 col-10">
                    <h3 className="invite-title mb-0">
                      Invite your friends and earn more.
                    </h3>
                    <p className="invite-information">
                      Click on “Invite” or Share Invitation “Code” to join your
                      friends for faster earnings.
                    </p>
                  </div>
                  <div className="col-xl-4 col-2 text-end">
                    <h3 className="btn invite mb-0"> Invite </h3>
                    <div className="d-flex align-items-baseline justify-content-xl-end justify-content-center random-code">
                      <h2 className="invite-code mb-0">
                        Code:
                        <input
                          type="text"
                          id="copyClipboard"
                          value={getItem.refCode}
                          readOnly
                        />
                      </h2>
                      <CopyToClipboard onCopy={copy}>
                        <img
                          src="../../img/icon/copy.png"
                          alt=""
                          className="copy-invite-code"
                        />
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ------------------- MINING END ----------------- --> */}

      {/* <!-- ------------------- CURRENT MINING RATE START ----------------- --> */}
      <Mining />
      {/* <!-- ------------------- CURRENT MINING RATE END ----------------- --> */}

      {/* <!-- ------------------- EARNING TIME START ----------------- --> */}
      <Invited />
      {/* <!-- ------------------- EARNING TIME END ----------------- --> */}

      {/* <!-- ------------------- ROLES START ----------------- --> */}
      <Roles />
      {/* <!-- ------------------- ROLES END -------------/---- --> */}

      {/* <!-- ------------------- LAYERS START ----------------- --> */}
      <Layer />
      {/* <!-- ------------------- LAYERS END ----------------- --> */}

      {/* <!-- ------------------- TRANSECTION HISTORY START ----------------- --> */}
      <History />
      {/* <!-- ------------------- TRANSECTION HISTORY START ----------------- --> */}

      {/* <!--------------- Footer Start --------------> */}

      <Footer />
      {/* <!--------------- Footer End --------------> */}

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Mine;
