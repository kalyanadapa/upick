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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


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
      </Box>
    </Modal>
  );
};

export default LoginModal;
