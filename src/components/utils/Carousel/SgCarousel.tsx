import React from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Estilos del carrusel
import { Typography } from '@mui/material';
import { Environment } from '../../../utils/env/Environment';
const env = new Environment();

interface SgCarouselProps {
  data: any[];
}

export const SgCarousel = (props: SgCarouselProps) => {
  const { data } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Carousel
      autoPlay={true}
      interval={5000}
      infiniteLoop={true}
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      selectedItem={currentSlide}
      onChange={handleSlideChange}
      animationHandler="fade"
      autoFocus
      emulateTouch
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-banner-turn p-1 flex flex-col items-center"
        >
          <span className={item.photo ? 'hidden' : ''}>
            <Typography variant="h5">{item.name}</Typography>
            <Typography variant="body1">{item.description}</Typography>
          </span>
          <span className="w-full flex justify-center">
            <img
              src={`${env.basePatch}/banners/${item.photo}`}
              alt="Logo"
              className="image-30vh"
            />
          </span>
        </div>
      ))}
    </Carousel>
  );
};
