import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TaskList from "../task/TaskList";
import { fetchTeams } from "./teamSlice";
import { fetchAllUsersData } from "../owners/userSlice";
import { fetchTasks } from "../task/taskSlice";
import { useParams } from "react-router-dom";
import { fetchTags } from "../tag/tagSlice";

const TeamView = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);
  const { users } = useSelector((state) => state.users);
  const { tasks, status } = useSelector((state) => state.task);
  const { tags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchAllUsersData());
    dispatch(fetchTags());
  }, [dispatch]);

  const { teamId } = useParams();

  const team = teams?.teams?.find((team) => team._id === teamId);

  useEffect(() => {
    if (team?._id) {
      dispatch(fetchTasks({ team: team._id }));
    }
  }, [dispatch, team?._id]);

  return (
    <div className="container" style={{ minHeight: "500px" }}>
      <div className="text-center pb-3 mb-3">
        {team && <h1>Team: {team.name}</h1>}
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
                dispatch(fetchTasks({ team: team._id, owners: e.target.value }))
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
                dispatch(fetchTasks({ team: team._id, tags: e.target.value }))
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
        <div className="py-2 mt-3">
          <p>
            Quick Filters:
            <button
              className="btn btn-primary mx-2"
              onClick={(e) =>
                dispatch(fetchTasks({ team: team._id, status: "To Do" }))
              }
            >
              To Do
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={(e) =>
                dispatch(fetchTasks({ team: team._id, status: "Completed" }))
              }
            >
              Completed
            </button>
          </p>
        </div>
        <div className="py-2">
          <p>
            Sort By:{" "}
            <button
              className="btn btn-primary mx-4"
              onClick={() =>
                dispatch(
                  fetchTasks({
                    team: team._id,
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

export default TeamView;
