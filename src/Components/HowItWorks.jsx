export const HowItWorks = () => {
  const steps = [
    {
      icon: "🔍",
      title: "Discover Local Food",
      desc: "Browse reviews from food lovers near you and find hidden gems in your city.",
    },
    {
      icon: "🍴",
      title: "Visit & Taste",
      desc: "Head to the restaurant or street stall and experience the food for yourself.",
    },
    {
      icon: "✍️",
      title: "Share Your Review",
      desc: "Write an honest review, add a photo, and help others make better food choices.",
    },
    {
      icon: "❤️",
      title: "Save Your Favorites",
      desc: "Heart the reviews you love and build your personal list of must-try dishes.",
    },
  ];

  return (
    <section className="py-14 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            🍜 How It Works
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Join the community in 4 simple steps
          </p>
          <div className="w-16 h-1 bg-orange-400 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="card-body items-center gap-3">
                <div className="text-5xl">{step.icon}</div>
                <div className="w-7 h-7 rounded-full bg-orange-400 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="font-bold text-gray-800">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
