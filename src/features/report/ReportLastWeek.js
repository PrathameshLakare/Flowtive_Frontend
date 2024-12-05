import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportLastWeek } from "./reportSlice";
import { fetchTasks } from "../task/taskSlice";
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

const ReportLastWeek = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { lastWeekData } = useSelector((state) => state.report);

  const notCompletedTasks = tasks?.filter(
    (task) => task.status !== "Completed"
  );

  useEffect(() => {
    dispatch(fetchReportLastWeek());
    dispatch(fetchTasks());
  }, [dispatch]);

  const chartData = {
    labels: [
      "Weekly Completed Tasks",
      "All Completed Task",
      "Pending Tasks",
      "All Tasks",
    ],
    datasets: [
      {
        label: "Task Overview",
        data: [
          lastWeekData?.length,
          tasks?.length - notCompletedTasks?.length,
          notCompletedTasks?.length,
          tasks?.length,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
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
        text: "Weekly Report of Tasks",
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
      <h3 className="text-center mb-4">Total Work Done Last Week:</h3>
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

export default ReportLastWeek;
