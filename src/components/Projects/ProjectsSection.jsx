import ProjectCard from "./ProjectCard"
import ToolsSection from "../Tools/ToolsSection"
import Tools from '../../../public/data/Tools.json'
import TagsSection from "../Tag/TagsSection";
import EmptySelection from "./EmptySlection";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function ProjectSection({projects, tags, openModal, setProject}){
  const [SelectedTools, setSelectedTools] = useState(Tools.map(tool => tool.Selected));
  const [SelectedTags, setSelectedTags] = useState(Object.assign(...tags.map(tag => ({ [tag]: true }))))

  function toggleSelectTool(id){
    const newSlectedTools = SelectedTools.map((selected, index) => index == id ? !selected : selected)
    setSelectedTools(newSlectedTools)
  }

  function toggleSelectTag(tag){
    SelectedTags[tag] = !SelectedTags[tag]
    setSelectedTags({...SelectedTags})
  }

  function projectsToRender(){
    let empty = true;

    const projectsArray = projects.map((project) => {
      const haveSlectedTool = project.data.tools.some(toolName => {
        const id = Tools.find(tool => tool.Name === toolName).id
        return SelectedTools[id]
      });

      const haveSelectedTag = project.data.tags.some(tag => SelectedTags[tag]);

      const render = (haveSlectedTool && haveSelectedTag);

      empty = !render && empty;

      return <AnimatePresence key ={project.data.title}
        initial={false}
        mode = {'wait'}
        onExitComplete={() => null}>
        {
          render && (<ProjectCard project={project} openModal = {openModal} setProject = {setProject} key={project.slug}/>)
        }
      </AnimatePresence>
      }
    )

    if(empty)
      projectsArray.push(<EmptySelection key={'empty__'}/>)

    return projectsArray
  }

  return (
    <>
      <section className="text-white">
        <div>
          <h3 className='text-4xl py-1 text-center pt-10 font-bold mb-5'>Projects</h3>
          <p className='text-md py-2 leading-8 text-gray-400'>
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea commodi consequatur. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

      <ToolsSection toggleSelectTool= {toggleSelectTool}/>

      <TagsSection tags = {tags} toggleSelectTag={toggleSelectTag}/>

        <div className='flex gap-10 py-10 flex-row flex-wrap justify-center align-middle'>
          { projectsToRender()}
        </div>

      </section>
    </>
  )
}

export default ProjectSection;