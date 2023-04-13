import React from "react";
import { Line , Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
// import { Chart } from 'chart.js/auto'

function LineChart ({chartData}) {
    return <Line data = {chartData}/>
    // return <Bar data={chartData} />;
}

export default LineChart;