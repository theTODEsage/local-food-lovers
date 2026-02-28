import { Link, NavLink } from "react-router";

export default function Navbar() {
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
    <div className="navbar min-h-0 py-2 px-4 bg-gray-900 shadow-lg">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-gray-900 rounded-box w-48 text-gray-200"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost btn-sm text-base font-bold text-orange-400 px-2"
        >
          🍜 FoodieHub
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal menu-sm px-1 text-gray-300 gap-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        <Link to="/login" className="btn btn-warning btn-sm rounded-full px-5">
          Login
        </Link>
      </div>
    </div>
  );
}
