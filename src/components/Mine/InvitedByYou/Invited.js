import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import Swal from "sweetalert2";
import instance from "../../baseUrl/baseUrl";
import useEncryption from "../../EncryptData/EncryptData";

const Invited = ({ setIsOpen }) => {
  // const [card] = useState(FilterDetails);
  const [selectedOption, setSelectedOption] = useState("all");
  const [Layer, setLayer] = useState("all");
  const [member, setMemeber] = useState([]);
  const effectCalled = useRef(false);
  const [invite, setInvite] = useState([]);
  const [Loader, setLoader] = useState(false);
  const { decryptData } = useEncryption();
  const getItem = JSON.parse(localStorage.getItem("user"));

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
      filterData();
      effectCalled.current = true;
    }
  }, [selectedOption, Layer]);

  const filterData = async () => {
    setMemeber([]);
    try {
      //true
      setLoader(true);
      const result = await instance.get(
        `/earningTeam?status=${selectedOption}&level=${Layer}`
      );
      const results = decryptData(result.data.data);
      // console.log("filterData", results);

      if (results.status) {
        while (results.data.earningTeam.length != 0) {
          const data = results.data.earningTeam.splice(0, 6);
          setMemeber((old) => [...old, data]);
        }
        setInvite([results.data]);
        setLoader(false);
      } else {
        setLoader(false);
        // Toast.fire({
        //   icon: "error",
        //   title: results.message,
        // });
      }
    } catch (error) {
      console.log("err" + error);
      setLoader(false);
    }
  };

  return (
    <>
      <section className="earning-time">
        <div className="container">
          <h3 className="common-heading text-center">Earning Team</h3>
          <h4 className="sub-title mb-0">
            Total Earning Team : {invite[0]?.memberCount}
          </h4>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="inviter-details d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="inviter-name ">
                    {invite[0]?.parent?.parentName}
                  </h3>
                  <h4 className="mb-0 invited-you">Invited you</h4>
                </div>
                <div className="d-flex  align-items-center">
                  <p className="mb-0 active-inactive-title">
                    {invite[0]?.parent?.status ? "active" : "inactive"}
                  </p>
                  <img
                    src={
                      invite[0]?.parent?.status
                        ? "../../img/icon/active.png"
                        : "../../img/icon/inactive.png"
                    }
                    alt="inactive"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <h5 className="invited-title">Invited By You</h5>
          <div className="d-flex justify-content-center mt-5 ">
            <div className="d-flex align-items-baseline justify-content-around" >
              <h1 className="Status">Status:</h1>
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  effectCalled.current = false;
                }}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">In-Active</option>
              </select>
            </div>
            <div className="px-5"></div>
            <div className=" d-flex align-items-baseline">
              <h1 className="Status">Layers:</h1>
              <select
                value={Layer}
                onChange={(e) => {
                  setLayer(e.target.value);
                  effectCalled.current = false;
                }}
                className="select"
              >
                <option value="all">All</option>
                <option value="1">Layer 1</option>
                <option value="2">Layer 2</option>
                <option value="3">Layer 3</option>
                <option value="4">Layer 4</option>
                <option value="5">Layer 5</option>
              </select>
            </div>
          </div>
          {Loader ? (
            <div className="snippet " data-title=".dot-spin">
              <div className="stage">
                <div className="dot-spin "></div>
              </div>
            </div>
          ) : member.length ? (
            <Carousel>
              {member.map((data, index) => {
                return (
                  <div
                    className="row justify-content-between grid-container"
                    key={index}
                  >
                    {data.map((data, index) => {
                      return (
                        <div
                          className="col-md-5 filter-results"
                          data-cat={data.datacat}
                          key={index}
                        >
                          <div className="filter-tab-bg d-flex justify-content-between my-40">
                            <div>
                              <h3 className="invited-name mb-0">
                                {data.username}
                              </h3>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <p className="mb-0 active-inactive-title">
                                {data.active ? "active" : "inactive"}
                              </p>
                              <img
                                src={
                                  data.active
                                    ? "../../img/icon/active.png"
                                    : "../../img/icon/inactive.png"
                                }
                                alt={data.active ? "active" : "inactive"}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <div>
              <h2 className="selectedOption text-center mt-5">
                <div className="box">
                  <img
                    src="../../img/icon/sadFace.png"
                    width="70"
                    className="center"
                  />
                </div>
                <br />
                <br />
                {selectedOption === "all" && Layer === "all"
                  ? `No  Member Found `
                  : selectedOption === "all" &&
                    (Layer === "1" ||
                      Layer === "2" ||
                      Layer === "3" ||
                      Layer === "4" ||
                      Layer === "5")
                  ? `No  Member Found on Layer ${Layer}`
                  : (selectedOption === "active" ||
                      selectedOption === "inactive") &&
                    Layer === "all"
                  ? `No ${selectedOption} Member Found`
                  : (selectedOption === "active" ||
                      selectedOption === "inactive") &&
                    (Layer === "1" ||
                      Layer === "2" ||
                      Layer === "3" ||
                      Layer === "4" ||
                      Layer === "5")
                  ? `No ${selectedOption} Member Found on Layer ${Layer}`
                  : null}
              </h2>

              <div className="inputChange ">
                <h3 className="btn invite mb-0" onClick={setIsOpen}>
                  Invite
                </h3>
              </div>
              <div className="d-flex align-items-baseline  justify-content-center">
                <h2 className="invite-code">Code: {getItem.refCode}</h2>

                <img
                  src="../../img/icon/copy.png"
                  onClick={() => {
                    navigator.clipboard.writeText(getItem.refCode);
                    Toast.fire({
                      icon: "success",
                      title: "copied successfully",
                    });
                  }}
                  className="copy-invite-code"
                  alt="copyIcon"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Invited;
