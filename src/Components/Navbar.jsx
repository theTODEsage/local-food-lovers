import { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setDropdownOpen(false);
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-reviews">All Reviews</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar min-h-0 py-2 px-4 bg-gray-900 shadow-lg sticky top-0 z-50">
      {/* Left - Logo + Mobile Hamburger */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-xl bg-gray-900 rounded-box w-48 text-gray-200"
          >
            {links}
            {user && (
              <>
                <li>
                  <NavLink to="/add-review">Add Review</NavLink>
                </li>
                <li>
                  <NavLink to="/my-reviews">My Reviews</NavLink>
                </li>
                <li>
                  <NavLink to="/my-favorites">My Favorites</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost btn-sm text-base font-bold text-orange-400 px-2"
        >
          🍜 FoodieHub
        </Link>
      </div>

      {/* Center - Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal menu-sm px-1 text-gray-300 gap-1">
          {links}
        </ul>
      </div>

      {/* Right - Auth */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="relative">
            {/* Avatar Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full ring-2 ring-orange-400 overflow-hidden focus:outline-none cursor-pointer"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center">
                  {user.displayName?.charAt(0) || user.email?.charAt(0)}
                </div>
              )}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />

                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-box shadow-xl z-50 p-2 text-sm">
                  {/* User Info */}
                  <li className="px-3 py-2 border-b border-gray-100 mb-1 pointer-events-none">
                    <p className="font-semibold text-gray-800 text-xs truncate">
                      {user.displayName || "Food Lover"}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {user.email}
                    </p>
                  </li>

                  <li>
                    <Link
                      to="/add-review"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      ✍️ Add Review
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-reviews"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      📋 My Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-favorites"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      ❤️ My Favorites
                    </Link>
                  </li>

                  <li className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-warning btn-sm rounded-full px-5"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
