import Image from "next/image"
import { useState } from "react";
import { motion } from "framer-motion"
import {BiShow, BiHide} from 'react-icons/bi'

const variants = {
    selected: { opacity: 1,},
    notSelected: { opacity: 0.2,},
}

function ToolCard({tool, toggleSelectTool}){
    const [Selected, setSelected] = useState(tool.Selected);
    return(
        <motion.div
        className="flex flex-col max-w-[20vmax] mt-10 relative"
        animate={Selected ? "selected" : "notSelected"}
        variants={variants}
        >
            <button
            className="flex-none group relative w-full aspect-square"
            onClick={() => {
                toggleSelectTool(tool.id);
                setSelected(!Selected);
            }}
            >
                <div className=" mx-auto aspect-square outline outline-8 outline-offset-4 outline-[color:var(--primary)] rounded-full overflow-hidden [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500">
                    <Image className="w-full" src={tool.ImgSrc} alt={tool.Name} width={100} height={100}/>
                </div>

                <div className="absolute flex aspect-square top-0 bg-white bg-opacity-80 h-full w-full justify-center align-middle [transform:rotateY(180deg)] rounded-full [backface-visibility:hidden] group-hover:[transform:rotateY(360deg)] transition-all duration-500">
                    <p className="m-auto bg-[color:var(--primary-darkened)] p-2 rounded-full text-3xl font-semibold text-white text-center">
                        {Selected ? <BiShow/> : <BiHide/>}
                    </p>
                </div>
            </button>



            <p className="mt-4 font-bold text-xl mb-2 text-center break-words">
                {tool.Name}
            </p>

        </motion.div>
    )
}

export default ToolCard;