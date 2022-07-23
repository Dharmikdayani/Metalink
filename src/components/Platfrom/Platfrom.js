import React from "react";
import Footer from "../Layout/Footer";
import Mainnet from "./Mainnet/Mainnet";
import Accordions from "./Accordion/Accordion";
import "../../css/platform.css";
import ManinHeader from "../Layout/ManinHeader";
// import "animate.css/animate.min.css";

const Platfrom = () => {
  document.title = "Platfrom";

  return (
    <>
      <div className="platfrom-bg">
        {/* <!-- ------------------- MINING START ----------------- --> */}

        <ManinHeader className="nav-link active" />

        {/* <!-- Platform_About --> */}
        <section
          className="platform-about w-100 d-md-inline-block"
          id="#decentralized"
        >
          <div className="container">
            <div className="platform-aboutinfo">
              <div className="row">
                <div className="col-md-6 order-md-0 order-1">
                  <div className="platform-info ">
                    <h3 className="platform-title common-heading">
                      Decentralized Chatting
                    </h3>
                    <p className="platform-subtitle">
                      Since this protocol can be implemented in any wallet or
                      service using your crypto address, you keep the same chats
                      in all the applications using your crypto address. This is
                      the opposite of today’s countless applications that all
                      have separate Direct Message features where users are
                      locked-in.You can now have a unified inbox, portable
                      anywhere your crypto address is, bringing clarity to every
                      message going through your crypto address.
                    </p>
                    <p className="platform-subtitle">
                      It goes beyond centralized counterparts end-to-end
                      encryption because there is no central database to start
                      with. It also significantly reduces text phishing as the
                      business you interact with will verifiably have the same
                      payment address as their domain name.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center  align-items-md-baseline">
                  <img
                    src="../../img/platform/decentralized.png"
                    className="mb-md-0 mb-5"
                    alt="decentralized-img"
                  />
                </div>
              </div>
            </div>
            <div className="platform-aboutinfo pt-0 ">
              <div className="row">
                <div className="col-md-6 ">
                  <img
                    src="../../img/platform/decentralized-surfing.png"
                    className="mb-md-0 mb-5"
                    alt="decentralized-surfing-img"
                  />
                </div>
                <div className="col-md-6">
                  <div className="platform-info">
                    <h3 className="platform-title common-heading">
                      Decentralized Surfing
                    </h3>
                    <p className="platform-subtitle">
                      The Internet and the World Wide Web remain the biggest
                      decentralized communication system humanity has ever seen.
                      This was very much a part of the design: the inventors of
                      the Web wished for all people to be able to create and
                      access information.But the benefits of a decentralized
                      Internet are eroding. When we concentrate our online
                      activity on just a few social networks and messaging apps
                      – as billions of us do – it narrows our experience of the
                      Web to one where we are pointed only at content that
                      appeals to our likes in search results and social media
                      streams. Here, we are consumers rather than creators. The
                      Internet remains decentralized, but the things we do on it
                      every day are controlled by just a handful of global
                      technology giants. These companies are starting to look
                      more and more like monopolies of the past. Given the
                      importance of the Internet in our lives, this is not
                      healthy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="platform-box m-auto d-table ">
              <img src="../../img/platform/world.png" className="world" alt="world-img" />
            </div>
          </div>
        </section>

        {/* <!-- Mainnet_Table --> */}
        <Mainnet />
        <Accordions />

        {/* <!--------------- Footer Start --------------> */}
        <Footer />
        {/* <!-- ------------------- CURRENT MINING RATE END ----------------- --> */}
      </div>
    </>
  );
};

export default Platfrom;
