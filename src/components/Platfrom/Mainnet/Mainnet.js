import React,{useState} from 'react';
import { MainnetDetails } from './MainnetDetails';
import Teammembers from './TeamMembers';

const Mainnet = () => {
    const [mainnet] = useState(MainnetDetails);
    return (
        <div>
            <section className="mainnet-table current-mining-rate pb-0">
                <div className="container">
                    <h3 className="common-heading text-center">Mainnet</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="borderradius-left">Team Members</th>
                                <th>Layer1</th>
                                <th>Layer2</th>
                                <th>Layer3</th>
                                <th>Layer4</th>
                                <th className="borderradius-right">Layer5</th>
                            </tr>
                        </thead>
                        
                        {
                            mainnet.map((curElem)=>{
                                const {id} = curElem 
                                return <Teammembers key={id} {...curElem}/>

                            })
                        }
                        
                    </table>
                </div>
            </section>           
        </div>
    );
}

export default Mainnet;
