import React,{useState} from 'react';
import LayerCard from './LayerCard';
import {LayerDetails} from './LayerDetails'

const Layer = () => {
    const [layer] = useState(LayerDetails);
    return (
    <>
        <section className="layers next-layers" style={{textAlign :'left'}}>
            <div className="container">
                <h3 className="common-heading text-center">Layers</h3>
                <div className="row ">
                    {
                        layer.map((curElem)=>{
                            const {id} = curElem 
                            return <LayerCard key={id} {...curElem}/>
    
                        })
                    }
                </div> 
            </div>
        </section>
    </>
    );
}

export default Layer;

     