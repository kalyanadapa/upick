// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

// const ProductList = () => {
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState(0);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [subcategory, setSubcategory] = useState("");
//   const navigate = useNavigate();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!name || !category) {
//       toast.error("Name and Category are required.");
//       return;
//     }

//     try {
//       const productData = new FormData();
//       productData.append("image", image);
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("category", category);
//       productData.append("quantity", quantity);
//       productData.append("brand", brand);
//       productData.append("countInStock", stock);

//       const { data } = await createProduct(productData);

//       if (data.error) {
//         toast.error("Product creation failed. Try Again.");
//       } else {
//         toast.success(`${data.name} is created`);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(`Product creation failed. Try Again. ${error}`);
//     }
//   };

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message);
//       setImage(res.image); // Save the image file reference
//       setImageUrl(res.image); // Set the URL for display
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };
//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     setSubcategory(""); // Reset subcategory when category changes
//   };

//   // Filter subcategories based on selected category
//   const selectedCategory = categories?.data?.find((c) => c._id === category);
//   const subcategories = selectedCategory ? selectedCategory.subcategories : [];
//   return (

//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//   <div className="flex flex-col md:flex-row">
//     <AdminMenu />
//     <div className="md:w-3/4 p-3">
//       <div className="h-12 text-white text-2xl font-semibold mb-4">Create Product</div>
//       <form onSubmit={handleSubmit}>
//         {imageUrl && (
//           <div className="text-center mb-4">
//             <img
//               src={imageUrl}
//               alt="product"
//               className="block mx-auto max-h-[200px] w-auto"
//             />
//           </div>
//         )}

//         <div className="mb-3">
//           <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//             {image ? image.name : "Upload Image"}
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={uploadFileHandler}
//               className={!image ? "hidden" : "text-white"}
//             />
//           </label>
//         </div>

//         <div className="p-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//             {/* Category Name */}
//             <div className="flex flex-col">
//               <label htmlFor="name" className="text-white">Name</label>
//               <input
//                 type="text"
//                 className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Price */}
//             <div className="flex flex-col">
//               <label htmlFor="price" className="text-white">Price</label>
//               <input
//                 type="number"
//                 className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//             {/* Quantity */}
//             <div className="flex flex-col">
//               <label htmlFor="quantity" className="text-white">Quantity</label>
//               <input
//                 type="number"
//                 className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Brand */}
//             <div className="flex flex-col">
//               <label htmlFor="brand" className="text-white">Brand</label>
//               <input
//                 type="text"
//                 className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="flex flex-col mb-5">
//             <label htmlFor="description" className="text-white">Description</label>
//             <textarea
//               type="text"
//               className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//             {/* Stock */}
//             <div className="flex flex-col">
//               <label htmlFor="stock" className="text-white">Count In Stock</label>
//               <input
//                 type="number"
//                 className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 required
//               />
//             </div>

//              {/* Category */}
//              <div className="flex flex-col">
//                   <label htmlFor="category" className="text-white">Category</label>
//                   <select
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     onChange={handleCategoryChange}
//                     value={category}
//                     required
//                   >
//                     <option value="" disabled>Choose Category</option>
//                     {categories?.data?.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Subcategory */}
//               {category && (
//                 <div className="flex flex-col mb-5">
//                   <label htmlFor="subcategory" className="text-white">Subcategory</label>
//                   <select
//                     className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
//                     onChange={(e) => setSubcategory(e.target.value)}
//                     value={subcategory}
//                   >
//                     <option value="" disabled>Choose Subcategory</option>
//                     {subcategories.map((sub) => (
//                       <option key={sub._id} value={sub._id}>
//                         {sub.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

//   );
// };

// export default ProductList;
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import axios from "axios";

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
  const fileInputRef = useRef(null); // Ref for the file input
  const navigate = useNavigate();

  const { data: categories, error, isLoading } = useFetchCategoriesQuery(); // Use RTK Query hook

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append new files
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]); // Append new URLs
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !category  || images.length === 0) {
      toast.error("Name, Category, and atleast one image are required.");
      console.log(name,category);
      
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

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

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
                  // className={!image ? "hidden" : "text-white"}
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
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
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

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
