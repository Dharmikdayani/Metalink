import React from 'react';

const Teammembers = ({teammembers,Layer1,Layer2,Layer3,Layer4,Layer5}) => {
    return (
    <>
        
        <tbody >
            <tr>
                <td className="team-members">{teammembers}</td>
                <td>{Layer1}</td>
                <td>{Layer2}</td>
                <td>{Layer3}</td>
                <td>{Layer4}</td>
                 <td>{Layer5}</td>
            </tr>
        </tbody>    
    </>
    );
}

export default Teammembers;
