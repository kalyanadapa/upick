// Wishlist.jsx or Wishlist.tsx
import { useEffect } from "react";
import axios from "axios";

const Wishlist = () => {
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/wishlist", {
          withCredentials: true, // 👈 VERY IMPORTANT to include cookies
        });

        console.log("Wishlist:", res.data.wishlist);
      } catch (err) {
        console.error("Error fetching wishlist:", err.response?.data || err.message);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
      <p>Check console for response 👀</p>
    </div>
  );
};

export default Wishlist;
