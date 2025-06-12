import { motion } from "framer-motion";

const AnimatedLoader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.span
        className="text-4xl font-extrabold bg-gradient-to-r from-pink-700 via-orange-400 to-pink-700 text-transparent bg-clip-text"
        animate={{
          y: ["0%", "-10%", "0%"], // bounce effect
          backgroundPosition: ["0% 50%", "100% 50%"], // shimmer effect
        }}
        transition={{
          y: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          backgroundPosition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        Upick
      </motion.span>
    </div>
  );
};

export default AnimatedLoader;
