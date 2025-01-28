import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import {  Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation"; // Navigation styles
import 'swiper/css/autoplay'; 
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // Fixed import
import ProductCategories from "./ProductCategories";

const images = [
  "https://res.cloudinary.com/dh0xxfq9y/image/upload/v1737971057/men_docgda.webp",
  "https://res.cloudinary.com/dh0xxfq9y/image/upload/v1737971056/ttclq_pgqnux.webp",
  "https://res.cloudinary.com/dh0xxfq9y/image/upload/v1737971056/cliq1_sdcdtq.webp",
];

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
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )} */}
     <SwiperCarousel images= { images}/>
     <ProductCategories/>
    </>
  );
};

export default Home;
