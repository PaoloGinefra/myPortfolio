import ProjectCard from "./ProjectCard";
import ToolsSection from "../Tools/ToolsSection";
import Tools from "../../../public/data/Tools.json";
import TagsSection from "../Tag/TagsSection";
import EmptySelection from "./EmptySlection";
import Divider from "../utils/Divider";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";
import { arrayFromHex, HexFromArray } from "@/utils/querySelectionParser";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function ProjectSection({
  projects,
  tags,
  openModal,
  setProject,
  currentTitle,
  currentTitleProjectsDescription,
}) {
  const router = useRouter();

  const [SelectedTools, setSelectedTools] = useState(
    Tools.map((tool) => tool.Selected)
  );
  const [SelectedTags, setSelectedTags] = useState(
    tags != undefined && tags != null && tags.length != 0
      ? Object.assign(...tags.map((tag) => ({ [tag]: true })))
      : {}
  );
  const [Verbose, setVerbose] = useState(false);

  //Sets the query parameters
  useEffect(() => {
    const { toolsHex, tagsHex, verbose } = router.query;

    if (toolsHex) setSelectedTools(arrayFromHex(toolsHex, Tools.length));

    if (tagsHex) {
      const tagsArray = arrayFromHex(tagsHex, tags.length);
      setSelectedTags(
        Object.assign(...tags.map((tag, i) => ({ [tag]: tagsArray[i] })))
      );
    }

    setVerbose(verbose != undefined);
  }, [router, tags]);

  function toggleSelectTool(id) {
    const newSlectedTools = SelectedTools.map((selected, index) =>
      index == id ? !selected : selected
    );
    setSelectedTools(newSlectedTools);

    if (Verbose) console.log("toolsHex=" + HexFromArray(newSlectedTools));

    return SelectedTools[id];
  }

  function toggleSelectTag(tag) {
    SelectedTags[tag] = !SelectedTags[tag];
    setSelectedTags({ ...SelectedTags });

    if (Verbose)
      console.log("tagsHex=" + HexFromArray(Object.values(SelectedTags)));

    return SelectedTags[tag];
  }

  function hasRightCategory(project) {
    return project.data.categories.some(
      (category) => category === currentTitle
    );
  }

  function projectsToRender() {
    let empty = true;

    const projectsArray = projects.map((project) => {
      const hasSelectedTool = project.data.tools.some((toolName) => {
        const id = Tools.find((tool) => tool.Name === toolName).id;
        return SelectedTools[id];
      });

      const hasSelectedTag = project.data.tags.some((tag) => SelectedTags[tag]);

      const hasSelectedCategory = hasRightCategory(project);

      const render = hasSelectedTool && hasSelectedTag && hasSelectedCategory;

      empty = !render && empty;

      return (
        <AnimatePresence
          key={project.data.title}
          initial={false}
          mode={"wait"}
          onExitComplete={() => null}
        >
          {render && (
            <VerticalTimelineElement
              contentStyle={{
                background: "rgba(0, 0, 0, 0)",
                boxShadow: "0px 0px",
                padding: "0",
              }}
              contentArrowStyle={{ borderRight: "7px solid  var(--primary)" }}
              date={project.data.date}
              iconStyle={{ background: "var(--primary)" }}
            >
              <ProjectCard
                project={project}
                openModal={openModal}
                setProject={setProject}
                key={project.slug}
              />
            </VerticalTimelineElement>
          )}
        </AnimatePresence>
      );
    });

    if (empty)
      projectsArray.push(
        <VerticalTimelineElement
          key={"empty__"}
          contentStyle={{
            background: "rgba(0, 0, 0, 0)",
            boxShadow: "0px 0px",
            padding: "0",
          }}
          contentArrowStyle={{ borderRight: "10px solid  gray" }}
          iconStyle={{ background: "gray" }}
        >
          <EmptySelection />
        </VerticalTimelineElement>
      );

    return projectsArray;
  }

  return (
    <>
      <section className="text-white">
        <div>
          <h3 className="text-4xl py-1 text-center pt-1 font-bold mb-5">
            Projects
          </h3>
          <p className="text-md py-2 leading-8 text-gray-400">
            {currentTitleProjectsDescription}
          </p>
        </div>

        <Divider />

        <ToolsSection
          toggleSelectTool={toggleSelectTool}
          SelectedTools={SelectedTools}
          projects={projects}
          hasRightCategory={hasRightCategory}
        />

        <TagsSection
          tags={tags}
          toggleSelectTag={toggleSelectTag}
          SelectedTags={SelectedTags}
        />

        <p className="mx-auto text-center text-gray-400 italic">
          Click on a tool or a tag to slect/deselct it
        </p>

        <Divider />

        <VerticalTimeline>{projectsToRender()}</VerticalTimeline>
      </section>
    </>
  );
}

export default ProjectSection;
