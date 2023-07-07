import React, { useEffect, useState } from 'react'

export default function Description( prop){
  async function getData(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${prop.id}/`)
    const datos = await response.json();
    return datos;
  }

  getData()
    // const [data, setData] = useState(null);
    // useEffect(()=>{
    //   fetch(`https://pokeapi.co/api/v2/pokemon-species/${prop.id}/`)
    //    .then((response) => response.json())
    //    .then((data)=> setData(data));
    // }, []);


    return(
        <section className='text-4xl'>
                <p>Aqui va la descripcion!!!!</p>
                <p>{prop.id}</p>
                {/* <p>{datos.id}</p> */}
                {/* {datos.map((item)=>(
                      <div key={item.id}>
                        <p>{item.id}</p>
                      </div> 
                ))} */}
        </section>
    );
}

// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
//   const data = await response.json();

//   return {
//     props:{
//         data
//     },
//   };
// }