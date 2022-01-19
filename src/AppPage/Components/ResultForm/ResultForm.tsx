import React, {MouseEventHandler} from 'react';
import s from "./ResultStyle.module.css";
import SvgGraph from "../SvgGraph/SvgGraph";
import auth from "../../../API/authAPI";
import {entryAPI} from "../../../API/entryAPI";
import {log} from "util";


const ResultForm = () => {
    const [data, setData] = React.useState({
        x: 0,
        y: 0,
        r: 1
    });


    // @ts-ignore
    function handleChangeOfData(evt) {
        const value = evt.target.value;
        setData({
            ...data,
            [evt.target.name]: value
        });
    }

    function check() {
        entryAPI.check(data.x, data.y, data.r)
    }

    function clear() {
        entryAPI.clear()
    }

    // @ts-ignore
    function sub(event) {
        let rowX = event.nativeEvent.offsetX
        let rowY = event.nativeEvent.offsetY
        console.log()
        data.x = Number((data.r * (rowX - 150) / 120).toFixed(2));
        data.y = Number(((150 - rowY) * data.r / 120).toFixed(2))
        data.r = data.r;
        console.log(data)
        entryAPI.check(data.x, data.y, data.r)
        // alert("2")
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div style={s}>
            <div onClick={sub} style={{display: "inline-block"}}>
                <SvgGraph/>
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

                    <input name={"r"} type={"radio"} id={"rValue1"}   value={1} onChange={handleChangeOfData}/>
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
        </div>
    );
}

export default ResultForm;