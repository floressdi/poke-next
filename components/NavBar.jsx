import React, { useState } from 'react'
import pokebola from "../public/image/pokebola.png";
import Navcss from "../styles/Nav.module.css"
import Search from './Search';
import Image from 'next/image';
import BtnMenu from './BtnMenu';


export default function NavBar(props) {

    const [clickedMenu, setClickedMenu] = useState(false);
    const handleClickMenu = () =>{
        setClickedMenu(!clickedMenu)
    }
  

  return (
    <nav className={Navcss.nav}>
      <span className="w-10 mr-3">
        <Image src={pokebola} alt="logo"/>
      </span>
      <Search />
      <ul className={`ul ${clickedMenu ? "active" : ""}`}> 
          <button className='text-2xl ml-14 px-4 my-3 hover:bg-blue-300 transition-all hover:pl-3 hover:text-cyan-700 '>Mostrar Todos</button>
          <div className='w-6/12  grid gap-3 '>
              {props.tipos.map((tipo, index)=>{
                return(
                  <button 
                    key={tipo.name}
                    className="text-2xl text-left ml-14 px-4 cursor-pointer hover:bg-blue-300 transition-all hover:pl-3 hover:text-cyan-700"
                    onClick={()=>filtrar(tipo.name)}
                  >
                    {tipo.name}
                  </button>
                )
              })
              }
          </div>
      </ul>
      <BtnMenu 
            clicked={clickedMenu}  
            handleClickMenu={handleClickMenu} 
      />
    </nav>
  )
}
