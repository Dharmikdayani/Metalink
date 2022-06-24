import React from "react";

export default function Team({ TeamMembers, Supremacy }) {
  return (
    <>
      <tr>
        <td>{TeamMembers}</td>
        <td>{Supremacy}</td>
      </tr>
    </>
  );
}
