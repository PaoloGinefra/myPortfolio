import {BiShow, BiHide} from 'react-icons/bi'
import { motion } from 'framer-motion';
import { useState } from 'react';

const variants = {
    selected: { opacity: 1,},
    notSelected: { opacity: 0.2,},
}

function TagSelector({tag, toggleSelectTag}){
    const [Selected, setSelected] = useState(true);
    return (
        <motion.button
        className="group relative"
        variants={variants}
        animate={Selected ? 'selected': 'notSelected'}
        onClick = {() => {
            setSelected(!Selected);
            toggleSelectTag(tag);
        }}
        >
            <p className="bg-gray-200 rounded-xl px-3 py-1 text-lg font-bold text-gray-700 group-hover:[transform:rotateY(180deg)] transition-all duration-500"
            >{tag}</p>

            <div className='absolute rounded-xl bg-[var(--primary)] opacity-80 w-full h-full top-0 flex justify-center items-center text-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] group-hover:[transform:rotateY(360deg)] transition-all duration-500'>
                {Selected ? <BiShow/> : <BiHide/>}
            </div>
            
        </motion.button>
    );
}

export default TagSelector;