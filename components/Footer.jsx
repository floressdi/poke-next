import React from "react";
import Footercss from "../styles/Footer.module.css";
import Image from "next/image";
export default function Footer(props) {
  return (
    <div className="w-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#273036"
          fill-opacity="1"
          d="M0,96L1440,256L1440,320L0,320Z"
        ></path>
      </svg>
      <div className={Footercss.footercontainer}>
        <div className="grid grid-cols-2 mx-auto pb-4">
          <div className="w-32 mx-auto">
            <Image src={props.logo} alt="logo"></Image>
          </div>
          <div className="">
            <p className="text-2xl">Tecnologías </p>
            <ul>
              <li>
                <a href="https://nextjs.org/" target="blank">Hecho con Next JS</a>
              </li>
              <li>
                <a href="https://tailwindcss.com/docs/guides/nextjs" target="blank">
                  Hecho con Tailwind CSS
                </a>
              </li>
              <li>
                <a href="https://react-icons.github.io/react-icons/" target="blank">
                  Uso de React iconos
                </a>
              </li>
              <li>
                <a href="https://pokeapi.co/" target="blank">Uso de pokeapi</a>
              </li>
              <li>
                <a href="https://fontmeme.com/es/fuente-pokemon/" target="blank">
                  Uso de Logo pokédex
                </a>
              </li>
              <li>
                <a href="https://github.com/algolia/autocomplete" target="blank">
                  Autocompletado con Algolia
                </a>
              </li>
              <li>
                <a href="https://github.com/floressdi/poke-next" target="blank">¡Quiero ver el codigo!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
