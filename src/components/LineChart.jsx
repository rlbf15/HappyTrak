import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto'

const LineChart = () => {

// const [chartData, setChartData] = useState({
//     labels: surveyData.map((data) => data.week_id),
//     datasets: [
//       {
//         label: "Cultural Fit",
//         data: surveyData.map((data) =>data.question_0_total)
//       },
//       {
//         label: "Manager Relationships",
//         data: surveyData.map((data) => data.question_1_total)
//       },
//       {
//         label: "Employee Validation",
//         data: surveyData.map((data) => data.question_2_total)
//       },
//       {
//         label: "Coworker Relationships",
//         data: surveyData.map((data) => data.question_3_total)
//       },
//     ]
//   })

    const [chartData, setChartData] = useState([]);
    const [haveData, setHaveData] = useState(false);
    
    useEffect(() => {
        fetch('http://localhost:3000/getSurvey', {
            method: 'GET',
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(data => data.json())
        .then(response => {
            const parsedData = {};
            for (let data of response) {
                if (!parsedData[data.week]) {
                    parsedData[data.week] = {};
                }
                for (let key of Object.keys(data)) {
                    if (key === 'week' || key === '_id' || key === '__v') {
                        continue;
                    }
                    else {
                        if (!parsedData[data.week][key]) {
                            parsedData[data.week][key] = [];
                        }
                        parsedData[data.week][key].push(data[key]);
                    }
                }
            }
            const graphData = [];
            for (let week of Object.keys(parsedData)) {
                const weekData = {};
                weekData.week_id = Number(week);
                for (let question of Object.keys(parsedData[week])) {
                    weekData[question] = (Math.round((parsedData[week][question].reduce((acc, curr) => acc + curr) / parsedData[week][question].length + Number.EPSILON) * 100) / 100);
                }
                if (!isNaN(weekData.week_id)) {
                    graphData.push(weekData);
                };
            }
            //console.log(graphData);
            const finalData = {
                labels: graphData.map((data) => data.week_id),
                datasets: []
            };
            for (let key of Object.keys(graphData[0])) {
                if (key !== 'week_id') {
                    finalData.datasets.push({
                        label: key,
                        data: graphData.map((data) => data[key])
                    })
                }
            }
            console.log(finalData);
            setChartData(finalData);
            setHaveData(true);
        })
    }, [])

    if (!haveData) {
        return <div>Loading...</div>
    }
    else {
        return <Line data = {chartData}/>
    }
}

export default LineChart;