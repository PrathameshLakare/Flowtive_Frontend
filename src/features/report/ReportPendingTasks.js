import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../task/taskSlice";
import { fetchReportPendingWork } from "./reportSlice";
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

const ReportPendingTime = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { pendingDaysData } = useSelector((state) => state.report);

  const totalWorkDays = tasks?.reduce(
    (acc, curr) => acc + curr.timeToComplete,
    0
  );

  useEffect(() => {
    dispatch(fetchReportPendingWork());
    dispatch(fetchTasks());
  }, [dispatch]);

  const chartData = {
    labels: ["Total Pending Work (Days)", "Total Work (Days)"],
    datasets: [
      {
        label: "Days of Work",
        data: [pendingDaysData.totalPendingDays, totalWorkDays],
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
        text: "Total Days of Work Pending",
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
      <h3 className="text-center mb-4">Total Days of Work Pending</h3>
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

export default ReportPendingTime;
