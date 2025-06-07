import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openLoginModal } from "../../redux/features/auth/authSlice";
import { useToggleWishlistMutation } from "../../redux/api/wishListApiSlice";
import { useState } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [toggleWishlist] = useToggleWishlistMutation();
  const [isLiked, setIsLiked] = useState(product?.is_liked || false); // local optimistic state
  const [isProcessing, setIsProcessing] = useState(false); // to prevent spamming clicks

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    if (isProcessing) return;

    const optimisticLikeState = !isLiked;
    setIsLiked(optimisticLikeState); // instantly reflect change in UI
    setIsProcessing(true);

    try {
      const response = await toggleWishlist({ productId: product._id }).unwrap();
      toast.success(response.message || "Wishlist updated!");
    } catch (error) {
      // rollback on failure
      setIsLiked(!optimisticLikeState);
      toast.error(error?.data?.message || "Failed to update wishlist");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={handleToggleWishlist} disabled={isProcessing}>
      <span className="heart-icon text-xl transition-all duration-300">
        {isLiked ? "❤️" : "🤍"}
      </span>
    </button>
  );
};

export default HeartIcon;
