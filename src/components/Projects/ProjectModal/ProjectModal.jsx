/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { motion } from "framer-motion";
import BackDrop from "./BackDrop";
import { useState, useEffect } from "react";
import {serialize} from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";

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

const ProjectModal = ({post, handleClose}) => {

    const [postSource, setPostSource] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const mdxSource = await serialize(post.content, {
                mdxOptions: { development: false },
              });
            setPostSource(mdxSource);
          }

        fetchData()
          .catch(console.error);
        
    }, []);

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
                {postSource && (<MDXRemote {...postSource}/>)}
            </div>

            </motion.div>
        </BackDrop>
    );
}

export default ProjectModal;