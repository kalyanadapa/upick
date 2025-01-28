// import { useState } from 'react';
// import { Badge, InputBase, AppBar, Toolbar, Container } from '@mui/material';
// import { Search, Person, Favorite, ShoppingBag } from '@mui/icons-material';

// export default function Header() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <AppBar position="sticky"  sx={{ backgroundColor: 'white!important', boxShadow: 2, }} className="z-50">
//       <Container maxWidth="xl" sx={{mx:1,p:0}}>
//         <Toolbar className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="/" className="flex items-center">
//               <span className="text-4xl font-bold bg-gradient-to-r from-pink-700 to-orange-500 text-transparent bg-clip-text">
//                 Upick
//               </span>
//             </a>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <a href="/men" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">MEN</a>
//             <a href="/women" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">WOMEN</a>
//             <a href="/kids" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">KIDS</a>
//             <a href="/home-living" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">HOME & LIVING</a>
//             <a href="/beauty" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">BEAUTY</a>
            
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-lg mx-8">
//             <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md">
//               <Search className="text-gray-400 mr-2" />
//               <InputBase
//                 placeholder="Search for products, brands and more"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full text-sm"
//                 sx={{
//                   '& .MuiInputBase-input': {
//                     '&::placeholder': {
//                       color: '#9CA3AF',
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center space-x-6">
//             <a href="/profile" className="text-gray-700 hover:text-gray-900">
//               <div className="flex flex-col items-center">
//                 <Person className="h-6 w-6" />
//                 <span className="text-xs mt-1">Profile</span>
//               </div>
//             </a>
//             <a href="/wishlist" className="text-gray-700 hover:text-gray-900">
//               <div className="flex flex-col items-center">
//                 <Badge badgeContent={0} color="error">
//                   <Favorite className="h-6 w-6" />
//                 </Badge>
//                 <span className="text-xs mt-1">Wishlist</span>
//               </div>
//             </a>
//             <a href="/bag" className="text-gray-700 hover:text-gray-900">
//               <div className="flex flex-col items-center">
//                 <Badge badgeContent={0} color="error">
//                   <ShoppingBag className="h-6 w-6" />
//                 </Badge>
//                 <span className="text-xs mt-1">Bag</span>
//               </div>
//             </a>
//           </div>
//         </Toolbar>
//       </Container>

//       {/* Mobile Search */}
//       <div className="md:hidden px-4 pb-4">
//         <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md">
//           <Search className="text-gray-400 mr-2" />
//           <InputBase
//             placeholder="Search for products, brands and more"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full text-sm"
//             sx={{
//               '& .MuiInputBase-input': {
//                 '&::placeholder': {
//                   color: '#9CA3AF',
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </AppBar>
//   );
// }
import { useState } from 'react';
import axios from "axios";
import { Badge, InputBase,Button, AppBar, Toolbar, Container } from '@mui/material';
import { Search, Person, Favorite, ShoppingBag } from '@mui/icons-material';
import SignUpModal from './SignUp.jsx'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hovered, setHovered]= useState(false);
  const categories = {
    men: ['T-Shirts', 'Shirts', 'Jeans', 'Shoes'],
    women: ['Dresses', 'Tops', 'Handbags', 'Shoes'],
    kids: ['Toys', 'Clothing', 'Shoes', 'Accessories'],
    'home-living': ['Bedsheets', 'Cushions', 'Furniture', 'Decor'],
    beauty: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
  };
  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
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
  
      // Make API call to backend
      const response = await axios.post("http://localhost:8000/api/v1/users/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle successful response
      console.log("User registered successfully:", response.data);
      alert("User registered successfully!");
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
    <AppBar position="sticky" sx={{ backgroundColor: 'white!important', boxShadow: 2 }} className="z-50">
      <Container maxWidth="xl" sx={{ mx: 1, p: 0 }}>
        <Toolbar className="flex justify-between items-center py-4">
          {/* Logo */}
          <SignUpModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSubmit={handleSignUp}
      
      />
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-700 to-orange-500 text-transparent bg-clip-text">
                Upick
              </span>
            </a>
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
                <a
                  href={`/${link}`}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  {link.toUpperCase().replace('-', ' & ')}
                </a>
                {hoveredLink === link && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md p-4">
                    {categories[link].map((category) => (
                      <a
                        key={category}
                        href={`/${link}/${category.toLowerCase()}`}
                        className="block text-gray-700 hover:text-gray-900 px-3 py-1 text-sm"
                      >
                        {category}
                      </a>
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
          <a
            href="/profile"
            className="text-gray-700 hover:text-gray-900"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex flex-col items-center">
              <Person className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </div>
          </a>
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
                Please <a href="/signin" className="text-blue-500 hover:underline">Sign In</a> / 
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
