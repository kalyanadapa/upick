import { useState, useEffect } from "react";
import axios from "axios";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories , refetch  } = useFetchCategoriesQuery();
  //const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
//code for create category new upick

const [message, setMessage] = useState("");
const API_URL = "http://localhost:8000/api/v1/category"; // Your backend URL

  // Function to create a new category via API
  const createCategory1 = async (categoryData) => {
    try {
      const response = await axios.post(API_URL, categoryData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // If using authentication cookies
      });
      toast.success(`Category is created.`);
      setMessage({ type: "success", text: "Category created successfully!" });
      return response.data;
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Error creating category" });
    }
  };

  // Handle form submission and send data to API
  const handleSubmit = async (categoryData) => {
    await createCategory1(categoryData);
  };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const categoryData = { name, subcategories };

//   try {
//     const response = await createCategory1(categoryData);
//     setMessage(response.message);
//     setName("");
//     setSubcategories([]);
//   } catch (error) {
//     setMessage(error?.message || "Error creating category");
//   }
// };
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        refetch();
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        refetch();
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        refetch();
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/category");
        console.log("Categories:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
      }
    };

    fetchCategories();  // Calling the async function

  }, []); 
  return (<>
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      {/*upick code */}
      
   
    </div>
    <div className="">
    
      <CategoryForm handleSubmit={handleSubmit}
        />
    </div>
  </>
  
  );
};

export default CategoryList;
