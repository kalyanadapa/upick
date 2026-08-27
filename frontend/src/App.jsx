import { Outlet } from "react-router-dom";
// import Navigation from "./pages/Auth/Navigation";
import { ToastContainer, toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../src/redux/api/categoryApiSlice";
import "react-toastify/dist/ReactToastify.css";
import NavHeader from "./pages/NavHeader";
import Footer from "./pages/Footer";
import ScrollToTop from "./pages/ScrollTop";
import LoginModal from "./pages/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isPushNotificationSupported, getServiceWorkerRegistration } from "./services/notificationService";

const App = () => {
  const { data: categories } = useFetchCategoriesQuery(); 
  const isLoginModalOpen = useSelector((state) => state.auth.isLoginModalOpen);

  useEffect(() => {
    if (isPushNotificationSupported()) {
      getServiceWorkerRegistration().catch((err) => {
        console.warn("[App] Service worker registration error:", err);
      });

      const handleSwMessage = (event) => {
        if (event.data && event.data.type === 'PUSH_NOTIFICATION') {
          const { title, body } = event.data.payload || {};
          toast.info(`🔔 ${title}: ${body}`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      };

      navigator.serviceWorker.addEventListener('message', handleSwMessage);
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleSwMessage);
      };
    }
  }, []);

  return (
    <>
   {isLoginModalOpen && <LoginModal />}
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
