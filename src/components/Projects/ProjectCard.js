import Image from "next/image";
import Tag from "./Tag";
import ToolTag from "../Tools/ToolTag";
import Tools from "../../../public/data/Tools.json"

import { AiFillGithub } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import web1 from '../../../public/web3.png'

function ProjectCard(){
    return (
        <div className="relative bg-slate-300 max-w-sm rounded-2xl overflow-hidden">
            
            <div className="rounded-2xl overflow-hidden">
                <Image className='w-full' src={web1} alt="Sunset in the mountains"/>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>

            <div className="px-6 pt-0">
                <ToolTag tool =  {Tools[1]}/>
                <ToolTag tool =  {Tools[0]}/>
            </div>

            <div className="px-6 pt-4 pb-2">
                <Tag tag = 'Ai'/>
                <Tag tag = 'Python'/>
                <Tag tag = 'ipsum'/>
                <Tag tag = 'dolor'/>
                <Tag tag = 'sit'/>
                <Tag tag = 'sus'/>
            </div>

            <div className="absolute text-5xl right-0 top-0 p-2 filter brightness-0">
                <a href="https://github.com/PaoloGinefra" target="_blank" rel="noopener noreferrer">
                    <AiOutlineGithub className="" colr='black'/>
                </a>
            </div>
        </div>
    )
}

export default ProjectCard;