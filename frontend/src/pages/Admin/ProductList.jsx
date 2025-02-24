// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import axios from "axios";
// import { useFetchBrandsQuery } from "../../redux/api/brandApiSlice";

// const ProductList = () => {
//   const [images, setImages] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState(0);
//   const [subcategory, setSubcategory] = useState("");
//   const [imageUrls, setImageUrls] = useState([]);
//   const fileInputRef = useRef(null); // Ref for the file input
//   const navigate = useNavigate();
//   const { data: brands, isLoading:brandsLoading, error:brandsError } = useFetchBrandsQuery();
//   console.log("brands",brands);
  

//   const { data: categories, error, isLoading } = useFetchCategoriesQuery(); // Use RTK Query hook

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prevImages) => [...prevImages, ...files]); // Append new files
//     const urls = files.map((file) => URL.createObjectURL(file));
//     setImageUrls((prevUrls) => [...prevUrls, ...urls]); // Append new URLs
//   };
  
//   // Function to remove an image
//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
//   };
  
//   // Function to clear all images
//   const handleClearAllImages = () => {
//     setImages([]);
//     setImageUrls([]);
//   };
// const handleBrandChange = (e) => {
//   setBrand(e.target.value); // Set the brand ID instead of name
// };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!name || !category  || images.length === 0) {
//       toast.error("Name, Category, and atleast one image are required.");
//       console.log(name,category);
      
//       return;
//     }

//     try {
//       // Prepare form data for API
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);
//       formData.append("subcategory", subcategory);
//       images.forEach((image) => {
//         formData.append("images", image);
//       });

//       // Post product data with image to backend
//       const productResponse = await axios.post("http://localhost:8000/api/v1/product", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Make sure content type is set
//         },
//         withCredentials: true,
//       });

//       if (productResponse.status === 201) {
//         toast.success(`${productResponse.data.name} is created`);
//         setName("");
//         setDescription("");
//         setPrice("");
//         setCategory("");
//         setQuantity("");
//         setBrand("");
//         setStock(0);
//         setSubcategory("");
//         setImages([]);
//         setImageUrls([]);
//       } else {
//         toast.error("Product creation failed. Try Again.");
//       }
//     } catch (error) {
//       toast.error(`Error: ${error.message || error}`);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     setSubcategory(""); // Reset subcategory when category changes
//   };

//   const selectedCategory = categories?.data?.find((c) => c._id === category);
//   const subcategories = selectedCategory ? selectedCategory.subcategories : [];

//   if (isLoading) return <div>Loading categories...</div>;
//   if (error) return <div>Error loading categories: {error.message}</div>;

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <div className="h-12 text-white text-2xl font-semibold mb-4">Create Product</div>
//           <form onSubmit={handleSubmit}>
//           {imageUrls.length > 0 && (
//       <div className="flex flex-wrap gap-3 mb-4">
//         {imageUrls.map((url, index) => (
//           <div key={index} className="relative">
//             <img src={url} alt="preview" className="h-[80px] w-[80px] rounded-lg" />
//             <button
//               onClick={() => handleRemoveImage(index)}
//               className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//     )}
//             <div className="mb-3">
//               <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {images.length > 0 ? `${images.length} image${images.length > 1 ? "s" : ""} selected` : "Upload Images"}

//                 <input
//                   type="file"
//                   ref={fileInputRef}  // Ref attached to the file input
//                   accept="image/*"
//                   multiple
//                   onChange={handleFileUpload}
//                   className="hidden"
//                   // className={!image ? "hidden" : "text-white"}
//                 />
//               </label>
//             </div>

//             <div className="p-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                 <div className="flex flex-col">
//                   <label htmlFor="name" className="text-white">Name</label>
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor="price" className="text-white">Price</label>
//                   <input
//                     type="number"
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                 <div className="flex flex-col">
//                   <label htmlFor="quantity" className="text-white">Quantity</label>
//                   <input
//                     type="number"
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     required
//                   />
//                 </div>

       
//   <div className="flex flex-col">
//     <label htmlFor="brand" className="text-white">Brand</label>
//     <select
//       value={brand}
//       onChange={handleBrandChange}
//       className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//     >
//       <option value="">Select Brand</option>
//       {brands?.data?.map((brandItem) => (
//         <option key={brandItem._id} value={brandItem._id}>
//           {brandItem.name}
//         </option>
//       ))}
//     </select>
//   </div>


//               </div>

