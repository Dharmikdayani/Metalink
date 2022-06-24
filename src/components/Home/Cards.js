import React ,{useState} from 'react';
import {CardDetails} from "./CardDetails";
import Mycard from './Mycard';

const Cards = () => {
    const [card ] = useState(CardDetails);
    return (
        <section className="metalink-network">
          <div className="container">
                <div>
                    <h1 className="main-heading">Why should I mine Metalink ?</h1>
                </div>
                <div className='row'>
                    {
                    card.map((curElem)=>{
                        const {id} = curElem 
                        return <Mycard key={id} {...curElem}/>

                    })
                    }
                </div>
            </div>
        </section>

       
    );
}

export default Cards;
