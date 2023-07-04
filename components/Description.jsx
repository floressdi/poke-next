import React from 'react'

export default function Description({ data }){
    return(
        <section className='text-4xl'>
                <p>Aqui va la descripcion!!!!</p>
                <p>{data.color.name}</p>
        </section>
    );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await response.json();

  return {
    props:{
        data
    },
  };
}