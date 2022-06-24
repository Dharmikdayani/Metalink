// import e from "cors";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import instance from "../../baseUrl/baseUrl";

const Mining = () => {
  const [Layer, setLayer] = useState([{}]);
  const effectCalled = useRef(false);
  const [day, setDay] = useState("day");

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
      const result = await instance.get(`/mineHistory?time=${day}`);

      if (result.data.status) {
        setLayer([result?.data?.data]);
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
  }, [day]);

  return (
    <>
      <section className="current-mining-rate">
        <div className="container">
          <h3 className="common-heading text-center">Current Mining Rate</h3>
          <table>
            <thead>
              <tr>
                <th className="borderradius-left">Layer</th>

                <th className="borderradius-right d-flex align-items-center justify-content-center">
                  <span>Total</span>
                  <img
                    src="../../img/icon/total-minning.png"
                    alt=""
                    className="total-mining-image"
                  />
                  <select
                    value={day}
                    name="days"
                    onChange={(e) => {
                      setDay(e.target.value);
                      effectCalled.current = false;
                    }}
                  >
                    <option value="day">1D</option>
                    <option value="week">7D</option>
                    <option value="month">1M</option>
                    <option value="year">1Y</option>
                  </select>
                </th>
              </tr>
            </thead>
            {Object.keys(Layer[0]).map((data) => {
              return (
                <tbody key={data}>
                  <tr>
                    <td className="team-members">
                      {data
                        .replace("level", "Layer ")
                        .replace("total", "Total")}
                    </td>
                    <td>{Layer[0][data]?.toFixed(3)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
};

export default Mining;
