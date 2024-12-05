import { useParams } from "react-router-dom";
import { fetchTasks, updateTask } from "./taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { tasks, status, error } = useSelector((state) => state.task);

  const taskDetails = tasks?.find((task) => task._id === taskId);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const dueDate = new Date(taskDetails?.dueDate);

  const timeRemaining = Math.max(0, dueDate - new Date());

  const daysRemaining =
    timeRemaining > 0 ? Math.floor(timeRemaining / (1000 * 60 * 60 * 24)) : 0;
  const hoursRemaining =
    timeRemaining > 0
      ? Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      : 0;
  const minutesRemaining =
    timeRemaining > 0
      ? Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
      : 0;

  return (
    <div>
      {status === "loading" && <p className="text-center py-3 ">Loading...</p>}
      {status === "error" && <p className="text-center py-3 ">{error}</p>}
      <div className="container py-4 d-flex justify-content-center">
        {taskDetails && (
          <div className="col-lg-6">
            <div className="card shadow ">
              <div className="card-header text-white bg-primary p-3">
                <h3 className="mb-0 text-center">{taskDetails.name}</h3>
              </div>
              <div className="card-body p-4 mx-auto">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Project:</strong> {taskDetails.project.name}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Team:</strong> {taskDetails.team.name}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Owners:</strong>{" "}
                      {taskDetails.owners.map((owner) => owner.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Tags:</strong> {taskDetails.tags.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Due Date:</strong> {dueDate.toDateString()}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Status:</strong> {taskDetails.status}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12 ">
                    <p>
                      <strong>Time Remaining:</strong> {daysRemaining} days,{" "}
                      {hoursRemaining} hours, {minutesRemaining} minutes
                    </p>
                  </div>
                </div>
                <div className="d-grid m-2">
                  <button
                    className="btn btn-primary px-4 py-2"
                    onClick={() => {
                      dispatch(
                        updateTask({
                          id: taskDetails?._id,
                          updatedTask: { status: "Completed" },
                        })
                      );
                      setToastMessage("Status changed successfully");
                      setShowToast(true);
                    }}
                  >
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 5 }}
        >
          <div
            className="toast show text-bg-primary text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body fs-6">
              {toastMessage}
              <button
                type="button"
                className="btn-close float-end btn-close-white"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
