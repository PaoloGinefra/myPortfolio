import ProjectCard from "./ProjectCard"

function ProjectSection({projects, openModal, setProject}){
    return (
        <section className="text-white">
          <div>
            <h3 className='text-3xl py-1 text-center pt-10'>Projects</h3>
            <p className='text-md py-2 leading-8 text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea commodi consequatur. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className='flex gap-10 py-10 flex-row flex-wrap justify-center align-middle'>
            {
              projects.map((project) => <ProjectCard project={project} openModal = {openModal} setProject = {setProject} key={project.slug}/>)
            }
          </div>

        </section>
    )
}

export default ProjectSection;