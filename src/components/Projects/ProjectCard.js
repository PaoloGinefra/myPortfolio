import Image from "next/image";
import Tag from "./Tag";
import ToolTag from "../Tools/ToolTag";
import Tools from "../../../public/data/Tools.json"

import { AiOutlineGithub } from "react-icons/ai"

import { motion } from "framer-motion";


function ProjectCard({project, post, setPost, openModal}){
    return (
        <motion.div
            className="relative bg-slate-300 max-w-sm rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => {
                openModal();
                setPost(post);
            }}
            whileHover = {{scale:1.05}}
            whileTap = {{scale:0.95}}
        >
            <div className="rounded-2xl overflow-hidden">
                <Image className='w-full' src={project.CoverSrc} alt="Project Cover" width={1000} height = {1000}/>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    {post.meta.data.title}
                </div>

                <p className="text-gray-700 text-base">
                    {project.Description}
                </p>
            </div>

            <div className="px-6 pt-0">
                {
                    project.Tools.map((toolName) => {
                        var tools = Tools.filter( (genericTool) => genericTool.Name === toolName);
                        return tools.map((tool, id) => <ToolTag tool = {tool} key = {id}/>);
                    })
                }
            </div>

            <div className="px-6 pt-4 pb-2">
                {
                    project.Tags.map((tag, id) => <Tag tag = {tag} key={id}/>)
                }
            </div>

            <div className="absolute text-5xl right-0 top-0 p-2 filter brightness-0">
                { project.GitHubLink && (
                <a href= {project.GitHubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <AiOutlineGithub className="" colr='black'/>
                </a>)
                }
            </div>
        </motion.div>
    )
}

export default ProjectCard;