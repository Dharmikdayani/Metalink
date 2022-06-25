import React from "react";

const MyAccordion = ({ title, ans, heading, key1, target }) => {

  // document.querySelector(".acc__card").classList.add("acc__card__active");
  const accordion =()=>{
    document.querySelector(".acc__card").classList.add("acc__card__active");
  
  }
  return (
    <div>
      <div className="acc__card" onSubmit={accordion}>
        <h2 className="accordion-header" id={heading}>
          <div
            className="acc__title"
            data-bs-toggle="collapse"
            data-bs-target={target}
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            {title}
          </div>
        </h2>
        <div
          id={key1}
          className="accordion-collapse collapse "
          aria-labelledby={heading}
          data-bs-parent="#accordionFlushExample"
        >
          <div className="acc_ans">
            <br />
            {[...ans].map((data, i) => {
              return <p key={i}>{data} </p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
