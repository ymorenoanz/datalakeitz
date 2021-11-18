import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchListPC from './SearchListPC';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import ReactDOM from "react-dom";
import { useHistory, useLocation } from "react-router-dom";
import SplitTextJS from 'split-text-js';

function SearchPC({ details }) {

    const [searchField, setSearchField] = useState("");
    const [notas, setNotas] = useState([]);
    const [pc, setPc] = useState([])

    //Recogemos los valores de la URL y los guardamos en dos constantes
    //Previamente enviamos los parámetros id y palabrasclave a través del Link
    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");
    let palabrasclave = query.get("palabrasclave");
    //let hashtag= palabrasclave.split(" ");

    useEffect(() => {
        fetchNotes();
    }, []);


    async function fetchNotes() 
    {
        const apiData = await API.graphql({ query: listTodos });
        setNotas(apiData.data.listTodos.items);
    }

    //Filtramos las notas indicando en la condición de que si el id es igual al de la nota mostramos los resultados
    const filteredFiles = notas.filter(
        nota => 
        {
            let pc= nota.palabrasclave;
            if(id == nota.id )
            {
                return (
                    palabrasclave && palabrasclave.indexOf(searchField.toLowerCase()) > -1 ||
                    palabrasclave.toLowerCase().includes(searchField.toLowerCase())
                    //primeraParte.toLowerCase().includes(searchField.toLowerCase()) && 
                    //segundaParte.toLowerCase().includes(searchField.toLowerCase())
                );
            }
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    function searchList() 
    {
        return (
            <Scroll>
                <SearchListPC filteredFiles={filteredFiles} />
            </Scroll>
        );
    }

  
   /*  const hashTags = notas.map(
      nota => 
      {
          let pc= nota.palabrasclave;
          const splittedText = new SplitTextJS(pc);
          const textWords = splittedText.words;

          return textWords;
      }
  ); */

   /* const separarPalabras = notas.map(nota => {
    let cadena = document.getElementById("palabrasclave");
    let palabras= cadena.textContent;
    var index = palabras.length;
    var primeraParte = palabras.slice(0, index/2);
    var segundaParte = palabras.slice(index/2,index);
    //var index = cadena.indexOf(palabra);
    //{notas.map(note => note.palabrasclave !== palabrasclave}
  }); */


     

    return (
      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
        <div className="navy georgia ma0 grow">
          <h3 className="f2">Busca un archivo</h3>
        </div>

        <div class="row">
          <div class="col-10">
            <div className="form-group">
              <label htmlFor="example3">Palabras clave</label>
              <br />

              <ul id="palabrasclave" class="ul">
                {notas && notas.map((note) => (
                  <li key={note.id}>
                    <Link
                      to={`/BuscarPalabraClave?id=${note.id}&palabrasclave=${note.palabrasclave}`}  onChange={handleChange}>
                        {note.palabrasclave}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <section className="garamond"></section>
        {searchList()}
      </Box>
    );
}

export default SearchPC;