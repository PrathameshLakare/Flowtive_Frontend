import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasks } from "./taskSlice";

const TaskListView = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.task);

  console.log(tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="text-center pb-3 mb-3">
        <h1 className="display-4">Tasks Dashboard</h1>
        <h2 className="text-primary fw-bold">All Tasks</h2>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>{error}</p>}
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6">
          <Link to={"/addtask"} className="btn btn-primary w-100 shadow-sm">
            Add New Task
          </Link>
        </div>
      </div>

      <div className="row g-4">
        {tasks &&
          tasks.map((task) => {
            const dueDate = new Date(task.dueDate);

            return (
              <div
                key={task._id}
                className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
              >
                <Link
                  to={`/taskDetails/${task._id}`}
                  className="text-decoration-none w-100"
                >
                  <div className="card h-100 shadow-lg border-0">
                    <div className="card-header text-white bg-primary text-center">
                      <h5 className="mb-0">{task.name}</h5>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <p className="text-secondary">
                        <strong>Owners: </strong>
                        {task.owners.map((owner) => owner.name).join(", ")}
                      </p>
                      <p className="text-secondary">
                        <strong>Team Name: </strong>
                        {task.team.name}
                      </p>
                      <p className="text-secondary">
                        <strong>Tags: </strong>
                        {task.tags.join(", ")}
                      </p>
                      <p className="text-secondary">
                        <strong>Project Name: </strong>
                        {task.project.name}
                      </p>
                      <p className="text-secondary">
                        <strong>Status: </strong>
                        {task.status}
                      </p>
                      <p className="text-secondary">
                        <strong>Due Date: </strong>
                        {dueDate.toDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TaskListView;
