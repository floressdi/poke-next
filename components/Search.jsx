import React from "react";
import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from "next/link";

const AutocompleteItem = ({name, img }) => {
  return (
    <li>
      <Link href={`/pokemon/${name}`}>
        <p>
          {/* <img className="w-12 h-12 object-contain"  src={img} alt={name} /> */}
          <div className="ml-2">
            <h3>{name}</h3>
          </div>
        </p>
      </Link>
    </li>
  );
};

export default function Search(props) {
   const [autocompleteState, setAutocompleteState] = useState({
        collections :[],
        isOpen: false
   }) 

   const autocomplete = useMemo(()=> createAutocomplete ({
    placeholder:'Buscar Pokemon',
    onStateChange : ({state})=> setAutocompleteState(state),
    getSources: ()=>[{
        sourceId: 'offers-next-api',
        getItems:({query}) =>{
            if(!!query){
                return fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
                .then(res => res.json())
            }
        }
    }],
    ...props
   }), [props])

   const formRef = useRef(null)
   const inputRef = useRef(null)
   const panelRef = useRef(null)

   const formProps = autocomplete.getFormProps({
        inputElement : inputRef.current
   })

   const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
   })

  return(
    <form ref={formRef} className="flex justify-center " {...formProps}>
        <div  className="flex relative p-1  ">
            <input ref={inputRef} className="flex-1 p-2 pl-4  rounded-full w-full text-center "{...inputProps} />
            {
                autocompleteState.isOpen && (
                    <div className="w-10/12  absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10" ref={panelRef} {...autocomplete.getPanelProps()}>
                        {autocompleteState.collections.map((collection,index)=>{
                             const {items} = collection
                             console.log({items})
                             return(
                                <section key={`section-${index}`}>
                                    {items.length > 0 && (

                                        <ul {...autocomplete.getListProps()}>
                                            {
                                                items.map(item => <AutocompleteItem key ={item.id}{...item}/>)
                                            }
                                        </ul>
                                    )} 
                                </section>
                             )
                        })}
                    </div>
                )
            }
        </div>
    </form>
  );
}