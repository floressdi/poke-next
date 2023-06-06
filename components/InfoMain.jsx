import React from "react";

export default function InfoMain(props) {
  return (
    <section >
      <article className="text-center mb-5">
        <span className="text-xl mr-3">#{props.id}</span>
        <span className="text-xl">{props.type[0].type.name}</span>
        <br />
        <span className="text-6xl">{props.name}</span>
      </article>

     <div className="flex justify-between text-center section_data_container ">
     <span className="">
        <p className="font-bold">Altura</p>
        <br />
        {props.height}
      </span>
      <span className="">
        <p className="font-bold">Peso </p>
        <br />
        {props.weight}
      </span>
      <span>
        <p className="font-bold">Especie</p>
        <br />
        {props.specie}
      </span>
      <span>
        <h3 className="font-bold"> Habilidades</h3>
        {props.abilities.map((element, index) => (
          <div key={index}>
            <p>{element.ability.name}</p>
          </div>
        ))}
      </span>
     </div>
    </section>
  );
}