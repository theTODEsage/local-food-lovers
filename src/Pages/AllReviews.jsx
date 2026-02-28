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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
              No reviews found for{" "}
              <span className="font-semibold text-orange-400">"{search}"</span>
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
