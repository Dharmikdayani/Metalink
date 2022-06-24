import React from "react";
import Footer from "../Layout/Footer";
import TeamMember from "./TeamMember";
import MetalinkTeamsMember from "./MetalinksTeam/MetalinkTeamsMember";
import "../../css/team.css";
import ManinHeader from "../Layout/ManinHeader";

const Team = () => {
  document.title = "Team";
  // <link rel="icon" type="" href="../../img/logo/favicon.png"></link>

  return (
    <>
      <div className="team-bg">
        {/* <!-- ------------------- MINING START ----------------- --> */}

        <ManinHeader />

        {/* <!-- ------------------- Our_Team ----------------- -->     */}
        <TeamMember />
        <MetalinkTeamsMember />

        {/* <!--------------- Footer Start --------------> */}
        <Footer />

        {/* <!-- ------------------- CURRENT MINING RATE END ----------------- --> */}
      </div>
    </>
  );
};

export default Team;
