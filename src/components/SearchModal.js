import React from 'react';
import "./SearchModal.css";

export default function SearchModal(props) {
    const { data } = props;
    // console.log(data);
    if (data.length === 0)
        return (
            <div className='modal_head'>
                <h1>NO DATA FOUND</h1>
            </div>
        )
    else
        return (
            <>
                <div>
                    {data.map((item, index) => (
                        <div className="modal_head" key={index}>
                            <h1>{item.title}</h1>
                            <span>{item.tag}</span>
                            <p>{item.description}</p>
                            <button onClick={props.close}>close</button>
                        </div>
                    ))}
                </div>
            </>
        )
}
