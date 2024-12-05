import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TaskList from "../task/TaskList";
import { fetchProjects } from "./projectSlice";
import { fetchAllUsersData } from "../owners/userSlice";
import { fetchTasks } from "../task/taskSlice";
import { useParams } from "react-router-dom";
import { fetchTags } from "../tag/tagSlice";

const ProjectView = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const { users } = useSelector((state) => state.users);
  const { tasks, status } = useSelector((state) => state.task);
  const { tags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAllUsersData());
    dispatch(fetchTags());
  }, [dispatch]);

  const { projectId } = useParams();

  const project = projects?.projects?.find(
    (project) => project._id === projectId
  );

  console.log(status);

  useEffect(() => {
    if (project?._id) {
      dispatch(fetchTasks({ project: project._id }));
    }
  }, [dispatch, project?._id]);

  return (
    <div className="container" style={{ minHeight: "500px" }}>
      <div className="text-center pb-3 mb-3">
        {project && <h1>Project: {project.name}</h1>}
        {status === "loading" && <p className="my-2">Loading...</p>}
      </div>

      <div className="">
        <h4 className="mb-4">My Tasks:</h4>
        <TaskList tasks={tasks} />
        <div className="py-3 row">
          <div className="my-2">Filters: </div>
          <div className="col-md-6">
            <select
              defaultValue=""
              onChange={(e) =>
                e.target.value &&
                dispatch(
                  fetchTasks({ project: project._id, owners: e.target.value })
                )
              }
              className="form-select"
            >
              <option value={""}>By Owner</option>
              {users?.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              defaultValue=""
              onChange={(e) =>
                e.target.value &&
                dispatch(
                  fetchTasks({ project: project._id, tags: e.target.value })
                )
              }
              className="form-select"
            >
              <option value={""}>By Tag</option>
              {tags?.tags?.map((tag) => (
                <option key={tag._id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="py-2">
          <p>
            Sort By:{" "}
            <button
              className="btn btn-primary mx-4"
              onClick={() =>
                dispatch(
                  fetchTasks({
                    project: project._id,
                    sortBy: "dueDate",
                    order: "asc",
                  })
                )
              }
            >
              Due Date
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