//               <div className="flex flex-col mb-5">
//                 <label htmlFor="description" className="text-white">Description</label>
//                 <textarea
//                   type="text"
//                   className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                 <div className="flex flex-col">
//                   <label htmlFor="stock" className="text-white">Count In Stock</label>
//                   <input
//                     type="number"
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor="category" className="text-white">Category</label>
//                   <select
//                     value={category}
//                     onChange={handleCategoryChange}
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories?.data?.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {subcategories.length > 0 && (
//                 <div className="flex flex-col mb-5">
//                   <label htmlFor="subcategory" className="text-white">Subcategory</label>
//                   <select
//                     value={subcategory}
//                     onChange={(e) => setSubcategory(e.target.value)}
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                   >
//                     <option value="">Select Subcategory</option>
//                     {subcategories.map((sub) => (
//                       <option key={sub._id} value={sub._id}>
//                         {sub.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

// <button
//   type="submit"
//   style={{
//     width: "100%",
//     padding: "12px", // same as py-3
//     background: "linear-gradient(45deg, #ff3ed5d1, #ff9900)", // gradient background
//     color: "white", // text color
//     borderRadius: "8px", // rounded corners
//     fontWeight: "bold", // bold text
//     transition: "0.3s", // transition effect
//   }}
//   onMouseEnter={(e) => {
//     e.target.style.background = "linear-gradient(45deg, #ff9900, #ff6600)"; // hover gradient
//     e.target.style.transform = "scale(1.05)"; // scale on hover
//   }}
//   onMouseLeave={(e) => {
//     e.target.style.background = "linear-gradient(45deg, #ff3ed5d1, #ff9900)"; // reset to normal gradient
//     e.target.style.transform = "scale(1)"; // reset scale
//   }}
// >
//   Create Product
// </button>

//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;





import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import axios from "axios";
import { useFetchBrandsQuery } from "../../redux/api/brandApiSlice";

const ProductList = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [subcategory, setSubcategory] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [productType, setProductType] = useState('');

  const fileInputRef = useRef(null); // Ref for the file input
  const navigate = useNavigate();
   const productTypes = {
    furniture: 'furniture',
    bedsheets: 'bedsheets',
    cushions: 'cushions',
    decor: 'decor',
    shirts: 'shirts',
    tShirts: 't-shirts',
    jeans: 'jeans',
    dresses: 'dresses',
    tops: 'tops',
    handbags: 'handbags',
    shoes: 'shoes',
    accessories: 'accessories',
    toys: 'toys',
    clothing: 'clothing',
    beauty: 'beauty',
    makeup: 'makeup',
    skincare: 'skincare',
    haircare: 'haircare',
    fragrances: 'fragrances',
    footwear: 'footwear',
    bags: 'bags',
    electronics: 'electronics',
    appliances: 'appliances',
    jewelry: 'jewelry',
    sportswear: 'sportswear',
    outdoor: 'outdoor',
    baby: 'baby',
    kitchenware: 'kitchenware',
    stationery: 'stationery',
    healthcare: 'healthcare',
  } 
  // Fetch brands and categories using RTK Query
  const { data: brands, isLoading: brandsLoading, error: brandsError } = useFetchBrandsQuery();
  const { data: categories, error, isLoading } = useFetchCategoriesQuery();

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append new files
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]); // Append new URLs
  };
  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };
  
  // Function to remove an image
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  // Function to clear all images
  const handleClearAllImages = () => {
    setImages([]);
    setImageUrls([]);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value); // Set the brand ID instead of name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !category || images.length === 0) {
      toast.error("Name, Category, and at least one image are required.");
      return;
    }

    try {
      // Prepare form data for API
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      formData.append("subcategory", subcategory);
      formData.append("type", productType);

      images.forEach((image) => {
        formData.append("images", image);
      });

      // Post product data with image to backend
      const productResponse = await axios.post("http://localhost:8000/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure content type is set
        },
        withCredentials: true,
      });

      if (productResponse.status === 201) {
        toast.success(`${productResponse.data.name} is created`);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setBrand("");
        setStock(0);
        setSubcategory("");
        setImages([]);
        setImageUrls([]);
      } else {
        toast.error("Product creation failed. Try Again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message || error}`);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(""); // Reset subcategory when category changes
  };

  const selectedCategory = categories?.data?.find((c) => c._id === category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  if (isLoading || brandsLoading) return <div>Loading...</div>;
  if (error || brandsError) return <div>Error loading data: {error?.message || brandsError?.message}</div>;

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-white text-2xl font-semibold mb-4">Create Product</div>
          <form onSubmit={handleSubmit}>
            {imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt="preview" className="h-[80px] w-[80px] rounded-lg" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mb-3">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {images.length > 0 ? `${images.length} image${images.length > 1 ? "s" : ""} selected` : "Upload Images"}
                <input
                  type="file"
                  ref={fileInputRef}  // Ref attached to the file input
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-white">Name</label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price" className="text-white">Price</label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label htmlFor="quantity" className="text-white">Quantity</label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="brand" className="text-white">Brand</label>
                  <select
                    value={brand}
                    onChange={handleBrandChange}
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  >
                    <option value="">Select Brand</option>
                    {brands?.data?.map((brandItem) => (
                      <option key={brandItem._id} value={brandItem._id}>
                        {brandItem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="description" className="text-white">Description</label>
                <textarea
                  type="text"
                  className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label htmlFor="stock" className="text-white">Count In Stock</label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="category" className="text-white">Category</label>
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories?.data?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {subcategories.length > 0 && (
                <div className="flex flex-col mb-5">
                  <label htmlFor="subcategory" className="text-white">Subcategory</label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
<div className="flex flex-col mb-5">
  <label htmlFor="productType" className="text-white">Product Type</label>
  <select
    value={productType}
    onChange={handleProductTypeChange}
    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
    required
  >
    <option value="">Select Product Type</option>
    {Object.keys(productTypes).map((type) => (
      <option key={type} value={productTypes[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </option>
    ))}
  </select>
</div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-4 rounded-lg w-full font-bold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
