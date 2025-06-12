/* eslint-disable react/prop-types */
// import {  useParams } from "react-router-dom";

import { motion } from "framer-motion";
import {  Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation"; // Navigation styles
import 'swiper/swiper-bundle.css'
import 'swiper/css/autoplay'; 
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // Fixed import
import ProductCategories from "./ProductCategories";

const images = [
  "v1737971057/men_docgda.webp",
  "v1737971056/ttclq_pgqnux.webp",
  "v1737971056/cliq1_sdcdtq.webp",
];
const cloudinaryUrl="https://res.cloudinary.com/dh0xxfq9y/image/upload/"
// eslint-disable-next-line react/prop-types
const SwiperCarousel = ({ images }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[60vh]"
      autoplay={{
        delay: 3000, // Time in milliseconds (3000ms = 3 seconds)
        disableOnInteraction: false, // Keeps autoplay going even after user interacts
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={`${cloudinaryUrl}${image}`} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


const Home = () => {
  // const { keyword } = useParams();
  // const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
  
     <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <SwiperCarousel images={images} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10"
      >
        <ProductCategories />
      </motion.div>
    </>
  );
};

export default Home;
