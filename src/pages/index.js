import Head from 'next/head'
import deved from "../../public/dev-ed-wave.png"
import NavBar from '@/components/NavBar'
import Name from '@/components/Name'
import Title from '@/components/Title/Title'
import TitleDescription from '@/components/Title/TitleDescription'
import IconLinks from '@/components/IconLinks'
import Avatar from '@/components/Avatar'
import ToolsSection from '@/components/Tools/ToolsSection'
import ProjectSection from '@/components/Projects/ProjectsSection'
import ProjectModal from '@/components/Projects/ProjectModal/ProjectModal'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => {setModalOpen(true);};


  return (
    <>
      <Head>
        <title>Paolo Ginefra Portfolio</title>
        <meta name="description" content="This is my portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black px-10 md:px-20 lg:px-40'>
        <section className=' min-h-screen mb-10'>
          <NavBar/>

          <Name textColor='text-teal-600'/>

          <div className='text-center p-10'>
            <Title/>
            <TitleDescription/>
          </div>

         <IconLinks/>

         <Avatar imageSrc={deved}/>

        </section>

        <ToolsSection/>

        <ProjectSection openModal={openModal}/>

        <AnimatePresence 
          initial={false}
          mode = {'wait'}
          onExitComplete={() => null}
          >
          {modalOpen && <ProjectModal modalOpen={modalOpen} handleClose={closeModal} text = 'Suuuuus'/>}
        </AnimatePresence>


      </main>
    </>
  )
}
