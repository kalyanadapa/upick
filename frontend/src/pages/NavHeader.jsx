
import axios from 'axios';
import { useState } from 'react';
import { Badge, InputBase,Button, AppBar, Toolbar, Container ,Box} from '@mui/material';
import { Search, Person, Favorite, ShoppingBag } from '@mui/icons-material';
import SignUpModal from './SignUp.jsx'
import { Link } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation , useLoginMutation} from "../redux/api/usersApiSlice.js";
import { setCredentials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import LoginModal from "./Login.jsx"
export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hovered, setHovered]= useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userinfo",userInfo.data.user);
  
  // eslint-disable-next-line no-unused-vars
  const [register, { isLoading:isRegister }] = useRegisterMutation();
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const categories = {
    men: ['T-Shirts', 'Shirts', 'Jeans', 'Shoes'],
    women: ['Dresses', 'Tops', 'Handbags', 'Shoes'],
    kids: ['Toys', 'Clothing', 'Shoes', 'Accessories'],
    'home-living': ['Bedsheets', 'Cushions', 'Furniture', 'Decor'],
    beauty: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
  };
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
  const handleLogin = async (formData)=>{
    console.log("formdata login",formData);
    const loginData = {
      password: formData.password,
    };

    // Dynamically determine whether input is an email or username
    if (formData.identifier.includes("@")) {
      loginData.email = formData.identifier; // Email case
    } else {
      loginData.username = formData.identifier; // Username case
    }
    const response = await login(loginData).unwrap();
    dispatch(setCredentials({ ...response }));
    // const response = await axios.post(
    //   "http://localhost:8000/api/v1/users/login",
    //   loginData,
    //   { withCredentials: true } // Ensures cookies are sent
    // );
    console.log("Login Successful:", response.data);
  }
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
  
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white!important', boxShadow: 2 , overflow:'visible'}} className="z-50">
      <Container maxWidth="xl" sx={{ mx: 1, p: 0 }}>
        <Toolbar className="flex justify-between items-center py-4">
          <LoginModal isLoad={isLoading} open={open} handleClose={() => setOpen(false)}  onSubmit={handleLogin}/>
          {/* Logo */}
          <SignUpModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSubmit={handleSignUp}
        isLoading ={isRegister }
      />
          <div className="flex-shrink-0">
          <Link
        to={"/"}  // Use Link here for navigation
       className="flex items-center"
      >
            
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-700 to-orange-500 text-transparent bg-clip-text">
                Upick
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
  {Object.keys(categories).map((link) => (
    <div
      key={link}
      className="relative"
      onMouseEnter={() => handleMouseEnter(link)}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/category/${link}`}  // Use Link here for navigation
        className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
      >
        {link.toUpperCase().replace('-', ' & ')}
      </Link>
      {hoveredLink === link && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md p-4">
          {categories[link].map((category) => (
            <Link
              key={category}
              to={`/${link}/${category.toLowerCase()}`}  // Use Link here as well
              className="block text-gray-700 hover:text-gray-900 px-3 py-1 text-sm"
            >
              {category}
            </Link>
          ))}
        </div>
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
            className="text-gray-700 hover:text-gray-900 "
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
              <p className="text-gray-700 text-sm font-medium">
                Welcome to Upick
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Please<Button onClick={() => setOpen(true)} className="text-blue-500 hover:underline">Sign In</Button> / 
                <Button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:underline">Sign Up</Button>
              </p>
            </div>
          )}
        </div>
            <a href="/wishlist" className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center">
                <Badge badgeContent={0} color="error">
                  <Favorite className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Wishlist</span>
              </div>
            </a>
            <a href="/bag" className="text-gray-700 hover:text-gray-900">
              <div className="flex flex-col items-center">
                <Badge badgeContent={0} color="error">
                  <ShoppingBag className="h-6 w-6" />
                </Badge>
                <span className="text-xs mt-1">Bag</span>
              </div>
            </a>
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
