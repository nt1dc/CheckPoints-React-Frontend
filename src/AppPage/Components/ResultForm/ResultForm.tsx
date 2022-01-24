import React, {MouseEventHandler, useEffect, useRef, useState} from 'react';
import s from "./ResultStyle.module.css";
// import {entryAPI, getentr} from "../../../API/entryAPI";
import {log} from "util";
import authAPI from "../../../API/authAPI";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {json} from "stream/consumers";

const ResultForm = () => {


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/app/',
    });
    const entryAPI = {

        check: async (x: Number, y: Number, r: Number) => {
            let authToken = "Bearer " + localStorage.getItem("access_token");
            const data = {
                x: x,
                y: y,
                r: r
            }

            console.log(data)
            await axiosInstance.post("check", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken,

                }
            }).then(res => {
                setEntriesArr([...entriesArr, res.data])
            }).catch(error=>{
                if (error.response.status===504) {
                    alert("сервер был написан на фильтрах аунтификации, поэтому жди)");
                }
            });
        },


        clear: async () => {
            let authToken = "Bearer " + localStorage.getItem("access_token");
            axiosInstance.get("clear", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken,
                }
            }).then(value => {
                // @ts-ignore
                setEntriesArr([])
                console.log(value.data)
            })
        },

        getAll: async () => {
            let authToken = "Bearer " + localStorage.getItem("access_token");
            console.log(authToken)
            await axiosInstance.get("myEntries", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken,
                }
            }).then(value => {
                // console.log(value.data)
                // console.log()
                setEntriesArr(value.data)
                console.log(value.data)
                // entries = value.data

            });
        }
    }

    let entries = [{id: 0, x: 0, y: 0, r: 1, inArea: "test", workTime: "test"}];

    function getentr() {
        return entries;
    }

    // let [entriesArr, setEntriesArr] = useState(entryAPI.getAll());


    let [entriesArr, setEntriesArr] = useState(getentr);
    useEffect(() => {
        entryAPI.getAll()
    }, [])


    let result = entriesArr.reverse().map((entr) => {
        return (
            <tr key={entr.id}>
                <td>{entr.x}</td>
                <td>{entr.y}</td>
                <td>{entr.r}</td>
                <td>{entr.inArea ? "da" : "net"}</td>
                <td>{entr.workTime}</td>
            </tr>
        );
    });


    // @ts-ignore
    const [data, setData] = React.useState({
            x: 0,
            y: 0,
            r: 1
        }
    );

    // @ts-ignore
    function getStroke(ent) {
        // @ts-ignore
        // let currentR=this.data.r;
        // @ts-ignore
        // @ts-ignore
        if ((2 * ent.x - ent.y <= data.r && ent.x >= 0 && ent.x <= data.r / 2 && ent.y <= 0 && ent.y <= data.r) || ((ent.x <= 0 && ent.x >= -data.r / 2) && (ent.y <= 0 && ent.y >= -data.r)) || (((ent.x <= data.r / 2 && ent.x >= 0) && (ent.y >= 0 && ent.y <= data.r / 2)) && ((ent.x * ent.x + ent.y * ent.y) <= data.r * data.r))) {
            return "yellow"
        } else return "red"
    }

    function clearStorage() {
        localStorage.clear();
    }


    // @ts-ignore
    function handleChangeOfData(evt) {
        const value = evt.target.value;
        setData({
            ...data,
            [evt.target.name]: value
        });
        if (evt.target.name == "r") {

        }
    }

    function check() {
        // @ts-ignore
        entryAPI.check(data.x, data.y, data.r)
    }

    function clear() {
        entryAPI.clear()
    }

    function isREq1() {
        if (data.r == 1) {
            return true
        } else return false
    }

    // @ts-ignore
    function sub(event) {
        let rowX = event.nativeEvent.offsetX
        let rowY = event.nativeEvent.offsetY
        console.log()
        data.x = Number((data.r * (rowX - 150) / 120).toFixed(2));
        data.y = Number(((150 - rowY) * data.r / 120).toFixed(2))
        // console.log(data)
        entryAPI.check(data.x, data.y, data.r)
        // alert("2")
    }

    // @ts-ignore
    let points4Svg = entriesArr.map((entr) => {
        return (
            <circle key={entr.id} r="5" stroke={getStroke(entr)} cx={(entr.x * 2) / data.r * 60 + 150}
                    cy={150 - (entr.y * 2) / data.r * 60}/>
        );
    });


    // @ts-ignore
    return (

        <div style={s}>
            <div>
                <NavLink to="/login" children={"logout (ну мы очистим токены)))) "} style={s} onClick={clearStorage}/>
            </div>
            <br/>
            <div onClick={sub} style={{display: "inline-block"}}>
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


                    <polygon fill="black" points="300,150 295,145 295,155" stroke="black"/>
                    <polygon fill="black" points="150,0 145,5 155,5" stroke="black"/>
                    {points4Svg}


                </svg>
            </div>
            <form>
                <div className={s.radio}>
                    <h3> выбери X </h3>
                    <input name={"x"} type={"radio"} id={"xValue-4"} value={-4} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue-4">-4</label>

                    <input name={"x"} type={"radio"} id={"xValue-3"} value={-3} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue-3">-3</label>

                    <input name={"x"} type={"radio"} id={"xValue-2"} value={-2} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue-2">-2</label>

                    <input name={"x"} type={"radio"} id={"xValue-1"} value={-1} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue-1">-1</label>

                    <input name={"x"} type={"radio"} id={"xValue0"} value={0} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue0">0</label>

                    <input name={"x"} type={"radio"} id={"xValue1"} value={1} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue1">1</label>

                    <input name={"x"} type={"radio"} id={"xValue2"} value={2} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue2">2</label>

                    <input name={"x"} type={"radio"} id={"xValue3"} value={3} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue3">3</label>

                    <input name={"x"} type={"radio"} id={"xValue4"} value={4} onChange={handleChangeOfData}/>
                    <label htmlFor="xValue4">4</label>

                </div>
                <div>
                    <h3> выбери Y </h3>
                    <br/>

                    <input name={"y"} maxLength={4} min={-5} max={3} defaultValue={0} onChange={handleChangeOfData}/>
                    <label htmlFor={"y"}/>
                </div>

                <div className={s.radio}>
                    <h3> выбери R </h3>

                    <input name={"r"} type={"radio"} id={"rValue1"} value={1} onChange={handleChangeOfData}
                           checked={isREq1()}/>
                    <label htmlFor="rValue1">1</label>

                    <input name={"r"} type={"radio"} id={"rValue2"} value={2} onChange={handleChangeOfData}/>
                    <label htmlFor="rValue2">2</label>

                    <input name={"r"} type={"radio"} id={"rValue3"} value={3} onChange={handleChangeOfData}/>
                    <label htmlFor="rValue3">3</label>

                    <input name={"r"} type={"radio"} id={"rValue4"} value={4} onChange={handleChangeOfData}/>
                    <label htmlFor="rValue4">4</label>

                </div>
                <div>
                    <h1>{data.x} x </h1>
                    <h1>{data.y} y </h1>
                    <h1>{data.r} r </h1>
                </div>
            </form>
            <input type="submit" value="Clean" onClick={clear}/>
            <input type="submit" value="Отправить" onClick={check}/>

            <div>
                <div>
                    {/*{point}*/}
                    <button onClick={authAPI.refreshToken}>refresh access token</button>
                    <button onClick={entryAPI.getAll}>get all</button>
                    {/*<button onClick={clearStorage}>очистить токены</button>*/}
                </div>
            </div>
            <div>
            </div>
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>x</th>
                            <th>y</th>
                            <th>r</th>
                            <th>in area</th>
                            <th>work time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {result}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );


// export let  getentries= ()=>{
//     entryAPI.getAll()
//     // @ts-ignore
//     return entries;
// }


}

export default ResultForm;