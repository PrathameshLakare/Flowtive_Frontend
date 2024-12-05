import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className="ms-5 ps-5 bg-white">
      <nav className="navbar navbar-expand-md">
        <div>
          <div
            className="offcanvas offcanvas-start"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="staticBackdrop"
            aria-labelledby="staticBackdropLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="staticBackdropLabel">
                Workasana
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="/dashboard" className="text-decoration-none">
                      Dashboard
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/tasks" className="text-decoration-none">
                      Tasks
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/projects" className="text-decoration-none">
                      Projects
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/teams" className="text-decoration-none">
                      Teams
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/reports" className="text-decoration-none">
                      Reports
                    </a>
                  </li>
                </ul>
                <button className="btn btn-danger mt-4" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
