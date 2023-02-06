import Image from "next/image"

import web2 from '../../../public/web2.png'
import web1 from '../../../public/web1.png'
import web3 from '../../../public/web3.png'
import web4 from '../../../public/web4.png'
import web5 from '../../../public/web5.png'
import web6 from '../../../public/web6.png'

import ProjectCard from "./ProjectCard"

function ProjectSection(){
    return (
        <section>
          <div>
            <h3 className='text-3xl py-1 text-center pt-10'>Projects</h3>
            <p className='text-md py-2 leading-8 text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea commodi consequatur. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className='flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap justify-center'>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
          </div>

        </section>
    )
}

export default ProjectSection;