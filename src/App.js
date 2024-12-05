import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import SingnupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./features/task/TaskForm";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router";
import TaskDetails from "./features/task/TaskDetails";
import ProjectList from "./features/project/ProjectList";
import TeamList from "./features/team/TeamList";
import ReportVeiw from "./features/report/ReportVeiw";
import Protected from "./components/Protected";
import TeamView from "./features/team/TeamView";
import ProjectView from "./features/project/ProjectView";
import TaskListView from "./features/task/TaskListView";

function App() {
  return (
    <Router>
      <div className="bg-light">
        <div className="bg-white">
          <nav className="py-3 navbar">
            <h4 className="px-2 px-sm-5 mx-sm-5">
              <Link
                to={"/dashboard"}
                className="link-dark link-underline link-underline-opacity-0"
              >
                Workasana
              </Link>
            </h4>
            <button
              className="navbar-toggler d-sm-none me-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-2 bg-white">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-9 p-5 min-vh-100">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SingnupPage />} />

              <Route
                path="/dashboard"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />
              <Route
                path="/tasks"
                element={
                  <Protected>
                    <TaskListView />
                  </Protected>
                }
              />
              <Route
                path="/addtask"
                element={
                  <Protected>
                    <TaskForm />
                  </Protected>
                }
              />

              <Route
                path="/taskDetails/:taskId"
                element={
                  <Protected>
                    <TaskDetails />
                  </Protected>
                }
              />
              <Route
                path="/projects"
                element={
                  <Protected>
                    <ProjectList />
                  </Protected>
                }
              />
              <Route
                path="/projectView/:projectId"
                element={
                  <Protected>
                    <ProjectView />
                  </Protected>
                }
              />
              <Route
                path="/teams"
                element={
                  <Protected>
                    <TeamList />
                  </Protected>
                }
              />
              <Route
                path="/teamView/:teamId"
                element={
                  <Protected>
                    <TeamView />
                  </Protected>
                }
              />
              <Route
                path="/reports"
                element={
                  <Protected>
                    <ReportVeiw />
                  </Protected>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
