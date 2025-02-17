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
import Logo from "./Logo";


const LoginModal = ({isLoad, open, handleClose,onSubmit }) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
        if (onSubmit) {
           await onSubmit(formData);
          }
      handleClose(); // Close modal on success
    } catch (err) {
        setError(err); 
      console.error("Login Error:", err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
    
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
           
            {isLoad ? <CircularProgress size={24} color="inherit" /> : "Login"}
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
