// import React from 'react';
// import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const categories = [
//   { name: 'Men', image: 'https://img.freepik.com/free-photo/photo-attractive-smiling-man-with-trendy-hairstyle-positive-look-dressed-fashionable-festive-outfit-stands-against-pink-wall_273609-23540.jpg?semt=ais_hybrid', link: '/men' },
//   { name: 'Women', image: 'https://jeffersonspeedway.com/wp-content/uploads/2014/01/womens-category.jpg', link: '/women' },
//   { name: 'Kids', image: 'https://img3.exportersindia.com/product_images/bc-full/dir_31/918678/kids-wear-1307344.jpg', link: '/kids' },
//   { name: 'Home & Living', image: 'https://i.etsystatic.com/inv/412c11/2821733010/inv_fullxfull.2821733010_17r3408a.jpg?version=0', link: '/home-living' },
//   { name: 'Beauty', image: 'https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=', link: '/beauty' },
// ];

// export default function ProductCategories() {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Shop by Category
//       </Typography>
//       <Grid container spacing={4}>
//         {categories.map((category) => (
//           <Grid item xs={12} sm={6} md={4} key={category.name}>
//             <Card
//               onClick={() => navigate(category.link)}
//               sx={{
//                 cursor: 'pointer',
//                 boxShadow: 2,
//                 '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={category.image}
//                 alt={category.name}
//                 sx={{ objectFit: 'cover' }}
//               />
//               <CardContent sx={{ textAlign: 'center' }}>
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
import React, {useEffect} from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../redux/api/usersApiSlice';
import { useSelector } from 'react-redux';
const categories = [
  { name: 'Men', image: 'https://img.freepik.com/free-photo/photo-attractive-smiling-man-with-trendy-hairstyle-positive-look-dressed-fashionable-festive-outfit-stands-against-pink-wall_273609-23540.jpg?semt=ais_hybrid', link: 'men' },
  { name: 'Women', image: 'https://jeffersonspeedway.com/wp-content/uploads/2014/01/womens-category.jpg', link: 'women' },
  { name: 'Kids', image: 'https://img3.exportersindia.com/product_images/bc-full/dir_31/918678/kids-wear-1307344.jpg', link: 'kids' },
  { name: 'Home & Living', image: 'https://i.etsystatic.com/inv/412c11/2821733010/inv_fullxfull.2821733010_17r3408a.jpg?version=0', link: 'home-living' },
  { name: 'Beauty', image: 'https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=', link: 'beauty' },
];

export default function ProductCategories() {
  const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated);
  const navigate = useNavigate();
  const { data: user, error:userError, isLoading: userIsLoading } = useGetCurrentUserQuery( null, 
    {
      skip: !isAuthenticated, // Skip the query if the user is not authenticated
    });
  // console.log("user",user);
  // useEffect(() => {
  //   // Function to fetch the current user, including access token in cookies
  //   const getCurrentUser = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/api/v1/users/current-user', {
  //         method: 'GET',
  //         credentials: 'include',  // Automatically includes cookies (including accessToken)
  //       });

  //       if (!response.ok) {
  //         // If response is not OK (e.g., status 401, 500), handle the error
  //         if (response.status === 401) {
  //           // Handle unauthorized, e.g., logout or redirect to login
  //           console.log("Unauthorized. Please log in.");
  //           // Optionally clear localStorage or trigger a logout action
  //           // localStorage.removeItem('userInfo');
  //           // window.location.href = '/login';  // Redirect to login page
  //         } else {
  //           throw new Error(`Failed to fetch current user: ${response.statusText}`);
  //         }
  //       } else {
  //         const data = await response.json();
  //         console.log("Current user data:", data);  // Handle the returned user data
  //       }
  //     } catch (error) {
  //       console.error('Error:', error.message);  // Log any error that occurs during the fetch
  //     }
  //   };

  //   getCurrentUser();  // Call the function on component mount
  // }, []);  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shop by Category
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.name}>
            <Card
              onClick={() => navigate(`/category/${category.link}`)}
              sx={{
                cursor: 'pointer',
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Ensure equal height
                '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
              }}
            >
              <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{
                  objectFit: 'cover',
                  height: 200, // Fixed height for all images
                  width: '100%',
                }}
              />
              <CardContent
                sx={{
                  textAlign: 'center',
                  flexGrow: 1, // Ensure content area grows to take remaining space
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
