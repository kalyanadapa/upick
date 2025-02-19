import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Button, TextField, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, CircularProgress } from "@mui/material";
import { useGetProductsByCategoryQuery } from "../redux/api/productApiSlice";
import ProductCard from "./Products/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // const { data: products, isError } = useAllProductsQuery();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { data: categories, isLoading } = useFetchCategoriesQuery();

  // State for selected category
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCat, setSelectedCat] = useState({})
   // State for selected subcategories
   const [selectedSubCategories, setSelectedSubCategories] = useState([]);
   // State for price filter
   const [priceFilter, setPriceFilter] = useState("");
   // Get subcategory ID from query params
   const queryParams = new URLSearchParams(search);
   const subCategoryId = queryParams.get("sub_category");
  useEffect(() => {
    if (categoryName&& categories?.data) {
      // Check if the category exists in the fetched categories
      const category = categories?.data?.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
       console.log("cagi",category);
       
       
      if (category) {
        setSelectedCategory(category.name); // Set the selected category
        setSelectedCat(category)
      } else {
        setSelectedCat({})
        setSelectedCategory(""); // No category found
      }
    }
  }, [categories, categoryName]);
  useEffect(() => {
    const subCategoriesFromURL = searchParams.getAll("sub_category"); // Get multiple subcategories
    setSelectedSubCategories(subCategoriesFromURL);
  }, [searchParams]);
 


  useEffect(() => {
    if (subCategoryId) {
      setSelectedSubCategories([subCategoryId]); // Pre-select subcategory from URL
    }
  }, [subCategoryId]);
  const { data: products, isError, isFetching,refetch } = useGetProductsByCategoryQuery(
    { categoryId: selectedCat._id, subCategoryIds: selectedSubCategories }, 
    { skip: !selectedCat._id }
  );
useEffect(() => {
  if (selectedCat._id) {
    refetch();
  }
}, [selectedCat, refetch]);
  // Find the selected category in the API data
  const selectedCategoryData = categories?.data?.find((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase());
console.log("selected",selectedCategory);
// useEffect(() => {
//   const getAll = async () => {
//     try {
//       const categoryId = selectedCat._id; // or get it from state, depending on how your app is structured

//       // Make the API call with categoryId
//       const response = await axios.get(`http://localhost:8000/api/v1/product/all_products?category=${categoryId}`);
// console.log("resp",response);

//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   if (categoryName) {
//     getAll();
//   }
// }, [selectedCat])
  // Get subcategories of the selected category
  const availableSubCategories = selectedCategoryData ? selectedCategoryData.subcategories : [];
 
  
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setSelectedSubCategories([]); // Reset subcategories when category changes
    navigate(`/category/${newCategory.toLowerCase()}`);
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (event) => {
    const subCategoryId = event.target.value;
    const updatedSubCategories = event.target.checked
      ? [...selectedSubCategories, subCategoryId]
      : selectedSubCategories.filter((id) => id !== subCategoryId);

    setSelectedSubCategories(updatedSubCategories);

    // Update query params
    const params = new URLSearchParams();
    updatedSubCategories.forEach((id) => params.append("sub_category", id));
    setSearchParams(params);
  };


  // Log selections to the console
 useEffect(()=>{
  console.log("selected subcategories",selectedSubCategories)
 },[selectedSubCategories])
  return (
<Box sx={{ display: 'flex' , p:3, position:'relative'}}>
  {/* Left Side: Filters */}
  {(isLoading || isFetching) && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          backdropFilter: "blur(5px)", // Blur effect
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999, // Ensure it's on top
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    )}
  <Box className="bg-[#151515] p-3 mt-2 mb-2" sx={{
  position: 'sticky',
  top: 85,
  width: '17vw',
  maxHeight: '83vh', // Keeps the left side fixed at 100vh height
  overflowY: 'auto',  // Allow scrolling if needed within the filter section
  paddingRight: 2,

  '::-webkit-scrollbar': {
    width: '2px',  // Thin scrollbar
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(227, 45, 146, 0.8)',  // Color of the scrollbar thumb
    borderRadius: '4px',  // Rounded corners for the thumb
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',  // Track color (background)
  }
}}>
    {/* Category Selection (Radio Buttons) */}
    <Typography variant="h6" sx={{fontSize:'16px', background:"black", textAlign:'center', p:1.5}} className="rounded-full" gutterBottom>Filter by Categories</Typography>
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
    <Typography variant="h6" sx={{fontSize:'16px', background:"black", textAlign:'center', p:1.5}} className="rounded-full" gutterBottom>Filter by Subcategories</Typography>
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
    <Typography variant="h6" sx={{fontSize:'16px', background:"black", textAlign:'center', p:1.5}} className="rounded-full" gutterBottom>Filter by Price</Typography>
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
    overflowY: 'hidden', // Only this section will scroll when content exceeds
    paddingLeft: 4,
    display: 'flex',
    flexDirection: 'column',
  }}>
    <Typography variant="h4" gutterBottom>{selectedCategoryData?.name || "All Categories"} Category</Typography>

    {isFetching ? (
        <Typography>Loading products...</Typography>
      ) : isError ? (
        <Typography>Error fetching products.</Typography>
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
