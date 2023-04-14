import Image from "next/image";
import Tag from "../Tag/Tag";
import ToolTag from "../Tools/ToolTag";
import Tools from "../../../public/data/Tools.json";

import { AiOutlineGithub } from "react-icons/ai";

import { motion } from "framer-motion";

const variants = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
};

function ProjectCard({ project, setProject, openModal }) {
  return (
    <motion.div
      className="relative bg-slate-300 max-w-md rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => {
        openModal();
        setProject(project);
      }}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      whileHover={"hover"}
      whileTap={"tap"}
      variants={variants}
    >
      <div className="rounded-2xl w-full aspect-[4/3] overflow-hidden flex object-cover">
        <Image
          className="w-full object-cover"
          src={project.data.coverSrc}
          alt="Project Cover"
          width={500}
          height={500}
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{project.data.title}</div>

        <p className="text-gray-700 text-base w-fit aspect-video">
          {project.data.cardDescription}
        </p>
      </div>

      <div className="px-6 pt-0">
        {project.data.tools.map((toolName) => {
          var tools = Tools.filter(
            (genericTool) => genericTool.Name === toolName
          );
          return tools.map((tool) => <ToolTag tool={tool} key={tool.Name} />);
        })}
      </div>

      <div className="px-5 mb-5 flex gap-2">
        {project.data.tags.map((tag, id) => (
          <Tag tag={tag} key={id} />
        ))}
      </div>

      <div className="absolute text-5xl right-0 top-0 p-2 filter brightness-0">
        {project.data.gitHubLink && (
          <a
            href={project.data.gitHubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <AiOutlineGithub className="" colr="black" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectCard;
