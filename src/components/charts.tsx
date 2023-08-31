/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import axios, { AxiosResponse } from "axios";

interface Record {
  cases: { string: number };
  deaths: { string: number };
  recovered: { string: number };
}

export default function Mychart() {
  const [cases, setCases] = useState({});
  const [deaths, setDeaths] = useState({});
  const [recovered, setRecovered] = useState({});
  const fetchRecords = async (): Promise<AxiosResponse<Record>> => {
    const response = await axios.get<Record>(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    return response;
  };
  useEffect(() => {
    const getRecords = async () => {
      const { data } = await fetchRecords();
      setCases(data.cases);
      setDeaths(data.deaths);
      setRecovered(data.recovered);
    };
    getRecords();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Covid Records",
      },
    },
  };

  const records = {
    labels: Object.keys(cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(cases),
        borderColor: "rgb(129, 227, 193)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Deaths",
        data: Object.values(deaths),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Recovered",
        data: Object.values(recovered),
        borderColor: "rgb(152, 235, 110)",
        backgroundColor: "rgba(166, 108, 229, 0.5)",
      },
    ],
  };

  return (
    <div className="px-32 ml-14">
      <Line options={options} data={records} />
    </div>
  );
}
