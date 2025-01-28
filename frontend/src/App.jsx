import { Outlet } from "react-router-dom";
// import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavHeader from "./pages/NavHeader";
import Footer from "./pages/Footer";
const App = () => {
  return (
    <>
      <ToastContainer />
   <NavHeader/>
      {/* <Navigation /> */}
      <main className="">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default App;
