import React from 'react'
import Cardcss from "../styles/Card.module.css"
import Link from 'next/link'
import Image from 'next/image'

export default function CardPokemon(props) {
  return (  
    <div className="mx-auto w-9/12 md:w-11/12" key={props.key}>
            <Link
              scroll={false}
              href={{
                pathname: "/pokemon/[name]",
                query: { name: props.name },
              }}
            >
              <div
                className={`${Cardcss.cardpokemon} ${props.type[0].type.name}`}
              >
                <div>
                  <p className="text-2xl md:text-3xl">{props.name}</p>
                  <div className="flex ">
                    <p className="mr-1">#{props.id}</p>
                    {props.type.map((tipos)=>{
                      return(
                        <p className='ml-1'>{tipos.type.name}</p>
                      )
                    })
                    }
                  </div>
                </div>
                <div className={Cardcss.cardpokemonimage}>
                  <Image src={props.img} alt={props.name} width={100} height={100}/>
                </div>
              </div>
            </Link>
      </div>
  )
}