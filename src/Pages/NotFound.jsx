import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">

      <p className="text-8xl mb-4">🍽️</p>
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-2">Oops! This page is off the menu.</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-sm">
        Looks like this page got eaten. Let's get you back to something delicious.
      </p>
      <Link to="/" className="btn btn-warning rounded-full px-8">
        🏠 Back to Home
      </Link>

    </div>
  );
};

export default NotFound;