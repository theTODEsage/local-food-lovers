import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
        setRating(data.rating);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) return toast.error("Please select a star rating");

    const updatedReview = {
      foodName: e.target.foodName.value,
      foodImage: e.target.foodImage.value,
      restaurantName: e.target.restaurantName.value,
      location: e.target.location.value,
      rating,
      reviewText: e.target.reviewText.value,
    };

    fetch(`http://localhost:3000/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Review updated successfully!");
          navigate("/my-reviews");
        }
      })
      .catch(() => toast.error("Something went wrong. Try again."));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ✏️ Edit Review
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Update your food experience
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
                  defaultValue={review.foodName}
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
                  defaultValue={review.foodImage}
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
                  defaultValue={review.restaurantName}
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
                  defaultValue={review.location}
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
                  <span className="text-sm text-gray-500 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Review</span>
                </label>
                <textarea
                  name="reviewText"
                  defaultValue={review.reviewText}
                  className="textarea textarea-bordered w-full h-32 resize-none"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  className="btn btn-ghost rounded-full flex-1"
                  onClick={() => navigate("/my-reviews")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-warning rounded-full flex-1"
                >
                  Update Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
