import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, postTeam } from "./teamSlice";
import { Link } from "react-router-dom";

const TeamList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const { teams, status, error } = useSelector((state) => state.team);

  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddTeamSubmit = (event) => {
    event.preventDefault();
    const newTeam = { name: teamName, description: teamDescription };

    dispatch(postTeam(newTeam));
    if (newTeam) {
      setShowToast(true);
      setToastMessage("Team added successfully.");
    }
    setTeamName("");
    setTeamDescription("");
  };

  return (
    <div className="container">
      <div className="text-center mb-5">
        <h1 className="display-3">Team Dashboard</h1>
        <h2 className="text-primary fw-bold">All Teams</h2>
        {status === "loading" && <p className="text-center my-2">Loading...</p>}
        {status === "error" && <p className="text-center my-2">{error}</p>}
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6">
          <button
            className="btn btn-primary w-100 shadow-sm"
            data-bs-toggle="modal"
            data-bs-target="#teamModal"
          >
            Add New Team
          </button>
        </div>
      </div>

      <div className="row g-4">
        {teams.teams &&
          teams.teams.length > 0 &&
          teams.teams.map((team) => (
            <div
              key={team._id}
              className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
            >
              <Link
                to={`/teamView/${team._id}`}
                className="text-decoration-none w-100"
              >
                <div className="card h-100 shadow-lg border-0">
                  <div className="card-header text-white bg-primary text-center">
                    <h5 className="mb-0">{team.name}</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="text-secondary">
                      {team.description
                        ? team.description
                        : "No description available for this team."}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div
        className="modal fade"
        id="teamModal"
        tabIndex="-1"
        aria-labelledby="teamModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="teamModalLabel">
                Add New Team
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form id="teamForm" onSubmit={handleAddTeamSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">
                    Team Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    required
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamDescription" className="form-label">
                    Team Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="teamDescription"
                    rows="4"
                    placeholder="Enter team details"
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Team
                </button>
              </div>
            </form>
          </div>
        </div>
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

export default TeamList;
