import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects, postProject } from "./projectSlice";

const ProjectList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const { projects, status, error } = useSelector((state) => state.project);

  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddProjectSubmit = (event) => {
    event.preventDefault();
    const newProject = { name: projectName, description: projectDetails };

    dispatch(postProject(newProject));

    if (newProject) {
      setShowToast(true);
      setToastMessage("Project added successfully.");
    }
    setProjectName("");
    setProjectDetails("");
  };

  return (
    <div className="container">
      <div className="text-center mb-5">
        <h1 className="display-3">Project Dashboard</h1>
        <h2 className="text-primary fw-bold">All Projects</h2>
        {status === "loading" && <p className="text-center my-2">Loading...</p>}
        {status === "error" && <p className="text-center my-2">{error}</p>}
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6">
          <button
            className="btn btn-primary w-100 shadow-sm"
            data-bs-toggle="modal"
            data-bs-target="#projectModal"
          >
            Add New Project
          </button>
        </div>
      </div>

      <div className="row g-4">
        {projects.projects &&
          projects.projects.length > 0 &&
          projects.projects.map((project) => (
            <div
              key={project._id}
              className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
            >
              <Link
                to={`/projectView/${project._id}`}
                className="text-decoration-none w-100"
              >
                <div className="card h-100 shadow-lg border-0">
                  <div className="card-header text-white bg-primary text-center">
                    <h5 className="mb-0">{project.name}</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="text-secondary">
                      {project.description
                        ? project.description
                        : "No description available for this project."}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div
        className="modal fade"
        id="projectModal"
        tabIndex="-1"
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="projectModalLabel">
                Add New Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form id="projectForm" onSubmit={handleAddProjectSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">
                    Project Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    required
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="projectDetails" className="form-label">
                    Project Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="projectDetails"
                    rows="4"
                    placeholder="Enter project details"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
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
                  Add Project
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

export default ProjectList;
