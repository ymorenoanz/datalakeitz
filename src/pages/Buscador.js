import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';


function Buscador() 
{

    const [notas, setNotas] = useState([]);

    useEffect(() => {
      fetchNotes();
    }, []);
  
    
    async function fetchNotes() 
    {
      const apiData = await API.graphql({ query: listTodos });
      setNotas(apiData.data.listTodos.items);
    }
  
    async function listTodo({ id }) 
    {
      const newNotesArray = notas.filter(nota => nota.id !== id);
      setNotas(newNotesArray);
      await API.graphql({ query: listTodos, variables: { input: { id } } });
    }
  return (
    <div className="tc bg-green ma0 pa4 min-vh-100" >
      <Search details={listTodo}/>
    </div>
  );
}

export default Buscador;