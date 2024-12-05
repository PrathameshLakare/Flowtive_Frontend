import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../project/projectSlice";
import { fetchTeams } from "../team/teamSlice";
import { fetchAllUsersData } from "../owners/userSlice";
import { fetchTags } from "../tag/tagSlice";
import { postTask } from "./taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const { teams } = useSelector((state) => state.team);
  const { users } = useSelector((state) => state.users);
  const { tags } = useSelector((state) => state.tag);

  const [name, setName] = useState("");
  const [project, setProject] = useState(projects?.projects?.[0]?._id || "");
  const [team, setTeam] = useState(teams?.teams?.[0]?._id || "");
  const [owners, setOwners] = useState([]);
  const [inputTags, setInputTags] = useState([]);
  const [timeToComplete, setTimeToComplete] = useState("");
  const [inputStatus, setInputStatus] = useState("To Do");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputTags.length === 0) {
      return setError("At least one tag must be selected.");
    }

    if (owners.length === 0) {
      return setError("At least one owner must be selected.");
    }

    const newTask = {
      name,
      project,
      team,
      owners,
      tags: inputTags,
      timeToComplete,
      status: inputStatus,
    };

    dispatch(postTask(newTask));

    setName("");
    setProject(projects?.projects?.[0]?._id || "");
    setTeam(teams?.teams?.[0]?._id || "");
    setOwners([]);
    setInputTags([]);
    setTimeToComplete("");
    setInputStatus("To Do");
    setError("");
  };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTeams());
    dispatch(fetchAllUsersData());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div className="container bg-light h-100 p-3 d-flex align-items-center justify-content-center">
      <form
        className="row g-3 "
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center my-3 pb-3">Create New Task</h1>

        <div className="col-md-6">
          <label htmlFor="inputTaskName" className="form-label fs-5 my-1">
            Task Name:
          </label>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Task Name"
            className="form-control"
            value={name}
            required
            id="inputTaskName"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputProject" className="form-label fs-5 my-1">
            Project Name:
          </label>
        </div>
        <div className="col-md-6">
          <select
            id="inputProject"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="form-select"
          >
            {projects?.projects ? (
              projects.projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))
            ) : (
              <option>Projects...</option>
            )}
          </select>
        </div>

        <div className="col-md-6">
          <p className="form-label fs-5 my-1">Owners (Team Members): </p>
        </div>
        <div className="col-md-6">
          <div className="row">
            {users &&
              users.map((owner, index) => (
                <div key={owner._id} className="col-6 ">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={owner._id}
                      checked={owners.includes(owner._id)}
                      onChange={(e) =>
                        setOwners((prev) =>
                          e.target.checked
                            ? [...prev, owner._id]
                            : prev.filter((id) => id !== owner._id)
                        )
                      }
                      id={`owner${index}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`owner${index}`}
                    >
                      {owner.name}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="inputTeam" className="form-label fs-5 my-1">
            Team:
          </label>
        </div>
        <div className="col-md-6">
          <select
            id="inputTeam"
            onChange={(e) => setTeam(e.target.value)}
            value={team}
            className="form-select"
          >
            {teams.teams ? (
              teams.teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))
            ) : (
              <option>Team...</option>
            )}
          </select>
        </div>

        <div className="col-md-6">
          <p className="form-label fs-5 my-1">Tags:</p>
        </div>
        <div className="col-md-6">
          <div className="row">
            {tags.tags &&
              tags.tags.map((tag, index) => (
                <div key={tag._id} className="col-6 ">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={tag.name}
                      checked={inputTags.includes(tag.name)}
                      onChange={(e) =>
                        setInputTags((prev) =>
                          e.target.checked
                            ? [...prev, tag.name]
                            : prev.filter((tagName) => tagName !== tag.name)
                        )
                      }
                      id={`tag${index}`}
                    />
                    <label className="form-check-label" htmlFor={`tag${index}`}>
                      {tag.name}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="inputDays" className="form-label fs-5 my-1">
            Time to Complete (days):
          </label>
        </div>
        <div className="col-md-6">
          <input
            type="number"
            placeholder="Time in Days"
            className="form-control"
            value={timeToComplete}
            onChange={(e) => setTimeToComplete(e.target.value)}
            required
            id="inputDays"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputStatus" className="form-label fs-5 my-1">
            Status:
          </label>
        </div>
        <div className="col-md-6">
          <select
            id="inputStatus"
            value={inputStatus}
            onChange={(e) => setInputStatus(e.target.value)}
            className="form-select"
          >
            <option value={"To Do"}>To Do</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
            <option value={"Blocked"}>Blocked</option>
          </select>
        </div>

        {error && <p className="text-danger mt-1">{error}</p>}

        <div className="d-grid col-12 mt-4">
          <button type="submit" className="btn btn-primary">
            Create New Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
