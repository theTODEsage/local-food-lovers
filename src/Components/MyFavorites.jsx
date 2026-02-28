import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const MyFavorites = () => {
  const { user } = use(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/favorites?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      });
  }, [user.email]);

  const handleRemove = (id) => {
    fetch(`http://localhost:3000/favorites/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setFavorites(favorites.filter((f) => f._id !== id));
          toast.success("Removed from favorites");
        }
      })
      .catch(() => toast.error("Something went wrong."));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ❤️ My Favorites
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            All the food reviews you have saved
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-warning"></span>
          </div>
        )}

        {/* Empty */}
        {!loading && favorites.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">💔</p>
            <p className="text-gray-500 text-lg mb-4">No favorites yet</p>
            <Link
              to="/all-reviews"
              className="btn btn-warning rounded-full px-8"
            >
              Explore Reviews
            </Link>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav._id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={fav.foodImage}
                    alt={fav.foodName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </figure>

                <div className="card-body p-4 flex flex-col gap-2">
                  <h2 className="card-title text-base font-bold text-gray-800">
                    {fav.foodName}
                  </h2>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= fav.rating ? "#f59e0b" : "none"}
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({fav.rating}/5)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="truncate font-medium">
                      {fav.restaurantName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">{fav.location}</span>
                  </div>

                  <div className="divider my-1"></div>

                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      to={`/reviews/${fav.reviewId}`}
                      className="btn btn-warning btn-xs rounded-full px-4"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemove(fav._id)}
                      className="btn btn-error btn-xs rounded-full px-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
