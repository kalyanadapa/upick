import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Button, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl,Slider,  Checkbox, CircularProgress } from "@mui/material";
import { useGetProductsByCategoryQuery } from "../redux/api/productApiSlice";
import ProductCard from "./Products/ProductCard";
import { useDebounce } from "../Utils/customDebounce";
const CategoryPage = () => {
  const { categoryName } = useParams();
  // const { data: products, isError } = useAllProductsQuery();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { data: categories, isLoading } = useFetchCategoriesQuery();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [priceTouched, setPriceTouched] = useState(false);

  const debouncedPriceRange = useDebounce(priceRange, 800);
  // State for selected category
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCat, setSelectedCat] = useState({})
   // State for selected subcategories
   const [selectedSubCategories, setSelectedSubCategories] = useState([]);
   // State for price filter
  //  const [priceFilter, setPriceFilter] = useState("");
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
  const { data: products, isError, isFetching, refetch } = useGetProductsByCategoryQuery(
    {
      categoryId: selectedCat._id,
      subCategoryIds: selectedSubCategories,
      ...(priceTouched && {
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
      }),
    },
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

  const availableSubCategories = selectedCategoryData ? selectedCategoryData.subcategories : [];
 
  
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setSelectedSubCategories([]);
    setPriceRange([0, 10000]);
    setPriceTouched(false); 
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete("minPrice");
    updatedSearchParams.delete("maxPrice");
    navigate(`/category/${newCategory.toLowerCase()}`);
  };
  

  // Handle subcategory selection
  const handleSubCategoryChange = (event) => {
    const subCategoryId = event.target.value;
    const updatedSubCategories = event.target.checked
      ? [...selectedSubCategories, subCategoryId]
      : selectedSubCategories.filter((id) => id !== subCategoryId);
  
    setSelectedSubCategories(updatedSubCategories);
  
    // Start with the current search params
    const updatedSearchParams = new URLSearchParams(searchParams);
  
    // Clear the current subcategory params before adding the updated ones
    updatedSearchParams.delete("sub_category");
  
    // Add the updated subcategories to the query params
    updatedSubCategories.forEach((id) => updatedSearchParams.append("sub_category", id));
  
    // Update the search params without affecting other params
    setSearchParams(updatedSearchParams);
  };
  
  const handlePriceChange = (event, newValue) => {
    console.log(newValue);
    
    setPriceRange(newValue);
    setPriceTouched(true); // ✅ Mark it as touched
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('minPrice', newValue[0]);
    updatedSearchParams.set('maxPrice', newValue[1]);
    setSearchParams(updatedSearchParams);
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
  width: '20vw',
  maxHeight: '83vh', // Keeps the left side fixed at 100vh height
  overflowY: 'auto',  // Allow scrolling if needed within the filter section
  overflowX:'hidden',
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
    <Typography variant="h6" sx={{ fontSize: '16px', background: "black", textAlign: 'center', p: 1.5 }} className="rounded-full" gutterBottom>
          Filter by Price
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          min={0}
          max={10000}
          step={100}
          sx={{
            width: '95%',
            '& .MuiSlider-root': {
              color: '#e32d92', // Pink color for the entire slider
            },
            '& .MuiSlider-thumb': {
              backgroundColor: 'rgb(227, 45, 146)', // Pink thumb color
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#d3d3d3', // Rail color (gray)
            },
            '& .MuiSlider-track': {
              backgroundColor: 'rgb(227, 45, 146)', // Pink track color
              border: '2px solid #e32d92',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'rgb(227, 45, 146)', // Pink value label background
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSelectedCategory("");
            setSelectedSubCategories([]);
            setPriceRange([0, 10000]);
            navigate("/category");
          }}
        >
          Reset Filters
        </Button>

    {/* Reset Filters */}
   
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
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
