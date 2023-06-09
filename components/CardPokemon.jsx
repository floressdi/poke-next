import React from "react";
import Cardcss from "../styles/Card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CardPokemon(props) {
  return (
      <Link
        className="mx-auto w-11/12"
        scroll={false}
        href={{
          pathname: "/pokemon/[name]",
          query: { name: props.name },
        }}
      >
        <div className={`${Cardcss.cardpokemon} ${props.type[0].type.name}`}>
          <div className="grid grid-cols-2">
            <div className="h-9">
              <Image
                src={props.img}
                alt={props.name}
                width={90}
                height={90}
              />
            </div>
            <div className="flexbox ml-4" key={props.key}>
              <p className="text-2xl ">{props.name}</p>
              {/* <p className= {Cardcss.typetext}>{props.type[0].type.name}</p> */}

              <div className="flex " >
              {props.type.map((tipos)=>{
                      return(
                        <p key={props.id} className={Cardcss.typetext}>{tipos.type.name}</p>
                      )
                    })
              }
              </div>
            </div>
          </div>

          <div className="flex items-end h-full w-full justify-end">
            <p className={`${Cardcss.idtext} text-3xl md:text-2xl mr-3`}>#{props.id}</p>
          </div>
        </div>
      </Link>
  );
}
