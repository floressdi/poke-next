import React from "react";

export default function InfoMain(props) {

  function dosDecimales(n){ //Trunca los numeros a 2 decimales
    let t =n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }


  return (
    <section >
      <article className="text-center mb-5">
        <span className="text-xl mr-3">#{props.id}</span>
        <span className="text-xl">{props.type[0].type.name}</span>
        <br />
        <span className="text-5xl md:text-6xl">{props.name}</span>
      </article>

     <div className="flex justify-between text-center section_data_container ">
     <span className="">
        <p className="font-bold">Altura</p>
        <br />
        <p>{dosDecimales((props.height /10000)*1000)} M</p>
      </span>
      <span className="">
        <p className="font-bold">Peso </p>
        <br />
        <p> { dosDecimales((props.weight /10000)*1000)} Kg</p>
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