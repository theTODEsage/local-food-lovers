import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const slides = [
  {
    image: "https://images.pexels.com/photos/271715/pexels-photo-271715.jpeg",
    title: "Discover Local Flavors",
    subtitle: "Explore the best restaurants and street food in your city",
  },
  {
    image: "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg",
    title: "Share Your Food Story",
    subtitle: "Post your reviews and help others find their next favorite meal",
  },
  {
    image: "https://images.pexels.com/photos/2318966/pexels-photo-2318966.jpeg",
    title: "Taste the Community",
    subtitle: "Join thousands of food lovers sharing honest opinions",
  },
  {
    image: "https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg",
    title: "Every Bite Counts",
    subtitle: "From fine dining to hidden street gems — we cover it all",
  },
  {
    image: "https://images.pexels.com/photos/1031780/pexels-photo-1031780.jpeg",
    title: "Fresh Reviews Daily",
    subtitle: "Stay updated with the latest food experiences near you",
  },
  {
    image: "https://images.pexels.com/photos/1191426/pexels-photo-1191426.jpeg",
    title: "Good Food, Good Life",
    subtitle: "Celebrate great food with a community that truly loves eating",
  },
  {
    image: "https://images.pexels.com/photos/1797171/pexels-photo-1797171.jpeg",
    title: "Your Next Meal Awaits",
    subtitle: "Find top-rated dishes and restaurants recommended by locals",
  },
];

const Hero = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[400px] md:h-[520px] lg:h-[620px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Bg Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mb-6 drop-shadow">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/all-reviews" className="btn btn-warning">
                    Explore Reviews
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline btn-white text-white"
                  >
                    Join the Community
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
