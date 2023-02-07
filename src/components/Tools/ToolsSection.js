/* eslint-disable react/jsx-key */
import ToolCard from "./ToolCard"
import Tools from '../../../public/data/Tools.json'

function ToolsSection(){
    return (
        <section className="text-white">
          <div>
            <h3 className='text-3xl py-1 text-center '>
              Tools I use
            </h3>

          </div>

          <div className='flex flex-wrap gap-16 justify-center flex-grow-0'>
            {Tools.map((tool) => {
                return <ToolCard title={tool.Name} imgSrc={tool.ImgSrc} status={'Advanced'}/>
              })}

          </div>
        </section>
    )
}

export default ToolsSection;