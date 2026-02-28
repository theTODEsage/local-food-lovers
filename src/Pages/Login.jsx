import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { signUser, googleSignIn } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSignUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signUser(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-14">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back 🍜
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Login to explore local food reviews
            </p>
          </div>

          <form onSubmit={handleSignUser} className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-full mt-2 rounded-full"
            >
              Login
            </button>
          </form>

          <div className="divider text-xs text-gray-400">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full rounded-full gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="google"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-orange-500 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
