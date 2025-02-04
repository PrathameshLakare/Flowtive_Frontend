import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TaskList from "../features/task/TaskList";
import { fetchProjects } from "../features/project/projectSlice";
import { fetchUserData } from "../features/auth/authSlice";
import { fetchTasks } from "../features/task/taskSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);
  const { tasks, status } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchTasks({ owners: user._id }));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="container">
      <div className="text-center pb-3">
        <h1 className="display-4">Flowtive Dashboard</h1>
        <h3>Welcome, {user?.name || "User"}</h3>
        {status === "loading" && <p>Loading...</p>}
      </div>

      <div className="my-5">
        <h4 className="mb-4">Projects:</h4>
        <div className="row">
          {projects.projects &&
            projects.projects.length > 0 &&
            projects.projects.map((project) => (
              <div
                key={project._id}
                className="col-md-6 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center"
              >
                <Link
                  to={`/projectView/${project._id}`}
                  className="card bg-info-subtle link-underline link-underline-opacity-0 text-center bg-light border-0 shadow-sm rounded-3 w-100"
                  style={{ transition: "transform 0.2s" }}
                >
                  <div className="card-body p-3">
                    <h5 className="card-title">{project.name}</h5>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div className="">
        <h4 className="mb-4">My Tasks:</h4>
        <TaskList tasks={tasks} />
        <div className="py-3 row">
          <div className="my-2">Quick Filters: </div>
          <div>
            <button
              className="btn btn-primary mx-2"
              onClick={() =>
                dispatch(
                  fetchTasks({
                    status: "In Progress",
                    owners: user?._id,
                  })
                )
              }
            >
              In Progress
            </button>{" "}
            <button
              className="btn btn-primary"
              onClick={() =>
                dispatch(fetchTasks({ status: "Completed", owners: user?._id }))
              }
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
