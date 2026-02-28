import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { Link } from "react-router";

const TopReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/reviews/top-rated")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            🌟 Featured Reviews
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Handpicked top-rated food experiences from our community
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Skeleton Loader */}
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

        {/* Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((card) => (
              <CardComponent key={card._id} card={card} />
            ))}
          </div>
        )}

        {/* Show All Button */}
        {!loading && (
          <div className="text-center mt-10">
            <Link
              to="/all-reviews"
              className="btn btn-warning btn-wide rounded-full"
            >
              Show All Reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopReviews;
