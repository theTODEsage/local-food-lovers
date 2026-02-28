import { use } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, googleSignIn, updateUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.image.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Password validations per doc
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must include at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must include at least one lowercase letter");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    createUser(email, password)
      .then((result) => {
        // Save name and photo to firebase profile
        console.log(result)
        return updateUser(name, photoURL);
      })
      .then(() => {
        // Doc says: no success toast, just redirect to home
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => navigate("/"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-14">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Join FoodieHub 🍽️
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Create an account and start sharing food experiences
            </p>
          </div>

          <form onSubmit={handleAddUser} className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

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
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://your-photo-url.com"
                className="input input-bordered w-full"
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

            <div>
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-full mt-2 rounded-full"
            >
              Create Account
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
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-orange-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
