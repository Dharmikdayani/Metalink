import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import instance from "../baseUrl/baseUrl";

const Teammember = () => {
  const [team, setTeam] = useState([]);
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

  const mineHistory = async () => {
    try {
      const result = await instance.get("/coreTeam");
      console.log(result);

      if (result.data.data) {
        // Toast.fire({
        //   icon: "success",
        //   title: result.data.message,
        // });
        let Teammember = result.data.data;
        setTeam(Teammember.slice(0, 3));
      } else {
        Toast.fire({
          icon: "error",
          title: result.data.message,
        });
      }
    } catch (error) {
      console.log("err" + error);
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
      <section className="our-team w-100 d-md-inline-block">
        <div className="container">
          <div className="team-management">
            <h3 className="common-heading text-center mb-0">Our Team</h3>
            <div className="row team-waperd justify-content-md-center">
              {team.map((data, index) => {
                return (
                  <div className="col-xl-4 col-md-6 team-padding" key={index}>
                    <div className="team-box text-center">
                      <img
                        className="teamImg"
                        src={`http://192.168.29.105:3000/uploads/${data.avatar}`}
                      />
                      <h4 className="team-title">{data.name}</h4>
                      <h6 className="team-subtitle">{data.role}</h6>
                      <p className="team-description">
                        {data.description}
                      </p>
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
      </section>
    </>
  );
};

export default Teammember;
