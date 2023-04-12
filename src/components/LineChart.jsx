import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto'

const LineChart = () => {

    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        fetch('http://localhost:3000/getSurvey', {
            method: 'GET',
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(data => data.json())
        .then(response => {
            console.log(response)
            //update state / setChartData here
        })
    }, [])

return (
    <div>
        <h3>Chart goes here</h3>
    </div>
    /*<Line data = {chartData}/>*/
    )
}

export default LineChart;