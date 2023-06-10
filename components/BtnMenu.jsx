import React from 'react'
import {BiMenu} from 'react-icons/bi'
import Btncss from "../styles/Btnmenu.module.css"


export default function BtnMenu(props) {
  return (
    <button className={Btncss.btnmenu}
        onClick={props.handleClickMenu}
    >
      <BiMenu/>
    </button>
  )
}
