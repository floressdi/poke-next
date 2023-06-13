import { Arapey, Inter, Plus_Jakarta_Sans, Red_Rose } from "next/font/google";
import { data } from "autoprefixer";
import Homecss from "../styles/Home.module.css";
import logo from "../public/image/pokedex.png";
import CardPokemon from "@/components/CardPokemon";
import Footer from "@/components/Footer";
import pokebola from "../public/image/pokebola.png";
import { useState } from "react";
import BtnMenu from "@/components/BtnMenu";
import Search from "@/components/Search";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
  pokemoneslistos,
  cardPokemoninfo,
  tipos,
  notFound,
}) {


  const [filtro, setFiltrar] = useState(cardPokemoninfo);

  const [clickedMenu, setClickedMenu] = useState(false); //manejaremos el estado del menu
  const handleClickMenu = () => {
    setClickedMenu(!clickedMenu);
  };

  const filtrar = (elTipo) => {
    setFiltrar(cardPokemoninfo);

      if (elTipo === "borrar") {
        setFiltrar(cardPokemoninfo);
        setClickedMenu(!clickedMenu); //acutaliza el estado del click en el menu
      } else {
        setClickedMenu(!clickedMenu); //acutualiza el estado del click en el menu
        let filtradoPorTipo = cardPokemoninfo
          .filter((pokemon) =>
            pokemon.types.some((tipo) => tipo.type.name === elTipo)
          )
          .map((tem2) => {
            let nuevosTem = { ...tem2 };
            return nuevosTem;
          });
        setFiltrar(filtradoPorTipo);
      }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between ">
      <nav className={Homecss.nav}>
        <span className="w-10 mr-3">
          <Image src={pokebola} alt="logo" />
        </span>
        <Search />

        {/* Muestra todos los tipos de pokemons */}
        <div>
          <ul className={`ul ${clickedMenu ? "active" : ""}`}>
            <button
              className="w-11/12 mx-auto rounded-xl  text-2xl md:ml-14 p-2 ml-5 my-3 todos "
              onClick={() => filtrar("borrar")}
            >
              Mostrar Todos
            </button>
            <div className="w-11/12 grid gap-3 mx-auto  ">
              {tipos.map((tipo, index) => {
                return (
                  <button
                    key={tipo.name}
                    className={`${tipo.name} p-2 rounded-xl text-2xl`}
                    onClick={() => filtrar(tipo.name)}
                  >
                    {tipo.name}
                  </button>
                );
              })}
            </div>
          </ul>
        </div>
        <BtnMenu clicked={clickedMenu} handleClickMenu={handleClickMenu} />
      </nav>

      {/* Seccion de pokemones */}
      <section className="w-full md:w-11/12 my-10 py-8 ">
        <div className="w-10/12 mx-auto my-3">
          <h2 className=" text-xl md:text-2xl font-normal text-center">
            ¡Busca un pokemon por su nombre o por su numero !
          </h2>
        </div>

        <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* muestra dependiendo el tipo seleccionado */}
          {filtro
            ? filtro.map((pokemon) => (
                <CardPokemon
                  key={pokemon.id}
                  name={pokemon.name}
                  id={pokemon.id}
                  type={pokemon.types}
                  img={pokemon.sprites}
                />
              ))
            : "Cargando..."}
        </div>

        {/* <div className="w-full my-16  flex justify-center  h-auto">
          <button onClick={funcion} className="text-center w-64 h-14  bg-yellow-300  rounded-lg">
            Mostrar mas pokemons
          </button>
        </div> */}


      </section>

      <footer className="w-full">
        <Footer logo={logo} />
      </footer>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const resTipos = await fetch("https://pokeapi.co/api/v2/type"); //Traemos los tipos de pokemons
  const tipos = await resTipos.json();

  const getPokemon = async (indice) => {
    //Traemos pokemones de acuerdo al indicie
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${indice}?limit=704&offset=0/` //Pasamos el indice ala api
    );
    const data = await response.json();
    return data;
  };

  let pokemons = []; //Este arreglo guardara los pokemones

  let inicio = 1
  let limite = 204

  // if(context == true){ // si mostrar mas es verdadero aumenta el limite 
  //    limite += limite;
  // }  

  for (let indice = inicio; indice <= limite; indice++) {
    let data = await getPokemon(indice);//Ejecutamos getPokemon pasando como parametro el indice
    pokemons.push(data);//los guarda en el arreglo
    inicio = limite;
  }

  let cardPokemoninfo = pokemons.map((pokemon) => {
    //Recorremos para extraer los siguientes datos
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    };
  });

  return {
    props: {
      tipos: tipos.results,
      cardPokemoninfo,
    },
  };
};
