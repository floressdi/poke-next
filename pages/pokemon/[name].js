import React from "react";
import Pokecss from "../../styles/Pokedata.module.css";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import Link from "next/link";
import Stats from "@/components/Stats";
import InfoMain from "@/components/InfoMain";
// import Description from "@/components/Description";
import Image from "next/image";

export default function Pokemon({ data}) {
  return (
    <main className={`${data.types[0].type.name} ${Pokecss.main}`}>
      <header className={`${data.types[0].type.name} ${Pokecss.header}`}>
        <nav className="w-11/12 mb-14 h-14   ">
          <Link href="../">
            <div className="w-3/6 h-full  text-4xl flex items-center">
              <IoIosArrowBack />
              <p className="text-2xl">Pokédex</p>
            </div>
          </Link>
        </nav>
        <Image src={data.sprites.other.home.front_default} width={250} height={250} alt={data.name}/>
      </header>

      {/* Informacion importante */}
      <section className="py-6 md:w-8/12 lg:w-6/12 md:mx-auto">
        <div className="w-11/12 mx-auto">
          <InfoMain
            id={data.id}
            name={data.name}
            type={data.types}
            height={data.height}
            weight={data.weight}
            specie={data.species.name}
            abilities={data.abilities}
          />

          {/* Estadisticas  */}
          <section className="section_data_container mb-7">
            <h3 className="font-bold my-3 text-center ">Estadisticas</h3>
            {data.stats.map((element, index) => (
              <Stats
                key = {data.id}
                element_name={element.stat.name}
                element_base={element.base_stat}
              />
            ))}
          </section>

          {/* <Description
            id={data.id}
          /> */}
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  
  const respone = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await respone.json();

  return {
    props: {
      data
    },
  };
}