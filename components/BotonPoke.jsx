import React from 'react'
import pokebola from "../public/image/pokebola.png";
import Image from "next/image";
import { useTheme } from 'next-themes'

export default function BotonPoke() {

  const {systemTheme, theme, setTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme; 
    
  return (
    <button
        onClick={()=> theme == "dark" ? setTheme('light'):setTheme("dark")}
        className='w-9 mr-3 md:w-8'
    >
          <Image src={pokebola} alt="logo" />   
    </button>
  )
}
