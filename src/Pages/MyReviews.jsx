import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const MyReviews = () => {
  const { user } = use(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/my-reviews?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, [user.email]);

  const handleDelete = () => {
    fetch(`http://localhost:3000/reviews/${deletingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setReviews(reviews.filter((r) => r._id !== deletingId));
          toast.success("Review deleted successfully");
        }
        setDeletingId(null);
        document.getElementById("delete_modal").close();
      })
      .catch(() => toast.error("Failed to delete. Try again."));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            📋 My Reviews
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage all the food reviews you have shared
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-warning"></span>
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍜</p>
            <p className="text-gray-500 text-lg mb-4">
              You haven't added any reviews yet
            </p>
            <Link
              to="/add-review"
              className="btn btn-warning rounded-full px-8"
            >
              Add Your First Review
            </Link>
          </div>
        )}

        {/* Table */}
        {!loading && reviews.length > 0 && (
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="table bg-base-100">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Food Name</th>
                  <th>Restaurant</th>
                  <th>Date</th>
                  <th>Rating</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review._id} className="hover">
                    <td className="text-gray-500">{index + 1}</td>
                    <td>
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={review.foodImage}
                          alt={review.foodName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="font-medium text-gray-800">
                      {review.foodName}
                    </td>
                    <td className="text-gray-600">{review.restaurantName}</td>
                    <td className="text-gray-500 text-sm">{review.date}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#f59e0b"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          {review.rating}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/edit-review/${review._id}`}
                          className="btn btn-warning btn-xs rounded-full px-4"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-error btn-xs rounded-full px-4"
                          onClick={() => {
                            setDeletingId(review._id);
                            document.getElementById("delete_modal").showModal();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-gray-800">🗑️ Delete Review</h3>
          <p className="text-gray-500 mt-2">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-ghost rounded-full"
              onClick={() => {
                setDeletingId(null);
                document.getElementById("delete_modal").close();
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-error rounded-full px-6"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
