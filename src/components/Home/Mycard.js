import React from "react";
// import { Link } from "react-router-dom";

const Mycard = ({ title, descri, route, img,hover_img }) => {
  return (
    <>
      <div className="col-xl-3 col-sm-6 network-main-box ">
        <div className="network-box">
          <div className="network-bg">
            <div className="network-one-image ">
              <img src={img} alt="" className="blue-image " />
              <img
                src={hover_img}
                alt=""
                className="white-image "
              />
            </div>
          </div>
          <div className="text-center network-details">
            <h1 className="sub-head">{title}</h1>
            <p className="content">{descri}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mycard;
