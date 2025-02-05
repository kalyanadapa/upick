// import { useParams } from 'react-router-dom';

// const categories = {
//   men: ['T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
//   women: ['Dresses', 'Blouses', 'Skirts', 'Boots'],
//   kids: ['Toys', 'T-Shirts', 'Jeans', 'Sneakers'],
//   accessories: ['Hats', 'Sunglasses', 'Bags', 'Watches'],
//   'home-living': ['Bedsheets', 'Cushions', 'Furniture', 'Decor'],
//   beauty: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
// };

// const CategoryPage = () => {
//   const { categoryName } = useParams();

//   // Fetch the category data dynamically (using the dummy data)
//   const categoryData = categories[categoryName] || []; // Fallback to empty array if category doesn't exist

//   return (
//     <div>
//       <h1>{categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Category'}</h1>
//       <ul>
//         {categoryData.length > 0 ? (
//           categoryData.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))
//         ) : (
//           <li>No items available in this category.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default CategoryPage;
// import { useParams } from "react-router-dom";
// import { useState } from "react";

// const categories = {
//   men: ["T-Shirts", "Jeans", "Jackets", "Shoes"],
//   women: ["Dresses", "Blouses", "Skirts", "Boots"],
//   kids: ["Toys", "T-Shirts", "Jeans", "Sneakers"],
//   accessories: ["Hats", "Sunglasses", "Bags", "Watches"],
//   "home-living": ["Bedsheets", "Cushions", "Furniture", "Decor"],
//   beauty: ["Makeup", "Skincare", "Haircare", "Fragrances"],
// };

// // Dummy Product Data
// const dummyProducts = [
//   { id: 1, name: "Men's T-Shirt", subCategory: "T-Shirts", price: 20, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 2, name: "Men's Jeans", subCategory: "Jeans", price: 50, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 3, name: "Men's Jacket", subCategory: "Jackets", price: 80, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 4, name: "Men's Shoes", subCategory: "Shoes", price: 60, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 5, name: "Women's Dress", subCategory: "Dresses", price: 40, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 6, name: "Women's Blouse", subCategory: "Blouses", price: 30, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 7, name: "Kids' T-Shirt", subCategory: "T-Shirts", price: 15, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 8, name: "Kids' Sneakers", subCategory: "Sneakers", price: 35, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 9, name: "Sunglasses", subCategory: "Sunglasses", price: 25, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
//   { id: 10, name: "Watch", subCategory: "Watches", price: 70, image: "https://cdn.urbanstash.in/img/2021/06/urbanstash_category_men_half_sleeve_plain_00.jpg" },
// ];

// const CategoryPage = () => {
//   const { categoryName } = useParams();
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   // Filter products based on category
//   const categoryProducts = dummyProducts.filter(product => 
//     categories[categoryName]?.includes(product.subCategory)
//   );

//   // Filter products based on selected subcategory
//   const filteredProducts = selectedSubCategory
//     ? categoryProducts.filter(product => product.subCategory === selectedSubCategory)
//     : categoryProducts;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 capitalize">{categoryName}</h1>

//       {/* Subcategory Buttons */}
//       <div className="mb-4 flex gap-2">
//         <button
//           onClick={() => setSelectedSubCategory(null)}
//           className={`px-4 py-2 rounded ${selectedSubCategory === null ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           All
//         </button>
//         {categories[categoryName]?.map(subCategory => (
//           <button
//             key={subCategory}
//             onClick={() => setSelectedSubCategory(subCategory)}
//             className={`px-4 py-2 rounded ${selectedSubCategory === subCategory ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           >
//             {subCategory}
//           </button>
//         ))}
//       </div>

//       {/* Product List */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <div key={product.id} className="border p-4 rounded shadow">
//               <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
//               <h3 className="font-semibold">{product.name}</h3>
//               <p className="text-gray-600">${product.price}</p>
//               <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Add to Cart</button>
//             </div>
//           ))
//         ) : (
//           <p>No products available in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import { useParams } from "react-router-dom";
import { useState } from "react";

const categories = {
  men: ['T-Shirts', 'Shirts', 'Jeans', 'Shoes'],
  women: ['Dresses', 'Tops', 'Handbags', 'Shoes'],
  kids: ['Toys', 'Clothing', 'Shoes', 'Accessories'],
  'home-living': ['Bedsheets', 'Cushions', 'Furniture', 'Decor'],
  beauty: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
};
// Dummy Product Data
const dummyProducts = [
  { id: 1, name: "Men's T-Shirt", subCategory: "T-Shirts", category: "men", price: 20, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Men's Jeans", subCategory: "Jeans", category: "men", price: 50, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Men's Jacket", subCategory: "Jackets", category: "men", price: 80, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Men's Shoes", subCategory: "Shoes", category: "men", price: 60, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Women's Dress", subCategory: "Dresses", category: "women", price: 40, image: "https://via.placeholder.com/150" },
  { id: 6, name: "Women's Blouse", subCategory: "Blouses", category: "women", price: 30, image: "https://via.placeholder.com/150" },
  { id: 7, name: "Kids' T-Shirt", subCategory: "T-Shirts", category: "kids", price: 15, image: "https://via.placeholder.com/150" },
  { id: 8, name: "Kids' Sneakers", subCategory: "Sneakers", category: "kids", price: 35, image: "https://via.placeholder.com/150" },
  { id: 9, name: "Sunglasses", subCategory: "Sunglasses", category: "accessories", price: 25, image: "https://via.placeholder.com/150" },
  { id: 10, name: "Watch", subCategory: "Watches", category: "accessories", price: 70, image: "https://via.placeholder.com/150" },
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Get only the subcategories belonging to the selected category
  const availableSubCategories = categories[categoryName] || [];

  // Filter products based on category
  const categoryProducts = dummyProducts.filter(product => product.category === categoryName);

  // Filter products based on selected subcategory
  const filteredProducts = selectedSubCategory
    ? categoryProducts.filter(product => product.subCategory === selectedSubCategory)
    : categoryProducts;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{categoryName}</h1>

      {/* Subcategory Buttons */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSelectedSubCategory(null)}
          className={`px-4 py-2 rounded ${selectedSubCategory === null ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        {availableSubCategories.map(subCategory => (
          <button
            key={subCategory}
            onClick={() => setSelectedSubCategory(subCategory)}
            className={`px-4 py-2 rounded ${selectedSubCategory === subCategory ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {subCategory}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
