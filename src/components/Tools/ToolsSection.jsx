import ToolCard from "./ToolCard";
import Tools from "../../../public/data/Tools.json";

function ToolsSection({
  toggleSelectTool,
  SelectedTools,
  projects,
  hasRightCategory,
}) {
  return (
    <section className="text-white">
      <div>
        <h3 className="text-3xl py-1 text-center ">Tools I use</h3>
      </div>

      <div className="flex flex-wrap gap-16 justify-center flex-grow-0">
        {Tools.map((tool) => {
          if (
            projects.some(
              (project) =>
                hasRightCategory(project) &&
                project.data.tools.some((toolName) => toolName == tool.Name)
            )
          )
            return (
              <ToolCard
                key={tool.Name}
                tool={tool}
                toggleSelectTool={toggleSelectTool}
                isSelected={SelectedTools[tool.id]}
              />
            );
        })}
      </div>
    </section>
  );
}

export default ToolsSection;
