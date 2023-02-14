import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
};

function TitleDescription({ children }) {
  return (
    <motion.p
      className="absolute text-md text-center leading-8 text-gray-400 md:text-xl w-full"
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
    >
      {children}
    </motion.p>
  );
}

export default TitleDescription;
