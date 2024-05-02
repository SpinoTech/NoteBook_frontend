import React from 'react'
import "./Loder.css";
// import loderGif from "../documents/loading.gif";
export default function Loder() {
    return (
        <div className='center'>
            {/* <!-- GRADIENT CIRCLE PLANES --> */}
            <div class="spinner-box">
                <div class="leo-border-1">
                    <div class="leo-core-1"></div>
                </div>
                <h1>Loading...</h1>
                <p>Please Wait ! Server Is Lazy</p>
                <div class="leo-border-2">
                    <div class="leo-core-2"></div>
                </div>
            </div>
        </div>
    )
}
