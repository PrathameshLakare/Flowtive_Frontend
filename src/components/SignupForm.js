import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { data, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    dispatch(signupUser(userData));
  };

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("adminToken", data.token);
      navigate("/dashboard");
    }
  }, [data, navigate]);

  return (
    <div className="container py-5">
      <div className="w-50 mx-auto">
        <div className="card shadow-lg my-3">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Flowtive Signup</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="loginName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="loginName"
                  required
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
              </div>
              {error && (
                <p className="border border-danger bg-danger bg-opacity-25 rounded text-danger text-center p-2 my-2">
                  {error}
                </p>
              )}

              <p className="text-center my-2">
                Already a member? <Link to={"/"}>Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
