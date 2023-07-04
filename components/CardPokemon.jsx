import React from "react";
import Cardcss from "../styles/Card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CardPokemon(props) {
  return (
    <div className="mx-auto w-11/12">
      <Link
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
                width={80}
                height={80}
              />
            </div>
            <div className="flexbox ml-4" key={props.key}>
              <p className="text-2xl ">{props.name}</p>
              <p className="text-white">{props.type[0].type.name}</p>

              {/* {props.type.map((tipos)=>{
                      return(
                        <p className='ml-1'>{tipos.type.name}</p>
                      )
                    })
                    } */}
            </div>
          </div>

          <div className="flex items-end h-full w-full justify-end">
            <p className={`${Cardcss.idtext} text-3xl md:text-2xl mr-3`}>#{props.id}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
