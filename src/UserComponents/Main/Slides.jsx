import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://neemans.com/cdn/shop/files/1920X800_Desktop_website_banner_7dc886d9-594e-4406-b1f9-10f3a44e20cd.jpg?v=1753360975&width=1500",
    title: "Nike Air Max Plus",
  },
  {
    id: 2,
    image:
      "https://neemans.com/cdn/shop/files/Desktop_Banner_1920X800_21050fcd-8ae6-44fe-a0cb-8ba23c1bdbd0.jpg?v=1754739442&width=1500",
    title: "Sports Shoes",
  },
  {
    id: 3,
    image:
      "https://neemans.com/cdn/shop/files/1920X800_-_Website_banner.jpg?v=1752941237&width=1500",
    title: "Puma RS-X",
  },
  {
    id: 4,
    image:
      "https://neemans.com/cdn/shop/files/BWT_-_Desktop_Banner.jpg?v=1751290410&width=1500",
    title: "Puma RS-X",
  },
];

const Slides = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // 1 min

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8 ">
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl  mb-4 text-center text-black">
        Trending Now
      </h2>

      {/* Slides */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              // h-[400px] 
              className="min-w-full flex items-center justify-center bg-white text-white relative"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-black/50 px-4 py-2 rounded-lg">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slides;
