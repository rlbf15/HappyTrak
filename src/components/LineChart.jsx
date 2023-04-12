import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto'

const LineChart = () => {

    const [chartData, setChartData] = useState([]);
    const [haveData, setHaveData] = useState(false);
    
    useEffect(() => {
        fetch('http://localhost:3000/getSurvey', {
            method: 'GET',
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(data => data.json())
        .then(response => {
            //parses data from server into arrays grouped by week
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
            //averages question value arrays and puts them into an object containing the associated week id, and pushes those objects into an array
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
            //parses graphData into a form that can be utilized by react-chartjs-2
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
            //console.log(finalData);
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