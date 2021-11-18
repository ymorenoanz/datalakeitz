import React, { useEffect, useState } from 'react';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';
import { useParams } from "react-router";
import SearchPC from '../components/SearchPC';
import { useHistory, useLocation } from "react-router-dom";

function BuscarPalabraClave() 
{

  const [notas, setNotas] = useState([]);

    useEffect(() => 
    {
      fetchNotes();
    }, []);
  
      //Leer los datos del link
  //const {id} = useParams();
    
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
      <SearchPC details={listTodo}/>
    </div>
  );
}

export default BuscarPalabraClave;