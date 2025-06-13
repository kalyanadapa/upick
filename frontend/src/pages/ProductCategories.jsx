//  import React, {useEffect} from 'react';
// import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useGetCurrentUserQuery } from '../redux/api/usersApiSlice';
// import { useSelector } from 'react-redux';
// const categories = [
//   { name: 'Men', image: 'https://img.freepik.com/free-photo/photo-attractive-smiling-man-with-trendy-hairstyle-positive-look-dressed-fashionable-festive-outfit-stands-against-pink-wall_273609-23540.jpg?semt=ais_hybrid', link: 'men' },
//   { name: 'Women', image: 'https://jeffersonspeedway.com/wp-content/uploads/2014/01/womens-category.jpg', link: 'women' },
//   { name: 'Kids', image: 'https://img3.exportersindia.com/product_images/bc-full/dir_31/918678/kids-wear-1307344.jpg', link: 'kids' },
//   { name: 'Home & Living', image: 'https://i.etsystatic.com/inv/412c11/2821733010/inv_fullxfull.2821733010_17r3408a.jpg?version=0', link: 'home-living' },
//   { name: 'Beauty', image: 'https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=', link: 'beauty' },
// ];

// export default function ProductCategories() {
//   const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated);
//   const navigate = useNavigate();
//   const { data: user, error:userError, isLoading: userIsLoading } = useGetCurrentUserQuery( null, 
//     {
//       skip: !isAuthenticated, // Skip the query if the user is not authenticated
//     });
//   // console.log("user",user);
//    return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Shop by Category
//       </Typography>
//       <Grid container spacing={4}>
//         {categories.map((category) => (
//           <Grid item xs={12} sm={6} md={4} key={category.name}>
//             <Card
//               onClick={() => navigate(`/category/${category.link}`)}
//               sx={{
//                 cursor: 'pointer',
//                 boxShadow: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%', // Ensure equal height
//                 '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image={category.image}
//                 alt={category.name}
//                 sx={{
//                   objectFit: 'cover',
//                   height: 200, // Fixed height for all images
//                   width: '100%',
//                 }}
//               />
//               <CardContent
//                 sx={{
//                   textAlign: 'center',
//                   flexGrow: 1, // Ensure content area grows to take remaining space
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Typography variant="h6" fontWeight="bold">
//                   {category.name}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// import React from 'react';
// import { Typography, Box } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import { FreeMode } from 'swiper/modules';
// import { Link } from 'react-router-dom'; // ✅ for Vite + React

// const categories = [
//   {
//     name: 'Men',
//     image: 'https://img.freepik.com/free-photo/photo-attractive-smiling-man-with-trendy-hairstyle-positive-look-dressed-fashionable-festive-outfit-stands-against-pink-wall_273609-23540.jpg?semt=ais_hybrid',
//     slug: 'men'
//   },
//   {
//     name: 'Women',
//     image: 'https://jeffersonspeedway.com/wp-content/uploads/2014/01/womens-category.jpg',
//     slug: 'women'
//   },
//   {
//     name: 'Kids',
//     image: 'https://img3.exportersindia.com/product_images/bc-full/dir_31/918678/kids-wear-1307344.jpg',
//     slug: 'kids'
//   },
//   {
//     name: 'Home & Living',
//     image: 'https://i.etsystatic.com/inv/412c11/2821733010/inv_fullxfull.2821733010_17r3408a.jpg?version=0',
//     slug: 'home-living'
//   },
//   {
//     name: 'Beauty',
//     image: 'https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=',
//     slug: 'beauty'
//   },
// ];

// export default function CategoryCarousel() {
//   return (
//     <Box sx={{ px: 4, mt: 6 }}>
//       <Typography variant="h5" fontWeight={700} gutterBottom>
//         Shop by Category
//       </Typography>

//       <Swiper
//         slidesPerView={'auto'}
//         spaceBetween={20}
//         freeMode={true}
//         modules={[FreeMode]}
//         style={{ paddingBottom: '20px' }}
//       >
//         {categories.map((cat, index) => (
//           <SwiperSlide
//             key={index}
//             style={{ width: 120, textAlign: 'center', cursor: 'pointer' }}
//           >
//             <Link to={`/category/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//               <Box>
//                 <Box
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: '50%',
//                     overflow: 'hidden',
//                     backgroundColor: '#f5f5f5',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: 1,
//                     boxShadow: 1,
//                   }}
//                 >
//                   <img
//                     src={cat.image}
//                     alt={cat.name}
//                     loading="lazy"
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   />
//                 </Box>
//                 <Typography variant="body2" fontWeight={500} align="center">
//                   {cat.name}
//                 </Typography>
//               </Box>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Box>
//   );
// }
import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Men',
    image: 'https://img.freepik.com/free-photo/photo-attractive-smiling-man-with-trendy-hairstyle-positive-look-dressed-fashionable-festive-outfit-stands-against-pink-wall_273609-23540.jpg?semt=ais_hybrid',
    slug: 'men',
  },
  {
    name: 'Women',
    image: 'https://jeffersonspeedway.com/wp-content/uploads/2014/01/womens-category.jpg',
    slug: 'women',
  },
  {
    name: 'Kids',
    image: 'https://img3.exportersindia.com/product_images/bc-full/dir_31/918678/kids-wear-1307344.jpg',
    slug: 'kids',
  },
  {
    name: 'Home & Living',
    image: 'https://i.etsystatic.com/inv/412c11/2821733010/inv_fullxfull.2821733010_17r3408a.jpg?version=0',
    slug: 'home-living',
  },
  {
    name: 'Beauty',
    image: 'https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=',
    slug: 'beauty',
  },
];

export default function CategoryCarousel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ px: 2, mt: 6 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Shop by Category
      </Typography>

      <Swiper
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        style={{ paddingBottom: '20px' }}
        breakpoints={{
          0: {
            slidesPerView: 2.2,
          },
          600: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4, 
          },
          900:{
            slidesPerView:categories.length,
          }
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: isMobile ? 120 : 230,
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Link
              to={`/category/${cat.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box>
                <Box
                  sx={{
                    width: isMobile ? 100 : 150,
                    height: isMobile ? 100 : 150,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: 1,
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography variant="body2" fontWeight={500} align="center">
                  {cat.name}
                </Typography>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
