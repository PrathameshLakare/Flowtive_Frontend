import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportClosedByOwner } from "./reportSlice";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportTaskClosedByOwner = () => {
  const dispatch = useDispatch();
  const { closedByOwner } = useSelector((state) => state.report);

  console.log(closedByOwner);

  useEffect(() => {
    dispatch(fetchReportClosedByOwner());
  }, [dispatch]);

  const mostProductiveOwner = (owners) => {
    const productiveOwners = {};

    owners.forEach((data) => {
      data.details.forEach((details) => {
        if (!productiveOwners[details.name]) {
          productiveOwners[details.name] = 0;
        }
        productiveOwners[details.name] += data.totalClosedTasks;
      });
    });

    return productiveOwners;
  };

  const productiveOwners = mostProductiveOwner(closedByOwner);

  const chartData = {
    labels: Object.keys(productiveOwners),
    datasets: [
      {
        label: "Completed Tasks",
        data: Object.values(productiveOwners),
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Productive Owner",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="container py-3 my-5">
      <h3 className="text-center mb-4">Most Productive Owner</h3>
      <div
        className="chart-container"
        style={{ position: "relative", height: "400px" }}
      >
        <Bar
          data={chartData}
          options={chartOptions}
          className="mx-auto w-100 border p-3 rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default ReportTaskClosedByOwner;
