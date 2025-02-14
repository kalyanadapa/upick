import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Button, TextField, Typography, Box, List, ListItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox } from "@mui/material";

import { useAllProductsQuery } from "../redux/api/productApiSlice";
import ProductCard from "./Products/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { data: products, isError } = useAllProductsQuery();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { data: categories, isLoading } = useFetchCategoriesQuery();

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "");
  // State for selected subcategories
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  // State for price filter
  const [priceFilter, setPriceFilter] = useState("");

  // Get subcategory ID from query params
  const queryParams = new URLSearchParams(search);
  const subCategoryId = queryParams.get("sub_category");

  useEffect(() => {
    if (subCategoryId) {
      setSelectedSubCategories([subCategoryId]); // Pre-select subcategory from URL
    }
  }, [subCategoryId]);

  // Find the selected category in the API data
  const selectedCategoryData = categories?.data?.find((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase());

  // Get subcategories of the selected category
  const availableSubCategories = selectedCategoryData ? selectedCategoryData.subcategories : [];

  // Handle category selection
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setSelectedSubCategories([]); // Reset subcategories when category changes
    navigate(`/category/${newCategory.toLowerCase()}`);
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (event) => {
    const subCategoryId = event.target.value;
    setSelectedSubCategories((prevSelected) =>
      event.target.checked ? [...prevSelected, subCategoryId] : prevSelected.filter((id) => id !== subCategoryId)
    );
  };

  // Log selections to the console
  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Subcategories:", selectedSubCategories);
  }, [selectedCategory, selectedSubCategories]);

  return (
//     <Box className="container mx-auto p-6">
//       <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Side: Filters */}
//         <Box>
//           {/* Category Selection (Radio Buttons) */}
//           <Typography variant="h6" gutterBottom>Categories</Typography>
//           <FormControl component="fieldset">
//   <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
//     {categories?.data?.map((category) => (
//       <FormControlLabel
//         key={category.id}
//         value={category.name}
//         control={
//           <Radio
//             sx={{
//               '&.Mui-checked': {
//                 color: 'rgb(227 45 146)!important',
//               },
//               '&.MuiRadio-root': {
//                 color: 'white', // White color when not checked
//               }
//             }}
//           />
//         }
//         label={category.name}
//         className="cursor-pointer"
//       />
//     ))}
//   </RadioGroup>
// </FormControl>


//           {/* Subcategory Selection (Checkboxes) */}
//           <Typography variant="h6" gutterBottom>Subcategories</Typography>
//           <FormControl component="fieldset">
//   {availableSubCategories.length > 0 ? (
//     availableSubCategories.map((subcategory) => (
//       <FormControlLabel
//         key={subcategory._id}
//         control={
//           <Checkbox
//             checked={selectedSubCategories.includes(subcategory._id)}
//             onChange={handleSubCategoryChange}
//             value={subcategory._id}
//             sx={{
//               '&.Mui-checked': {
//                 color: 'rgb(227 45 146)!important', // Pink color when checked
//               },
//               '&.MuiCheckbox-root': {
//                 color: 'white', // White color when not checked
//               }
//             }}
//           />
//         }
//         label={subcategory.name}
//       />
//     ))
//   ) : (
//     <Typography variant="body2" color="textSecondary">No subcategories available</Typography>
//   )}
// </FormControl>

//           {/* Price filter */}
//           <Typography variant="h6" gutterBottom>Filter by Price</Typography>
//           <TextField
//             variant="outlined"
//             type="number"
//             label="Max Price"
//             fullWidth
//             value={priceFilter}
//             onChange={(e) => setPriceFilter(e.target.value)}
//             className="mb-4"
//           />

//           {/* Reset Filters */}
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => {
//               setSelectedCategory("");
//               setSelectedSubCategories([]);
//               setPriceFilter("");
//               navigate("/category");
//             }}
//           >
//             Reset Filters
//           </Button>
//         </Box>

//         {/* Right Side: Products */}
//         <Box className="col-span-2">
//           <Typography variant="h4" gutterBottom>{selectedCategoryData?.name || "All Categories"} Category</Typography>

//           {isLoading ? (
//             <Typography>Loading...</Typography>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {products?.data?.length > 0 ? (
//                 products?.data?.map((product) => <ProductCard key={product._id} product={product} />)
//               ) : (
//                 <p className="text-center col-span-full text-gray-500">No products available</p>
//               )}
//             </div>
//           )}
//         </Box>
//       </Box>
//     </Box>
<Box sx={{ display: 'flex' , p:3}}>
  {/* Left Side: Filters */}
  <Box sx={{
    position: 'sticky',
    top: 85,
    width: '300px',
    maxHeight: '100vh', // Keeps the left side fixed at 100vh height
    overflowY: 'auto',  // Allow scrolling if needed within the filter section
    paddingRight: 2,
  }}>
    {/* Category Selection (Radio Buttons) */}
    <Typography variant="h6" gutterBottom>Categories</Typography>
    <FormControl component="fieldset">
      <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
        {categories?.data?.map((category) => (
          <FormControlLabel
            key={category.id}
            value={category.name}
            control={<Radio sx={{ '&.Mui-checked': { color: 'rgb(227 45 146)!important' }, '&.MuiRadio-root': { color: 'white' } }} />}
            label={category.name}
            className="cursor-pointer"
          />
        ))}
      </RadioGroup>
    </FormControl>

    {/* Subcategory Selection (Checkboxes) */}
    <Typography variant="h6" gutterBottom>Subcategories</Typography>
    <FormControl component="fieldset">
      {availableSubCategories.length > 0 ? (
        availableSubCategories.map((subcategory) => (
          <FormControlLabel
            key={subcategory._id}
            control={<Checkbox checked={selectedSubCategories.includes(subcategory._id)} onChange={handleSubCategoryChange} value={subcategory._id} sx={{ '&.Mui-checked': { color: 'rgb(227 45 146)!important' }, '&.MuiCheckbox-root': { color: 'white' } }} />}
            label={subcategory.name}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">No subcategories available</Typography>
      )}
    </FormControl>

    {/* Price filter */}
    <Typography variant="h6" gutterBottom>Filter by Price</Typography>
    <TextField
      variant="outlined"
      type="number"
      label="Max Price"
      fullWidth
      value={priceFilter}
      onChange={(e) => setPriceFilter(e.target.value)}
      className="mb-4"
    />

    {/* Reset Filters */}
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        setSelectedCategory("");
        setSelectedSubCategories([]);
        setPriceFilter("");
        navigate("/category");
      }}
    >
      Reset Filters
    </Button>
  </Box>

  {/* Right Side: Products */}
  <Box sx={{
    flex: 1, // Takes remaining space
    overflowY: 'auto', // Only this section will scroll when content exceeds
    paddingLeft: 4,
    display: 'flex',
    flexDirection: 'column',
  }}>
    <Typography variant="h4" gutterBottom>{selectedCategoryData?.name || "All Categories"} Category</Typography>

    {isLoading ? (
      <Typography>Loading...</Typography>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
        {products?.data?.length > 0 ? (
          products?.data?.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">No products available</p>
        )}
      </div>
    )}
  </Box>
</Box>




  );
};

export default CategoryPage;
