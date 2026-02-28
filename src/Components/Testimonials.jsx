export const Testimonials = () => {
  const testimonials = [
    {
      name: "Rafiul Karim",
      location: "Dhaka",
      text: "FoodieHub helped me discover the best kacchi biriyani spot just 10 minutes from my home. I never knew it existed!",
      avatar: "R",
      rating: 5,
    },
    {
      name: "Nadia Islam",
      location: "Chittagong",
      text: "I love how honest the reviews are here. No paid promotions, just real people sharing real food experiences.",
      avatar: "N",
      rating: 5,
    },
    {
      name: "Tanvir Ahmed",
      location: "Sylhet",
      text: "Adding my own reviews is so easy and fun. The community is super supportive and always hungry for new recommendations!",
      avatar: "T",
      rating: 4,
    },
  ];

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            💬 What Our Foodies Say
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Real stories from our community of food lovers
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="card-body gap-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={star <= t.rating ? "#f59e0b" : "none"}
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
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{t.text}"
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
