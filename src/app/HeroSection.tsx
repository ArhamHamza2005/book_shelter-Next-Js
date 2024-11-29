// app/components/HeroSection.tsx
"use client";

import MostBuy from "./MostBuy";
import TopRated from "./TopRated";

const HeroSection = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-black via-pink-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Text Content */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg mb-6">
          Welcome to Book Shelter, your ultimate haven for discovering and enjoying books of all genres! Whether you're a passionate reader or just starting your literary journey, Book Shelter offers a wide selection of books that cater to all tastes and interests.
         </p>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="/image/download.jpg" // Replace with your image URL
            alt="Bookshelf"
            className="w-full h-auto max-w-sm mx-auto lg:max-w-full"
          />
        </div>
      </div>
    </div>
    <TopRated/>
    <MostBuy/>
    </>

  );
};

export default HeroSection;
