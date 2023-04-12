import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto'

const LineChart = () => {

    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        fetch('/getSurvey', {
            method: 'GET',
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