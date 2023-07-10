import { Arapey, Inter, Plus_Jakarta_Sans, Red_Rose } from "next/font/google";
import Homecss from "../styles/Home.module.css";
import logo from "../public/image/pokedex.png";
import CardPokemon from "@/components/CardPokemon";
import Footer from "@/components/Footer";
import { useState } from "react";
import BtnMenu from "@/components/BtnMenu";
import Search from "@/components/Search";
import BotonPoke from "@/components/BotonPoke";
import { Link } from "react-scroll";

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

  const [limite, setLimite] = useState(25);
  const showmore = () => {
    if (limite <= 905) {
      setLimite(limite + 25);
    } else {
      setLimite(limite === 25);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center  ">
      <nav className={`${Homecss.nav} bg-white dark:bg-stone-800`}>
        <div className="w-full flex items-center justify-center">
          <BotonPoke />
          <Search
            // onSubmit={envio}
          />
          <BtnMenu clicked={clickedMenu} handleClickMenu={handleClickMenu} />
        </div>

        {/* Muestra todos los tipos de pokemons */}
        <div className=" w-full">
          <ul className={`ul ${clickedMenu ? "active" : ""}`}>
            <div className="w-11/12 grid gap-3 md:w-full mx-auto  md:overflow-x-auto md:grid-flow-col filtro">
              <Link
                to="sectionpokemons"
                spy={true}
                smooth={true}
                offset={50}
                duration={300}
                className="w-full mx-auto rounded-xl cursor-pointer text-neutral-600 text-2xl p-1 text-center md:text-base  todos md:h-8 md:w-20  "
                onClick={() => filtrar("borrar")}
              >
                Todos
              </Link>

              {tipos.map((tipo, index) => {
                return (
                  <Link
                    key={tipo.name}
                    className={`${tipo.name} p-1 rounded-xl  cursor-pointer text-2xl text-white  text-center md:text-base md:h-8 md:w-24`}
                    to="sectionpokemons"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={300}
                    onClick={() => filtrar(tipo.name)}
                  >
                    {tipo.name}
                  </Link>
                );
              })}
            </div>
          </ul>
        </div>
      </nav>

      {/* Seccion de pokemones */}
      <section id="sectionpokemons" className="w-full  my-10 py-8 ">
        <div className="w-10/12 mx-auto my-3">
          <h2 className=" text-xl md:text-2xl font-normal text-center">
            ¡Busca un pokemon por su nombre o por su numero !
          </h2>
        </div>

        <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* muestra dependiendo el tipo seleccionado y con un limite que se puede actualizar con un boton */}
          {filtro
            ? filtro.map(
                (pokemon, index) =>
                  index < limite && (
                    <CardPokemon
                      key={pokemon.id}
                      name={pokemon.name}
                      id={pokemon.id}
                      type={pokemon.types}
                      img={pokemon.sprites}
                    />
                  )
              )
            : "Cargando..."}
        </div>

        <div className="w-full my-16  flex justify-center  h-auto">
          <button onClick={showmore} className=" btn-show ">
            <span> Mostrar mas pokemons</span>
          </button>
        </div>
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
      `https://pokeapi.co/api/v2/pokemon/${indice}?limit=905&offset=0/` //Pasamos el indice a la api
    );
    const data = await response.json();
    return data;
  };

  let pokemons = []; //Este arreglo guardara los pokemones

  for (let indice = 1; indice <= 905; indice++) {
    let data = await getPokemon(indice); //Ejecutamos getPokemon pasando como parametro el indice
    pokemons.push(data); //los guarda en el arreglo
  }

  let cardPokemoninfo = pokemons.map((pokemon) => {
    //Recorremos para extraer los siguientes datos
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.home.front_default,
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
