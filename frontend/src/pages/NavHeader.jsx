/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Badge, InputBase,Button, AppBar, Toolbar, Container ,Box} from '@mui/material';
import { Search, Person, Favorite, ShoppingBag } from '@mui/icons-material';
import SignUpModal from './SignUp.jsx'
import { Link } from 'react-router';
import Logo from './Logo.jsx';
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation , useGetCurrentUserQuery} from "../redux/api/usersApiSlice.js";
import { setCartCount, setCredentials } from "../redux/features/auth/authSlice";
import { toast } from 'react-hot-toast';
import LogOutModal from "./LogOut.jsx"
import { openLoginModal } from '../redux/features/auth/authSlice';
export default function Header({categories}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false); 
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hovered, setHovered]= useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [redirectPath, setRedirectPath] = useState(null); 
  const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated);
  const cartCount = useSelector((state)=>state.auth.cartCount)
  //console.log("userinfo",isAuthenticated);
  console.log("infor",isAuthenticated && userInfo?.data?.user?.isAdmin );
  // eslint-disable-next-line no-unused-vars
  const [register, { isLoading:isRegister }] = useRegisterMutation();
  const { data: userData, error:userError, isLoading: userIsLoading } = useGetCurrentUserQuery( null, 
    {
      skip: !isAuthenticated, // Skip the query if the user is not authenticated
    });
  
  
  useEffect(()=>{
    if(userData) dispatch(setCartCount(userData.data.cartCount))
  },[userData,dispatch])
    
  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      navigate(redirectPath === "bag" ? "/cart" : "/wishlist");
      setRedirectPath(null); // Clear the stored path after navigation
    }
  }, [isAuthenticated, redirectPath, navigate]);
  
  const handleSignUp = async (formData) => {
    try {
      // Creating a FormData object for file uploads
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("username", formData.username);
      form.append("password", formData.password);
  
      // Append avatar and cover image if available
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }
      if (formData.coverImage) {
        form.append("coverImage", formData.coverImage);
      }
      const response = await register(form).unwrap(); // Use unwrap() to get the raw response
      console.log("User registered successfully:", response);
      dispatch(setCredentials({ ...response }));
      // Handle successful response
      console.log("User registered successfully:", response.data);
      toast.success("User successfully registered");
    
      setIsModalOpen(false)
      // Clear form data after successful registration
      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
        avatar: null,
        coverImage: null,
      });
    } catch (error) {
      // Handle error
      console.error("Registration error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred during registration");
    }
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  }
  const handleBagOpen = (value) => {
    if (isAuthenticated) {
      // If user is authenticated, navigate immediately
      navigate(value === "bag" ? "/cart" : "/wishlist");
    } else {
      // Store the clicked path and open login modal
      setRedirectPath(value);
      dispatch(openLoginModal());
    }
  };
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white!important', boxShadow: 2 , overflow:'visible'}} className="z-50">
      <Container maxWidth="xl" sx={{ mx: 1, p: 0 }}>
        <Toolbar className="flex justify-between items-center ">
        
          {/* Logo */}
          <SignUpModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSubmit={handleSignUp}
        isLoading ={isRegister }
      />
      <LogOutModal open={openDialog} handleClose={handleClose}/>
          <div className="flex-shrink-0">
     <Logo/>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 relative ">
          {categories?.map((category) => (
  <div
    key={category._id}
    className={`relative border-b-2 py-6 ${hoveredLink === category.name ? ' border-pink-700' : ''}`}
    onMouseEnter={() => {handleMouseEnter(category.name)}}
    onMouseLeave={handleMouseLeave}
  >
    <Link
      to={`/category/${category.name.toLowerCase()}`}  // Use the category name here for navigation
      className={`text-gray-700 hover:text-gray-900 px-3 py-2  text-sm font-medium 
        `}
        onClick={()=>setHoveredLink(null)}
    >  
      {category.name.toUpperCase().replace('-', ' & ')}
    </Link>
    {/* {hoveredLink === category.name && (
      <div className="absolute left-0 top-full w-48 bg-white mt-1  shadow-lg rounded-md p-4 ">
        {category.subcategories.map((subcategory) => (
          <Link
            key={subcategory._id}
            to={`/category/${category.name.toLowerCase()}?sub_category=${subcategory._id}`}  // Link to the subcategory
            className="block text-gray-700 hover:text-gray-900 px-3 py-1 text-sm"
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    )} */}
    {hoveredLink === category.name && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="absolute left-0 top-full mt-1 w-56 bg-white shadow-xl rounded-lg z-50 border border-gray-100"
  >
    {/* Arrow Pointer */}
    {/* <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div> */}

    {/* Subcategory links */}
    {category.subcategories.map((subcategory) => (
      <Link
        key={subcategory._id}
        to={`/category/${category.name.toLowerCase()}?sub_category=${subcategory._id}`}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-200 rounded-md"
      >
        {subcategory.name}
      </Link>
    ))}
  </motion.div>
)}

  </div>
))}

</nav>


          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md">
              <Search className="text-gray-400 mr-2" />
              <InputBase
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm"
                sx={{
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
          <div className="relative">
          <Box
            onClick={() => setHovered(true)}
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex flex-col items-center">
              <Person className="h-6 w-6"  />
              <span className="text-xs mt-1">Profile</span>
            </div>
          </Box>
          {hovered && (
            <div
              className="absolute right-0 -left-[89px] mt-0 w-50 bg-white shadow-lg rounded-md p-4  z-50 text-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {isAuthenticated ? (<>
                <Button  className="text-blue-500 hover:underline">My Account</Button>
                <Button  className="text-blue-500 hover:underline"   onClick={handleClickOpen} >Log out</Button>
              </> ):<>
              <p className="text-gray-700 text-sm font-medium">
                Welcome to Upick
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Please<Button onClick={() => dispatch(openLoginModal())} className="text-blue-500 hover:underline">Sign In</Button> / 
                <Button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:underline">Sign Up</Button>
              </p>
              </>}
             
            </div>
          )}
        </div>
        {isAuthenticated && userInfo?.data?.user?.isAdmin ?(<><Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center cursor-pointer">
                <Badge badgeContent={0} color="error">
                  <ShoppingBag className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Dashboard</span>
              </div>
            </Link></>): (<> <span onClick={()=>handleBagOpen("wishlist")} className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center cursor-pointer">
                <Badge badgeContent={0} color="error">
                  <Favorite className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Wishlist</span>
              </div>
            </span>
            <span onClick={()=>handleBagOpen("bag")} className="cursor-pointer text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingBag className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Bag</span>
              </div>
            </span></>)}
           
          </div>
        </Toolbar>
      </Container>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <Search className="text-gray-400 mr-2" />
          <InputBase
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm"
            sx={{
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  color: '#9CA3AF',
                },
              },
            }}
          />
        </div>
      </div>
    </AppBar>
  );
}
