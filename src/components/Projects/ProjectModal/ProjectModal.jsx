import { motion } from "framer-motion";
import BackDrop from "./BackDrop";
import TestMdx from '../../../../public/ProjectsPages/test.mdx'

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
    },
};

const ProjectModal = ({handleClose, text}) => {
    return (
        <BackDrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className = 'm-auto w-4/5 h-4/5 bg-white rounded-2xl'
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >

            <div className="prose p-5">
                <TestMdx/>
            </div>

            </motion.div>
        </BackDrop>
    );
}

export default ProjectModal;