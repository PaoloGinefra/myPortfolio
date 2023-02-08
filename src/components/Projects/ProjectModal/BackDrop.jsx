import { motion } from "framer-motion";

const BackDrop = ({children, onClick}) => {
    return (
        <motion.div
            className="bg-black bg-opacity-70 fixed top-0 left-0 w-full h-full flex"
            onClick={onClick}
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            {children}
        </motion.div>
    );
};

export default BackDrop;