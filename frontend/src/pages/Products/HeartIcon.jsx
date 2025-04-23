import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openLoginModal } from "../../redux/features/auth/authSlice";
import { useToggleWishlistMutation } from "../../redux/api/wishListApiSlice";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth); // Check authentication state
  const [toggleWishlist] = useToggleWishlistMutation(); // RTK Query hook to toggle wishlist

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal()); // Prompt to log in if not authenticated
      return;
    }

    try {
      const response = await toggleWishlist({ productId: product._id }).unwrap();
      toast.success(response.message || "Wishlist updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update wishlist");
    }
  };

  return (
    <button onClick={handleToggleWishlist}>
      {/* Render heart icon based on whether the product is liked or not */}
      <span className="heart-icon">
        {/* You can conditionally change the heart icon based on the product's liked state */}
        {isAuthenticated ? (product.is_liked ? "❤️" : "🤍") : "🤍"}
      </span>
    </button>
  );
};

export default HeartIcon;
