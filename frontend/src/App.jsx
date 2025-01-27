import { Outlet } from "react-router-dom";
// import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavHeader from "./pages/NavHeader";
const App = () => {
  return (
    <>
      <ToastContainer />
   <NavHeader/>
      {/* <Navigation /> */}
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;
