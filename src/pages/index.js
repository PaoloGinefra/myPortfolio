import Head from "next/head";
import NavBar from "@/components/NavBar";
import Name from "@/components/Name";
import TitleDescription from "@/components/Title/TitleDescription";
import IconLinks from "@/components/IconLinks";
import Avatar from "@/components/Avatar";
import ProjectSection from "@/components/Projects/ProjectsSection";
import ProjectModal from "@/components/Projects/ProjectModal/ProjectModal";
import TitleSection from "@/components/Title/TitleSection";
import Divider from "@/components/utils/Divider";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { getAllProjects } from "./api/getProjects";
import { getHueVariants } from "@/utils/ColorChanger";
import { motion } from "framer-motion";

import Titles from "public/data/Titles";
import P5Test from "@/P5/p5Test";

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

  const router = useRouter();

  useEffect(() => {
    const { titleIndex } = router.query;
    if (titleIndex != undefined) setTitleIndex(parseInt(titleIndex));
  }, [router]);

  const updateTitleIndex = (delta) => {
    setTitleIndex(
      (TitleIndex + delta + TitlesNames.length) % TitlesNames.length
    );
  };

  return (
    <>
      <Head>
        <title>Paolo Ginefra Portfolio</title>
        <meta name="description" content="This is my portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className="relative bg-black px-10 md:px-20 lg:px-40 z-10"
        animate={TitlesNames[TitleIndex]}
        variants={HueVariants}
      >
        <section className="relative mb-20">
          <NavBar />

          <Name />

          <div className="absolute w-full top-0 -translate-y-1/2 -z-20 flex justify-center">
            <div className="">
              <P5Test />
            </div>
          </div>

          <div className="relative text-center p-10 pt-0">
            <TitleSection
              titlesNames={TitlesNames}
              updateTitle={updateTitleIndex}
              titleIndex={TitleIndex}
              colors={Object.values(HueVariants).map(
                (value) => value["--primary"]
              )}
            />

            <div className="relative w-full h-40 max-w-lg mx-auto mt-5">
              {TitlesNames.map((name, index) => {
                return (
                  <AnimatePresence key={name}>
                    {index == TitleIndex && (
                      <TitleDescription>
                        {TitlesData[TitleIndex].Description}
                      </TitleDescription>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>
          </div>
          <IconLinks />
        </section>

        <Divider />

        <ProjectSection
          projects={projects}
          tags={tagsPerName[TitlesNames[TitleIndex]]}
          openModal={openModal}
          setProject={setSelectedProject}
          currentTitle={TitlesNames[TitleIndex]}
          currentTitleProjectsDescription={
            TitlesData[TitleIndex].ProjectsDescription
          }
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
