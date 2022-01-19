import React from 'react';
import {IPoint} from "../../types/types";

const SvgGraph = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={300} height={300}
             id="svgField">
            <polygon fill="#0076ff" fillOpacity="1" points="150,150 210,150 150,270"/>
            <rect fill="#0076ff" fillOpacity="1" x="90" y="150" height="120" width="60"/>
            <g transform="translate(150,150)">
                <path d="M0 0 60 0 A60 55 1 0 0 0 -60" fill="#0076ff"/>
            </g>
            <line stroke="black" x1="0" x2="300" y1="150" y2="150"/>
            <line stroke="black" x1="150" x2="150" y1="0" y2="300"/>

            <text x="275" y="143">R</text>
            <line stroke="black" x1="273" x2="273" y1="148" y2="152"/>

            <text x="215" y="143">R/2</text>
            <line stroke="black" x1="210" x2="210" y1="148" y2="152"/>

            <text x="90" y="143">-R/2</text>
            <line stroke="black" x1="90" x2="90" y1="148" y2="152"/>

            <text x="30" y="143">-R</text>
            <line x1="30" x2="30" y1="148" y2="152"/>

            <text x="150" y="26">R</text>
            <line stroke="black" x1="148" x2="152" y1="30" y2="30"/>

            <text x="150" y="86">R/2</text>
            <line stroke="black" x1="148" x2="152" y1="90" y2="90"/>

            <text x="155" y="215">-R/2</text>
            <line stroke="black" x1="147" x2="153" y1="210" y2="210"/>

            <text x="152" y="270">-R</text>
            <line stroke="black" x1="148" x2="152" y1="270" y2="270"/>


            <circle r="2" stroke="black" cx="150" cy="150"/>
            <polygon fill="black" points="300,150 295,145 295,155" stroke="black"/>
            <polygon fill="black" points="150,0 145,5 155,5" stroke="black"/>


        </svg>
    )
}
export default SvgGraph