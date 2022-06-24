import React,{useState} from 'react';
import {HistoryDetails} from './HistoryDetails';
import Transaction from './Transaction';

const History = () => {
    const [history] = useState(HistoryDetails);
    return (
    <>
        <section className="transection">
            <div className="container">
                <h3 className="common-heading text-center">Transaction History</h3>
                {
                    history.map((curElem)=>{
                        const {id}=curElem
                        return <Transaction key={id} {...curElem}/>
                    })
                }
            </div>
        </section>                
    </>
    );
}

export default History;
