import Head from "next/head";
import deved from "../../public/dev-ed-wave.png";
import NavBar from "@/components/NavBar";
import Name from "@/components/Name";
import TitleName from "@/components/Title/TitleName";
import TitleDescription from "@/components/Title/TitleDescription";
import IconLinks from "@/components/IconLinks";
import Avatar from "@/components/Avatar";
import ProjectSection from "@/components/Projects/ProjectsSection";
import ProjectModal from "@/components/Projects/ProjectModal/ProjectModal";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { getAllProjects } from "./api/getProjects";
import { getHueVariants } from "@/utils/ColorChanger";
import { motion } from "framer-motion";

import Titles from "public/data/Titles";

const TitlesNames = Object.keys(Titles);
const TitlesData = Object.values(Titles);

const HueVariants = getHueVariants(TitlesNames, TitlesData);

export default function Home({ projects, tagsPerName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const closeModal = () => setModalOpen(false);
  const openModal = () => {
    setModalOpen(true);
  };

  //Stop scrolling when Modal is Open
  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  const [TitleIndex, setTitleIndex] = useState(0);

  const incrementTitleIndex = () =>
    setTitleIndex((TitleIndex + 1 + TitlesNames.length) % TitlesNames.length);

  const decrementTitleIndex = () =>
    setTitleIndex((TitleIndex - 1 + TitlesNames.length) % TitlesNames.length);

  return (
    <>
      <Head>
        <title>Paolo Ginefra Portfolio</title>
        <meta name="description" content="This is my portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className="bg-black px-10 md:px-20 lg:px-40"
        animate={TitlesNames[TitleIndex]}
        variants={HueVariants}
      >
        <section className=" min-h-screen mb-10">
          <NavBar />

          <Name textColor="text-teal-600" />

          <div className="text-center p-10">
            <TitleName
              title={Object.keys(Titles)[TitleIndex]}
              titleUp={incrementTitleIndex}
              titleDown={decrementTitleIndex}
            />
            <TitleDescription>
              {Object.values(Titles)[TitleIndex].Description}
            </TitleDescription>
          </div>

          <IconLinks />

          <Avatar imageSrc={deved} />
        </section>

        <ProjectSection
          projects={projects}
          tags={tagsPerName[TitlesNames[TitleIndex]]}
          openModal={openModal}
          setProject={setSelectedProject}
          currentTitle={TitlesNames[TitleIndex]}
        />

        <AnimatePresence
          initial={false}
          mode={"wait"}
          onExitComplete={() => null}
        >
          {modalOpen && (
            <ProjectModal
              modalOpen={modalOpen}
              handleClose={closeModal}
              post={selectedProject}
            />
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
}

export async function getStaticProps(context) {
  const projects = getAllProjects();

  const tags = {};

  TitlesNames.forEach((name) => {
    tags[name] = new Set();

    projects.forEach((project) => {
      if (project.data.categories.some((category) => category == name))
        project.data.tags.forEach((tag) => tags[name].add(tag));
    });

    tags[name] = Array.from(tags[name]);
  });

  return {
    props: {
      projects,
      tagsPerName: tags,
    },
  };
}
