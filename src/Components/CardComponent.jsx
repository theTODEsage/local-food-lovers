import { use } from "react";
import { Link } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const CardComponent = ({ card }) => {
  const {
    _id,
    foodImage,
    foodName,
    restaurantName,
    location,
    reviewerName,
    rating,
  } = card;
  const { user } = use(AuthContext);

  const handleFavorite = () => {
    if (!user) return toast.error("Please login to save favorites");

    const favoriteData = {
      reviewId: _id,
      foodImage,
      foodName,
      restaurantName,
      location,
      reviewerName,
      rating,
      userEmail: user.email,
    };

    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) toast.success("Added to favorites!");
        else toast.error("Already in your favorites!");
      })
      .catch(() => toast.error("Something went wrong."));
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
      {/* Food Image + Heart Button */}
      <figure className="h-48 overflow-hidden relative">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 btn btn-circle btn-sm bg-white/80 hover:bg-white border-none shadow"
          title="Add to favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </figure>

      <div className="card-body p-4 flex flex-col gap-2">
        <h2 className="card-title text-base font-bold text-gray-800">
          {foodName}
        </h2>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= rating ? "#f59e0b" : "none"}
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
          <span className="text-xs text-gray-500 ml-1">({rating}/5)</span>
        </div>

        {/* Restaurant */}
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
          <span className="truncate font-medium">{restaurantName}</span>
        </div>

        {/* Location */}
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
          <span className="truncate">{location}</span>
        </div>

        <div className="divider my-1"></div>

        {/* Reviewer + Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0">
              {reviewerName.charAt(0)}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {reviewerName}
            </span>
          </div>
          <Link
            to={`/reviews/${_id}`}
            className="btn btn-warning btn-xs rounded-full px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
