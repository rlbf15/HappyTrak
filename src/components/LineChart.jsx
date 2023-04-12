import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto'

const LineChart = () => {

    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        fetch('', {
            method: 'GET',
        })
        .then(data => data.json())
        .then(response => {
            console.log(response)
            //update state / setChartData here
        })
    }, [])

return (
    <Line data = {chartData}/>
    )
}

export default LineChart;