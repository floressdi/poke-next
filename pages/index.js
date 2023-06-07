import Image from "next/image";
import { Inter, Plus_Jakarta_Sans, Red_Rose } from "next/font/google";
import { data } from "autoprefixer";
import Homecss from "../styles/Home.module.css";
import logo from "../public/image/pokedex.png";
import Search from "@/components/Search";
import CardPokemon from "@/components/CardPokemon";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ['latin'] })

export default function Home({pokemoneslistos, cardPokemoninfo, notFound }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between ">
    <nav className={Homecss.nav}>
      <span className="w-32 mt-2">
        <Image src={logo} alt="logo"/>
      </span>
      <Search />
    </nav>

    <section className="w-full my-24 py-8 ">
      <h2 className=" text-xl md:text-2xl font-normal text-center">
        ¡Mas de 800 pokemones, elige tu favorito!
      </h2>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
        {cardPokemoninfo.map((pokemon) => (
          <CardPokemon
            key ={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            type={pokemon.types}
            img={pokemon.sprites}
          />
        ))}
      </div>
    </section>

    <footer className="w-full">
      <Footer
        logo = {logo}
      />
    </footer>
  </div>
  )
}

export const getStaticProps = async (context) => {
  const getPokemon = async (indice) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${indice}?limit=102&offset=0/`
    );
    const data = await response.json();
    return data;
  };

  let pokemons = [];
  for (let indice = 1; indice <= 102; indice++) {
    let data = await getPokemon(indice);
    pokemons.push(data);
  }

  let cardPokemoninfo = pokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    };
  });

  return {
    props: {
      cardPokemoninfo,
    },
  };
};
