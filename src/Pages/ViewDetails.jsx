import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const ViewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  const {
    foodImage,
    foodName,
    restaurantName,
    location,
    reviewerName,
    rating,
    reviewText,
    date,
  } = review;

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          to="/all-reviews"
          className="btn btn-ghost btn-sm mb-6 text-gray-600 pl-0"
        >
          ← Back to All Reviews
        </Link>

        <div className="card bg-base-100 shadow-xl overflow-hidden">
          {/* Food Image */}
          <figure className="h-72 md:h-96 overflow-hidden">
            <img
              src={foodImage}
              alt={foodName}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body p-6 md:p-10">
            {/* Food Name + Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {foodName}
              </h1>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= rating ? "#f59e0b" : "none"}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-1">({rating}/5)</span>
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* Restaurant + Location */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-400 shrink-0"
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
                <span className="font-medium">{restaurantName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-400 shrink-0"
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
                <span>{location}</span>
              </div>
            </div>

            {/* Review Text */}
            <div className="bg-gray-50 rounded-xl p-5 mt-2">
              <p className="text-gray-700 leading-relaxed">{reviewText}</p>
            </div>

            {/* Reviewer + Date */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center shrink-0">
                  {reviewerName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {reviewerName}
                  </p>
                  <p className="text-xs text-gray-400">Reviewer</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
