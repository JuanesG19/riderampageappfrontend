import * as React from "react";
import { useTheme } from "@mui/material/styles";
import "./ImageSliderStyles.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import image1 from "../../utils/images/slider/1.jpg";
import image2 from "../../utils/images/slider/2.jpg";
import image3 from "../../utils/images/slider/4.png";
import image4 from "../../utils/images/slider/5.jpg";
import image5 from "../../utils/images/slider/6.jpg";
import { Typography } from "@mui/material";

function SwipeableTextMobileStepper() {
  return (
    <div className="sliderBackground">
      {/* <Typography variant="h4" sx={{ mt: 3, mb: 2 }} className="formTitle">
        NUESTROS PATROCINADORES
      </Typography> */}

      <Swiper
        slidesPerView={8}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <img src={image2} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image1} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image3} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image4} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image5} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image2} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image4} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image5} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src={image2} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SwipeableTextMobileStepper;
