import { motion } from "framer-motion";

const variants = {
    hidden:{
        scale:0,
        opacity: 0
    },
    visible: {
        scale:1,
        opacity:1,
        transition: {
            delay: 0.4,
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    }
}

function EmptySelection(){
    return(
        <motion.div
        className="relative bg-gray-700 max-w-sm rounded-2xl overflow-hidden p-10 w-full text-center"
        variants={variants}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
        >
            <div className="font-bold text-3xl mb-2">
                    Sorry :(
            </div>

            <p className="text-gray-200 text-base">
                It looks like there aren&apos;t any projects that satisfie the applied filters. 
                {'  '}
                Don&apos;t worry though: you can change the filters, you can wait that I make a relevant project or, to speed up the process, you can hit me up with a project idea.
            </p>
        </motion.div>
    );
}


export default EmptySelection