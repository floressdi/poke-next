import React from "react";

export default function Stats(props) {
  return (
    <article className="grid grid-cols-2 items-center" key={props.key}>
      <div className="grid grid-cols-2">
        <p className="mr-2"> {props.element_name}</p>
        <p> {props.element_base}</p>
      </div>
      <progress
        className="barra"
        max="225"
        value={`${props.element_base}`}
      ></progress>
    </article>
  );
}