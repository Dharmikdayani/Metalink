import React, { useState } from "react";
import Team from "./Team";
import { RolesDetails } from "./RolesDetails";

const Roles = () => {
  const [roles] = useState(RolesDetails);
  return (
    <>
      <section className="roles">
        <div className="container">
          <h3 className="common-heading text-center">Roles</h3>
          <table style={{ textAlign: "start" }}>
            <thead>
              <tr>
                <th className="borderradius-left">Team Members</th>
                <th className=".borderradius-right">Supremacy</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((curElem) => {
                const { id } = curElem;
                return <Team key={id} {...curElem} />;
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Roles;
