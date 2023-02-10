import TagSelector from "./TagSelector";

function TagsSection({tags, toggleSelectTag}){
    return (
        <section className="text-white mb-3">
          <div>
            <h3 className='text-3xl py-1 text-center '>
              Tags
            </h3>

          </div>

          <div className='flex flex-wrap gap-3 justify-center flex-grow-0 mt-3'>
            {
              tags.map(tag => <TagSelector key = {tag} tag={tag} toggleSelectTag={toggleSelectTag}/>)
            }
          </div>
        </section>
    );
}

export default TagsSection;