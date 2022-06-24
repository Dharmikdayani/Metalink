import React from 'react';

const Layercard = ({ Layer,content}) => {
    return (
        <>
            <div className="col-md-4 next-layers">
                <div className="layer-box">
                    <h3 className="sub-heading mb-0">{Layer}</h3>
                    <p className="content mb-0">{content}</p>
                </div>
            </div>
        </>
    );
}

export default Layercard;
