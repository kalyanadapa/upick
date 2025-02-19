// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AiOutlineUpload } from "react-icons/ai";
import Logo from "./Logo";
// eslint-disable-next-line react/prop-types
const SignUpModal = ({isLoading , open, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="bg-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto mt-20 max-h-[85vh] overflow-y-auto custom-scrollbar"
        style={{ outline: "none" }}
      >
          <Box sx={{display:"flex", alignItems:'center', justifyContent:'center'}}><Logo/></Box> 
        <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <TextField
            name="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={formData.username}
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
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        <div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700">Avatar</label>
  <label
    className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
    style={{ backgroundColor: "#f9f9f9" }}
  >
    <AiOutlineUpload className="text-2xl text-blue-500" />
    <span className="text-sm text-gray-600">Upload Avatar</span>
    <input
      type="file"
      name="avatar"
      accept="image/*"
      className="hidden"
      onChange={handleChange}
      required
    />
  </label>
</div>

<div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700">Cover Image</label>
  <label
    className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
    style={{ backgroundColor: "#f9f9f9" }}
  >
    <AiOutlineUpload className="text-2xl text-blue-500" />
    <span className="text-sm text-gray-600">Upload Cover Image</span>
    <input
      type="file"
      name="coverImage"
      accept="image/*"
      className="hidden"
      onChange={handleChange}
    />
  </label>
</div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
          {isLoading ? <CircularProgress/>: "Sign Up"}  
          </Button>
        </form>
        <Typography variant="h6" sx={{display:'flex', alignItems:'center', justifyContent:'center', pt:3}}>
        <span style={{  color: '#000',  }}>
         Already have an account ?
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
   Login
    </Button>
      </Typography>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
