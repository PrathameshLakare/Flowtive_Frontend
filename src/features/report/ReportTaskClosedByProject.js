import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../task/taskSlice";
import { fetchReportClosedByProject } from "./reportSlice";
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

const ReportTaskClosedByProject = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { closedByProject } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchReportClosedByProject());
    dispatch(fetchTasks());
  }, [dispatch]);

  const chartData = {
    labels: ["Total Closed Task", "Total Tasks"],
    datasets: [
      {
        label: "Total Tasks",
        data: [closedByProject.length, tasks?.length],
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
        text: "Tasks Closed by Project",
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
      <h3 className="text-center mb-4">Tasks Closed by Project</h3>
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

export default ReportTaskClosedByProject;
