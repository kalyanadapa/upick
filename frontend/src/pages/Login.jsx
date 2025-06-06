// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector,useDispatch } from "react-redux";
import { useRegisterMutation , useLoginMutation} from "../redux/api/usersApiSlice.js";
import Logo from "./Logo";
import { closeLoginModal } from "../redux/features/auth/authSlice";
import { setCredentials , setCartCount } from "../redux/features/auth/authSlice";
import { toast } from 'react-hot-toast';
const LoginModal = ({ }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isError, error:loginError, isSuccess }] = useLoginMutation();
  const [error, setError] = useState(null);
  const { isLoginModalOpen } = useSelector((state) => state.auth); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (formData) => {
    console.log("formdata login", formData);
    const loginData = {
      password: formData.password,
    };

    // Dynamically determine whether input is an email or username
    if (formData.identifier.includes("@")) {
      loginData.email = formData.identifier; // Email case
    } else {
      loginData.username = formData.identifier; // Username case
    }

    try {
      const response = await login(loginData).unwrap();
      if (response.statusCode === 200) {
        toast.success('User Logged in Successfully!', {
          duration: 2500,   // Duration of the toast
          position: 'top-right',  // Position of the toast
          style: {
            background: '#333',
            color: '#fff',
            fontWeight: 'bold',
          },
        });
        dispatch(setCartCount(response?.data?.cartCount|| 0))
        dispatch(closeLoginModal());
        setError(null)
        dispatch(setCredentials({ ...response }));
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "An error occurred while logging in");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("triggered");
    
    setError(null); 
    try {
      
           await handleLogin(formData);
          
      // Close modal on success
    } catch (err) {
        setError(err); 
      console.error("Login Error:", err);
    }
  };

  return (
    <Modal open={isLoginModalOpen} onClose={() => {
      dispatch(closeLoginModal());
      setError(null); // Reset error state when modal is closed
    }}
    >
    
      <Box
        className="bg-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto mt-20 max-h-[85vh] overflow-y-auto custom-scrollbar"
        style={{ outline: "none" }}
      >
         <Box sx={{display:"flex", alignItems:'center', justifyContent:'center'}}><Logo/></Box> 
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <TextField
            name="identifier"
            label="Email or Username"
            variant="outlined"
            fullWidth
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && <p className="text-red-500 text-sm">{error?.data?.message || "Login failed"}</p>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 text-white hover:bg-blue-600"
            // disabled={isLoading}
          >
           
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
   
      <Typography variant="h6" sx={{display:'flex', alignItems:'center', justifyContent:'center', pt:3}}>
        <span style={{  color: '#000',  }}>
          New User ?
        </span> { "  "}
        <Button
      type="submit"
      sx={{
        marginLeft:'5px',
        padding: '12px', // same as py-3
        background: 'linear-gradient(45deg, #ff3ed5d1, #ff9900)', // gradient background
        color: 'white', // text color
        borderRadius: '8px', // rounded corners
        fontWeight: 'bold', // bold text
        transition: '0.3s', // transition effect
        '&:hover': {
          background: 'linear-gradient(45deg, #ff9900, #ff6600)', // hover gradient
          transform: 'scale(1.05)', // scale on hover
        },
      }}
    >
    Sign Up
    </Button>
      </Typography>
      
  
      </Box>
    </Modal>
  );
};

export default LoginModal;
