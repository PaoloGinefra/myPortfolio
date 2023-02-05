import Image from "next/image"

import web2 from '../../../public/web2.png'
import web1 from '../../../public/web1.png'
import web3 from '../../../public/web3.png'
import web4 from '../../../public/web4.png'
import web5 from '../../../public/web5.png'
import web6 from '../../../public/web6.png'

function ProjectSection(){
    return (
        <section>
          <div>
            <h3 className='text-3xl py-1'>Portfolio</h3>
            <p className='text-md py-2 leading-8 text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea commodi consequatur. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className='flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap'>
            <div className='basis-1/3 flex-1'>
              <Image src = {web1} alt = 'web1' className='rounded-lg object-cover' width={'100%'}/>
            </div>
            <div className='basis-1/3 flex-1'>
              <Image src = {web2} alt = 'web1' className='rounded-lg object-cover' width={'100%'}/>
            </div>
            <div className='basis-1/3 flex-1'>
              <Image src = {web3} alt = 'web1' className='rounded-lg object-cover' width={'100%'}/>
            </div>
            <div className='basis-1/3 flex-1'>
              <Image src = {web4} alt = 'web1' className='rounded-lg object-cover' width={'100%'}/>
            </div>
            <div className='basis-1/3 flex-1'>
              <Image src = {web5} alt = 'web1' className='rounded-lg object-cover' width={'100%'}/>
            </div>
            <div className='basis-1/3 flex-1'>
              <Image src = {web6} alt = 'web1' className='rounded-lg object-cover' width={'100%'}/>
            </div>
          </div>

        </section>
    )
}

export default ProjectSection;