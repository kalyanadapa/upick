// const CategoryForm = ({
//   value,
//   setValue,
//   handleSubmit,
//   buttonText = "Submit",
//   handleDelete,
// }) => {
//   return (
//     <div className="p-3">
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           className="py-3 px-4 border rounded-lg w-full"
//           placeholder="Write category name"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />

//         <div className="flex justify-between">
//           <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
//             {buttonText}
//           </button>

//           {handleDelete && (
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CategoryForm;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
// eslint-disable-next-line react/prop-types
const CategoryForm = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required!");
      return;
    }

    // Send data to parent
    handleSubmit({ name, subcategories: subcategories.map((sub) => sub.trim()) });

    // Clear fields after submission
    setName("");
    setSubcategories([]);
  };

  return (
    <Paper  sx={{
      backgroundColor: 'rgb(239, 248, 255)', // background color fallback
      background: 'linear-gradient(-70deg, #202020, #000000)', // gradient overlay
    }} elevation={3} className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg glass-effect bg-black">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Category</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Category Name Input */}
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          required
          value={name}
          
          onChange={(e) => setName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'red', // Border color when input is focused
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Label color
              '&.Mui-focused': {
                color: 'red', // Label color when input is focused
              },
            },
          }}

          className="bg-gray-50"
        />

        {/* Subcategories Input */}
        <TextField
          label="Subcategories (comma separated)"
          variant="outlined"
          fullWidth
          value={subcategories.join(", ")}
          onChange={(e) => setSubcategories(e.target.value.split(","))}
          className="bg-gray-50"
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" variant="contained" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
            Create Category
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default CategoryForm;
