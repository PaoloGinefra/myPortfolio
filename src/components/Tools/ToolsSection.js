import Image from "next/image"

import design from '../../../public/design.png'
import code from '../../../public/code.png'
import consulting from '../../../public/consulting.png'

function ToolsSection({imageSrc}){
    return (
        <section>
          <div>
            <h3 className='text-3xl py-1'>
              Services I offer
            </h3>

            <p className='text-md py-2 leading-8 text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea commodi consequatur. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className='lg:flex gap-10'>
            <div className='text-center shadow-lg shadow-gray-600 p-10 rounded-xl my-10'>
              <Image src = {design} alt = 'design' width={100} height={100} className='relative mx-auto'/>
              <h3 className='text-lg font-medium pt-8 pb-2'>Beautiful Designs</h3>
              <p className='py-2'>
                Lorem ipsum dolor sit amet, consectetur adipisci elit
              </p>

              <h4 className='py-4 text-[color:var(--primary)]'>Design tools I use</h4>
              <p className='text-gray-400 py-1'>Photoshop</p>
              <p className='text-gray-400 py-1'>Illustrator</p>
              <p className='text-gray-400 py-1'>After Effect</p>
            </div>

            <div className='text-center shadow-lg shadow-gray-600 p-10 rounded-xl my-10'>
              <Image src = {code} alt = 'design' width={100} height={100} className='relative mx-auto'/>
              <h3 className='text-lg font-medium pt-8 pb-2'>Code</h3>
              <p className='py-2'>
                Lorem ipsum dolor sit amet, consectetur adipisci elit
              </p>

              <h4 className='py-4 text-[color:var(--primary)]'>Design tools I use</h4>
              <p className='text-gray-400 py-1'>Photoshop</p>
              <p className='text-gray-400 py-1'>Illustrator</p>
              <p className='text-gray-400 py-1'>After Effect</p>
            </div>

            <div className='text-center shadow-lg shadow-gray-600 p-10 rounded-xl my-10'>
              <Image src = {consulting} alt = 'design' width={100} height={100} className='relative mx-auto'/>
              <h3 className='text-lg font-medium pt-8 pb-2'>Consulting</h3>
              <p className='py-2'>
                Lorem ipsum dolor sit amet, consectetur adipisci elit
              </p>

              <h4 className='py-4 text-[color:var(--primary)]'>Design tools I use</h4>
              <p className='text-gray-400 py-1'>Photoshop</p>
              <p className='text-gray-400 py-1'>Illustrator</p>
              <p className='text-gray-400 py-1'>After Effect</p>
            </div>
          </div>
        </section>
    )
}

export default ToolsSection;