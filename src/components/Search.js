import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function Search({ details }) 
{

  const [searchField, setSearchField] = useState("");
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);


  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    setNotas(apiData.data.listTodos.items);
  }

  async function listTodo({ id }) {
    const newNotesArray = notas.filter(nota => nota.id !== id);
    setNotas(newNotesArray);
    await API.graphql({ query: listTodos, variables: { input: { id } } });
  }

  //Recogen los valores de los select
  var selectcat = document.getElementById('categoria');
  //var textcat = selectcat.options[selectcat.selectedIndex].text;
  var selectsubcat = document.getElementById('subcategoria');
  //var textsubcat = selectsubcat.options[selectsubcat.selectedIndex].text;
  var selectsubsubcat = document.getElementById('subsubcategoria');
  //var textsubsubcat = selectsubsubcat.options[selectsubsubcat.selectedIndex].text;

  const separarPalabras = notas.map(nota => {
    //var cadena = nota.palabrasclave;
    //var index = cadena.lenght;
    //var primeraParte = cadena.slice(0, index/2);
    //var segundaParte = cadena.slice(index/2,index);
    //var palabra="nosql";
    //var index = cadena.indexOf(palabra);
    //{notas.map(note => note.palabrasclave !== palabrasclave}
  });

 
  const filteredFiles = notas.filter(
    nota => {
      //var cadena = nota.palabrasclave;
      //var index = cadena.length;
      //var primeraParte = cadena.slice(0, index/2);
      //var segundaParte = cadena.slice(index/2,index);
      return (
        nota.nombrearchivo.toLowerCase().includes(searchField.toLowerCase()) ||
        nota.tipoarchivo.toLowerCase().includes(searchField.toLowerCase()) ||
        nota.categoria.toLowerCase().includes(searchField.toLowerCase()) ||
        nota.subcategoria.toLowerCase().includes(searchField.toLowerCase()) ||
        nota.subsubcategoria.toLowerCase().includes(searchField.toLowerCase()) ||
        nota.palabrasclave &&
        nota.palabrasclave.indexOf(searchField.toLowerCase()) > -1 

        //cadena.toLowerCase().includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredFiles={filteredFiles} />
      </Scroll>
    );
  }

  return (

    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      <div className="navy georgia ma0 grow" >
        <h3 className="f2">Busca un archivo</h3>
      </div>

      <div class="row">
        <div class="col-4">

          <div className="form-group">
            <label htmlFor="example3">Palabras clave</label>
            <br />
            
            <ul>
              {notas.map(note => <li key={note.id}><a>{note.palabrasclave}</a></li>)}
            </ul>
            <input
                className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                type="search"
                placeholder="Busca por palabra clave"
                onChange={handleChange}
              />
          </div>

        </div>

        <div class="col-4">

        <div className="form-group">
            <label htmlFor="example3">Nombre de archivo</label>
            <br />
            <form className="form-inline mt-2 mt-md-0">
              <input
                className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                type="search"
                placeholder="Busca un archivo"
                onChange={handleChange}
              />
            </form>
          </div>
          
          <div className="form-group">
            <label htmlFor="example3">Tipo de archivo</label>
            <br />
            <select id="subsubcategoria" className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              onChange={handleChange}
            >
              <option value="application/pdf" selected>PDF</option>
              <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Word</option>
              <option value="image">Imagen</option>
              <option value="video">Video</option>
            </select>
          </div>


        </div>
        <div class="col-4">
          <div className="form-group">
            <label htmlFor="example3">Categoría</label>
            <br />
            <select id="subsubcategoria" className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              onChange={handleChange}
            >
              <option value="sistemas" selected>Sistemas</option>
              <option value="tics">TICS</option>
              <option value="bioquimica">Bioquimica</option>
              <option value="civil">Civil</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="example3">Subcategoría</label>
            <br />
            <select id='subcategoria' className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              onChange={handleChange}
            >
              <option value="bases de datos" selected>Bases de datos</option>
              <option value="programacion">Programacion</option>
              <option value="redes">Redes</option>
              <option value="quimica">Quimica</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="example3">Subsubcategoría</label>
            <br />
            <select id='subsubcategoria' className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              onChange={handleChange}
            >
              <option value="nosql" selected>NoSQL</option>
              <option value="poo">POO</option>
              <option value="hacking">Hacking</option>
            </select>
          </div>

        </div>

        <div class="col-4">


        </div>
      </div>

      <section className="garamond">
      </section>



      {searchList()}
    </Box>

  );
}

export default Search;