import React from "react";
import { setHue } from "@/utils/ColorChanger";

function NavBar(){
    return (
    <nav className='py-10 mb-12 flex justify-between text-white'>
    <h1 className='text-xl'>
      developed by
    </h1>
    <ul className='flex items-center'>
      <li><button
      className=' bg-gradient-to-r from-[color:var(--primary-darkened)]  to-[color:var(--primary)]  text-white px-4 py-2 rounded-md ml-8' href="#"
      onClick={() => setHue(34)}
      >Resume</button></li>
    </ul>
  </nav>)
}

export default NavBar;