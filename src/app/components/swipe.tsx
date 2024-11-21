import { useState, useEffect } from 'react';
import Derivbg from '@/app/assets/Deriv_Logo.jpg';
import Crypto from '@/app/assets/Crypto.png';
import Giftcard from '@/app/assets/Gift-card.webp';
import Image from 'next/image';

const Swipe = () => {
  const images = [
    {
      src: Derivbg,
      alt: 'Deriv Logo',
      text: 'Deriv - Join Now and Learn the part to world Traders Success Stories',
      link: 'https://track.deriv.com/_6v48JkFRkjG6tyDIijdDK2Nd7ZgqdRLk/1/',
    },
    {
      src: Crypto,
      alt: 'Crypto',
      text: 'Crypto - The future of finance',
      link: 'https://www.crypto.com',
    },
    {
      src: Giftcard,
      alt: 'Gift Card',
      text: 'Gift Card - A perfect gift for everyone',
      link: 'https://www.giftcard.com',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay feature: automatically switch images every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide(); // Switch to the next image
    }, 2500); // Adjust the interval time to your preference

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, []);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <a
        href={images[currentIndex].link}
        target="_blank"
        rel="noopener noreferrer"
        className="block" // Make the entire area clickable
      >
        <div key={currentIndex} className="relative w-full h-500">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={800}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute w-full bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold px-4 py-2 bg-black bg-opacity-50 rounded-lg">
            {images[currentIndex].text}
          </div>
        </div>
      </a>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
        <button
          onClick={handlePrevSlide}
          className="text-black p-4 rounded-full hover:scale-105 transition-all"
        >
          ❮
        </button>
        <button
          onClick={handleNextSlide}
          className="text-black p-4 rounded-full hover:scale-105 transition-all"
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 bg-gray-400 rounded-full cursor-pointer ${
              currentIndex === index ? 'bg-gray-800' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Swipe;
