

// import React, { useState } from "react";
// import { TextField, Button, Paper } from "@mui/material";

// // eslint-disable-next-line react/prop-types
// const CategoryForm = ({ handleSubmit }) => {
//   const [name, setName] = useState("");
//   const [subcategories, setSubcategories] = useState(""); // We will store the input as a string to split into objects

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       alert("Category name is required!");
//       return;
//     }

//     // Split the subcategories string into an array and map them to objects
//     const subcategoryObjects = subcategories
//       .split(",")
//       .map((sub) => sub.trim())
//       .filter((sub) => sub); // Filter out empty strings

//     // Create the category object
//     const categoryData = {
//       name,
//       subcategories: subcategoryObjects.map((name) => ({ name })),
//     };

//     // Send data to parent
//     handleSubmit(categoryData);

//     // Clear fields after submission
//     setName("");
//     setSubcategories("");
//   };

//   return (
//     <Paper
//       sx={{
//         backgroundColor: "rgb(239, 248, 255)", // background color fallback
//         background: "linear-gradient(-70deg, #202020, #000000)", // gradient overlay
//       }}
//       elevation={3}
//       className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg glass-effect bg-black"
//     >
//       <h2 className="text-xl font-semibold mb-4 text-center">Create Category</h2>

//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* Category Name Input */}
//         <TextField
//           label="Category Name"
//           variant="outlined"
//           fullWidth
//           required
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               "&.Mui-focused fieldset": {
//                 borderColor: "red", // Border color when input is focused
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: "black", // Label color
//               "&.Mui-focused": {
//                 color: "red", // Label color when input is focused
//               },
//             },
//           }}
//           className="bg-gray-50"
//         />

//         {/* Subcategories Input */}
//         <TextField
//           label="Subcategories (comma separated)"
//           variant="outlined"
//           fullWidth
//           value={subcategories}
//           onChange={(e) => setSubcategories(e.target.value)}
//           className="bg-gray-50"
//         />

//         {/* Submit Button */}
//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             variant="contained"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
//           >
//             Create Category
//           </Button>
//         </div>
//       </form>
//     </Paper>
//   );
// };

// export default CategoryForm;









import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

const CategoryForm = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Category name is required!");
      return;
    }

    const subcategoryObjects = subcategories
      .split(",")
      .map((sub) => sub.trim())
      .filter((sub) => sub);

    const categoryData = {
      name,
      subcategories: subcategoryObjects.map((name) => ({ name })),
    };

    handleSubmit(categoryData);
    setName("");
    setSubcategories("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center" 
      sx={{
        background: "linear-gradient(135deg, #2b5876, #4e4376)", // Gradient background
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 500,
          borderRadius: 3,
          backdropFilter: "blur(10px)", // Glassmorphism effect
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background
          color: "#fff",
          textAlign: "center",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textTransform: "uppercase", letterSpacing: 1 , mb:2.5}}
        >
          Create Category
        </Typography>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Category Name Input */}
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#ffcc00" },
                "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
              },
            }}
          />

          {/* Subcategories Input */}
          <TextField
            label="Subcategories (comma separated)"
            variant="outlined"
            fullWidth
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#ffcc00" },
                "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(45deg, #ff3ed5d1, #ff9900)",
              color: "#333",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #ff9900, #ff3ed5d1)",
                transform: "scale(1.05)",
              },
            }}
          >
            Create Category
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CategoryForm;
