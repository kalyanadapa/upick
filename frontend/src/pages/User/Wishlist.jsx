import { useGetWishlistQuery, useToggleWishlistMutation } from "../../redux/api/wishListApiSlice";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import heartImage from '../../../public/heart-like.png'
const Wishlist = () => {
  const { data, isLoading, error } = useGetWishlistQuery();
  const [toggleWishlist] = useToggleWishlistMutation();

  const handleToggle = async (productId) => {
    try {
      await toggleWishlist({ productId }).unwrap();
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  const wishlist = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-72 w-full bg-gray-800 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-4 text-red-500 bg-black">
        Failed to load wishlist.
      </p>
    );
  }

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <img
            src={heartImage}
            alt="Empty Wishlist"
            className="mx-auto w-40 mb-4 filter brightness-75"
          />
          <p>Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                <button
                  onClick={() => handleToggle(item._id)}
                  className="absolute top-3 right-3 bg-gray-800 hover:bg-red-600 rounded-full p-1 shadow transition-colors duration-200"
                  aria-label="Remove from wishlist"
                >
                  <CloseIcon fontSize="small" style={{ color: "white" }} />
                </button>

                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.brand?.name} | {item.subcategory?.name}
                  </p>
                  <p className="text-base font-bold text-indigo-400 mt-2">
                    ${item.discountPrice ?? item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
