/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import BackDrop from "./BackDrop";
import { useState, useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";
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
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
  },
};

const ProjectModal = ({ post, handleClose }) => {
  const [postSource, setPostSource] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const mdxSource = await serialize(post.content, {
        mdxOptions: { development: false },
      });
      setPostSource(mdxSource);
    };

    fetchData().catch(console.error);
  }, []);

  // Lock background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalLeft = document.body.style.left;
    const originalRight = document.body.style.right;

    // Capture current scroll position
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.left = originalLeft;
      document.body.style.right = originalRight;
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };

  const handleModalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <BackDrop onClick={handleBackdropClick}>
      <motion.div
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        className="m-auto h-[80vh] bg-white rounded-2xl flex flex-col overflow-hidden"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="prose p-5 overflow-y-auto flex-1 min-h-0">
          {postSource && <MDXRemote {...postSource} />}
        </div>
      </motion.div>
    </BackDrop>
  );
};

export default ProjectModal;
