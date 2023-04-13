import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto'
import { EmployeesList } from "./EmployeesList";

function LineChart ({chartData}) {
    return (
        <>
        <Line data={chartData} />
        <EmployeesList />
        </>
    )
}

export default LineChart;