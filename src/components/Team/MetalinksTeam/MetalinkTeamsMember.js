import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import instance from "../../baseUrl/baseUrl";
import useEncryption from "../../EncryptData/EncryptData";
import { Teamdetails } from "./Teamdetails";

const MetalinkTeamsMember = () => {
  const [team, setTeam] = useState([]);
  const effectCalled = useRef(false);
  const { decryptData } = useEncryption();
  const [teamlist, setteamlist] = useState(Teamdetails);
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

  const mineHistory = async () => {
    try {
      const result = await instance.get("/coreTeam");
      const results = decryptData(result.data.data);
      //console.log("coreTeam", results);

      if (results.status) {
        let Teammember = results.data;
        setTeam(Teammember.slice(3));
      } else {
        Toast.fire({
          icon: "error",
          title: results.message,
        });
      }
    } catch (error) {
      //console.log("err" + error);
    }
  };
  useEffect(() => {
    if (!effectCalled.current) {
      mineHistory();
      effectCalled.current = true;
    }
  }, []);
  return (
    <>
      {/* this code for testing Team API */}
      {/* <section className="our-team w-100 d-md-inline-block">
        <div className="container">
          <div className="team">
            <div className="row team-overview justify-content-md-center">
              {team.map((data, index) => {
                return (
                  <div
                    className="col-xl-3 col-md-6 teamlist-padding"
                    key={index}
                  >
                    <div className="team-box text-center">
                      <img
                        className="teamMamberImg"                     
                        src={`https://metalink-technomads.herokuapp.com/uploads/${data.avatar}`}
                      />
                      <h4 className="team-title">{data.name}</h4>
                      <h6 className="team-subtitle">{data.role}</h6>
                      <ul className="list-unstyled d-flex justify-content-center mb-0 p-0 align-items-center">
                        <li>
                          <a href={""} target="_blank">
                            <img
                              src="../../img/our-team/linkedin-small.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href={""} target="_blank">
                            <img
                              src="../../img/our-team/twitter-small.png"
                              className="me-0 img-fluid"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}
      <section className="our-team w-100 d-md-inline-block">
        <div className="container">
          <div className="team">
            <div className="row team-overview justify-content-md-center">
              {teamlist.map((data, index) => {
                return (
                  <div
                    className="col-xl-3 col-md-6 teamlist-padding"
                    key={index}
                  >
                    <div className="team-box text-center">
                      <img
                        className="teamMamberImg"
                        src={data.src}
                      />
                      <h4 className="team-title">{data.teamtitle}</h4>
                      <h6 className="team-subtitle">{data.teamsubtitle}</h6>
                      <ul className="list-unstyled d-flex justify-content-center mb-0 p-0 align-items-center">
                        <li>
                          <a href={data.linkedin} target="_blank">
                            <img
                              src="../../img/our-team/linkedin-small.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href={data.twitter} target="_blank">
                            <img
                              src="../../img/our-team/twitter-small.png"
                              className="me-0 img-fluid"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MetalinkTeamsMember;
