import TagSelector from "./TagSelector";

function TagsSection(){
    return (
        <section className="text-white">
          <div>
            <h3 className='text-3xl py-1 text-center '>
              Tags
            </h3>

          </div>

          <div className='flex flex-wrap gap-3 justify-center flex-grow-0 mt-3'>
            <TagSelector tag={'Sussy'}/>
            <TagSelector tag={'Sussy'}/>
            <TagSelector tag={'Sussy'}/>
          </div>
        </section>
    );
}

export default TagsSection;