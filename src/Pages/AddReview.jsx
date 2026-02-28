import { use, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const AddReview = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) return toast.error("Please select a star rating");

    const foodName = e.target.foodName.value;
    const foodImage = e.target.foodImage.value;
    const restaurantName = e.target.restaurantName.value;
    const location = e.target.location.value;
    const reviewText = e.target.reviewText.value;

    const reviewData = {
      foodName,
      foodImage,
      restaurantName,
      location,
      rating,
      reviewText,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      date: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Review added successfully!");
          navigate("/my-reviews");
        }
      })
      .catch(() => toast.error("Something went wrong. Try again."));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ✍️ Add a Review
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Share your food experience with the community
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Food Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Food Name</span>
                </label>
                <input
                  type="text"
                  name="foodName"
                  placeholder="e.g. Kacchi Biriyani"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Food Image URL */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Food Image URL</span>
                </label>
                <input
                  type="text"
                  name="foodImage"
                  placeholder="https://your-image-url.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Restaurant Name
                  </span>
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  placeholder="e.g. Haji Biriyani"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Old Dhaka, Dhaka"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Rating</span>
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={(hovered || rating) >= star ? "#f59e0b" : "none"}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      className="w-8 h-8 cursor-pointer transition-transform hover:scale-110"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ))}
                  {rating > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      {rating} / 5
                    </span>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Review</span>
                </label>
                <textarea
                  name="reviewText"
                  placeholder="Write about your experience..."
                  className="textarea textarea-bordered w-full h-32 resize-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-warning w-full rounded-full mt-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
