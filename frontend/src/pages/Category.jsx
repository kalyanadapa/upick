import { useParams } from 'react-router-dom';

const categories = {
  men: ['T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
  women: ['Dresses', 'Blouses', 'Skirts', 'Boots'],
  kids: ['Toys', 'T-Shirts', 'Jeans', 'Sneakers'],
  accessories: ['Hats', 'Sunglasses', 'Bags', 'Watches'],
  'home-living': ['Bedsheets', 'Cushions', 'Furniture', 'Decor'],
  beauty: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
};

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Fetch the category data dynamically (using the dummy data)
  const categoryData = categories[categoryName] || []; // Fallback to empty array if category doesn't exist

  return (
    <div>
      <h1>{categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Category'}</h1>
      <ul>
        {categoryData.length > 0 ? (
          categoryData.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No items available in this category.</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryPage;
