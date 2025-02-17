import { Outlet } from "react-router-dom";
// import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import { useFetchCategoriesQuery } from "../src/redux/api/categoryApiSlice";
import "react-toastify/dist/ReactToastify.css";
import NavHeader from "./pages/NavHeader";
import Footer from "./pages/Footer";
import ScrollToTop from "./pages/ScrollTop";
const App = () => {
  const { data: categories, } = useFetchCategoriesQuery(); 
  console.log("header",categories);
  
  return (
    <>
    <ScrollToTop/>
      <ToastContainer />
   <NavHeader categories={categories?.data ||[]}/>
      {/* <Navigation /> */}
      <main className="">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default App;
