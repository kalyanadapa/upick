import React, { useState } from "react";
import axios from "axios";
import { Container, Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import AdminMenu from "./AdminMenu";

const CreateBrandForm = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));
  const handleLogoRemove = () => setLogo(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logo || !description) {
      setError("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo);
    formData.append("description", description);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/brands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        setLoading(false);
        // window.location.href = "/brands"; // Redirect after success
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" flex flex-col md:flex-row my-2">
      <AdminMenu />
   
        <Box
          sx={{
            width: "100%",
            maxWidth:"580px",
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
            p:3,
            boxShadow: 3,
            textAlign: "center",
            margin:'0 auto'
          }}
        >
          <Typography variant="h5" sx={{ color: "black", marginBottom: "20px" }}>
            Create Brand
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: "10px" }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {/* Brand Name */}
            <TextField
              fullWidth
              label="Brand Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              sx={{ marginBottom: "20px" }}
              required
            />

            {/* Image Upload */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
                border: "1px dashed #ccc",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {logo ? (
                <Box sx={{ position: "relative" }}>
                  <img
                    src={logo}
                    alt="Brand Logo"
                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                  <IconButton
                    onClick={handleLogoRemove}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "red",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ marginBottom: "10px" }}
                >
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoChange}
                    required
                  />
                </Button>
              )}
            </Box>

            {/* Brand Description */}
            <TextField
              fullWidth
              label="Brand Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              sx={{ marginBottom: "20px" }}
              required
            />

            {/* Submit Button */}
            <Button
  type="submit"
  sx={{
    marginLeft: '5px',
    padding: '12px', // consistent padding
    background: 'linear-gradient(45deg, #ff3ed5d1, #ff9900)', // gradient background
    color: 'white', // text color
    borderRadius: '8px', // rounded corners
    fontWeight: 'bold', // bold text
    transition: '0.3s', // transition effect
    fontSize: '16px', // font size
    '&:hover': {
      background: 'linear-gradient(45deg, #ff9900, #ff6600)', // hover gradient
      transform: 'scale(1.05)', // scale on hover
    },
  }}
  disabled={loading}
>
  {loading ? (
    <div className="spinner-border spinner-border-sm" role="status"></div>
  ) : (
    "Create Brand"
  )}
</Button>

          </form>
        </Box>
    
    </div>
  );
};

export default CreateBrandForm;
