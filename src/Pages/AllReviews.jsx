import { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/reviews?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            🍽️ All Reviews
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Explore honest food experiences shared by our community
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by food name..."
              className="grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-md overflow-hidden"
              >
                <div className="skeleton h-48 w-full rounded-none"></div>
                <div className="card-body gap-3">
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-3 w-1/2"></div>
                  <div className="skeleton h-3 w-2/3"></div>
                  <div className="skeleton h-8 w-24 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍜</p>
            <p className="text-gray-500 text-lg">
              No reviews found{" "}
              {search && (
                <>
                  for{" "}
                  <span className="font-semibold text-orange-400">
                    "{search}"
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((card) => (
              <CardComponent key={card._id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
