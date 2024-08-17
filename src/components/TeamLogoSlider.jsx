import React, { useEffect, useState } from "react";


const images = [
  "https://w0.peakpx.com/wallpaper/446/809/HD-wallpaper-cleveland-cavaliers-nba-logo-black-stone-basketball-eastern-conference-asphalt-texture-usa-creative-cavs-basketball-club-cleveland-cavaliers-logo.jpg",
  "https://img.goodfon.com/original/3840x2400/6/63/wallpaper-sport-logo-basketball-nba-new-orleans-pelicans-1.jpg",
  "https://i.pinimg.com/736x/d0/a1/4e/d0a14e39c092abbc0026cb35a2774619.jpg",
  "https://images.alphacoders.com/971/971206.jpg",
  "https://wallpaper.forfun.com/fetch/dd/dde2a5dd12b621f2957c6588010919cd.jpeg",
  "https://w0.peakpx.com/wallpaper/565/496/HD-wallpaper-phoenix-suns-nba-logo-black-stone-basketball-western-conference-asphalt-texture-usa-creative-basketball-club-phoenix-suns-logo.jpg",
  "https://w0.peakpx.com/wallpaper/768/989/HD-wallpaper-los-angeles-lakers-american-basketball-team-purple-stone-background-los-angeles-lakers-logo-grunge-art-nba-basketball-usa-los-angeles-lakers-emblem.jpg",
  "https://i.pinimg.com/736x/24/92/35/2492350409c53ba0208d7a6bdb39857e.jpg",
  "https://i.pinimg.com/564x/bb/7a/34/bb7a3494e0d190ba57fc4785e3cda1f9.jpg",
];

const TeamLogoSlider = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const delay = 3000;

  useEffect(() => {
    if (isHovered) return;
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  const handlePrevClick = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div 
      className="slideshow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className="arrow left-arrow" 
        aria-label="Previous slide" 
        onClick={handlePrevClick}
      >
        &#10094;
      </button>
      <div
        className="slideshowSlider"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {images.map((image, i) => (
          <div key={i} className="slide">
            <img className="img" src={image} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
      <button 
        className="arrow right-arrow" 
        aria-label="Next slide" 
        onClick={handleNextClick}
      >
        &#10095;
      </button>
      <div className="btns">
        {images.map((_, id) => (
          <div
            key={id}
            className={`btn${index === id ? " active" : ""}`}
            onClick={() => setIndex(id)}
            aria-label={`Slide ${id + 1}`}
            role="button"
            tabIndex={0}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TeamLogoSlider;
