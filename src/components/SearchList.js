import React, { useEffect, useState } from 'react';
import Card from './Card';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';

function SearchList({ filteredFiles }) 
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
  
  const filtered = filteredFiles.map(archivo => <Card key={archivo.id} archivo={archivo} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;