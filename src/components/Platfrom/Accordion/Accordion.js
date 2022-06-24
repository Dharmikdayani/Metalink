import React, { useState } from "react";
import MyAccordion from "./MyAccordion";
import { AccordionDetails } from "./AccordionDetails";

const Accordion = () => {
  const [card] = useState(AccordionDetails);

  return (
    <div>
      <section className="asked-question w-100 d-md-inline-block">
        <div className="container">
          <h3 className="common-heading text-center mb-0">
            Frequently Asked Questions
          </h3>
          <div className="row justify-content-center">
            <div className="col-md-8 col-12">
              <div className="accordion-tabs">
                <div className="acc">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    {card.map((curElem) => {
                      const { id } = curElem;
                      return <MyAccordion key={id} {...curElem} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accordion;
