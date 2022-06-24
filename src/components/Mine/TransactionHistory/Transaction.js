import React from 'react';

const Transaction = ({transectiondetails,transectionamount, transectiondate}) => {
    return (
        <>
    
            <div className="row justify-content-center">
                    <div className="col-xl-6 col-8">
                        <div className={`${transectiondetails === "Deposite" ? "credit-detail-bg":"debit-detail-bg"}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="transection-details mb-0">{transectiondetails}</h6>
                                </div>
                                <div className="text-center">
                                    <div className="d-flex align-items-end">
                                        <h6 className="transection-amount mb-0">{transectionamount} </h6>
                                        <span><img src="../../img/icon/transection-icon.png" alt=""/></span>
                                        <br/>
                                    </div>
                                    <p className="transection-date mb-0">{transectiondate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default Transaction;
