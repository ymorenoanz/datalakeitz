import { React, useState, useEffect} from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, Storage } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import {createTodo as createTodoMutation} from "../graphql/mutations";
import { Button } from "react-bootstrap";
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stack from '@mui/material/Stack'

//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

// create function to work with Storage

const initialFormState = {
  nombrearchivo: "",
  tipoarchivo: "",
  archivo: "",
  tamanoarchivo: parseFloat,
  categoria: "",
  subcategoria: "",
  subsubcategoria: "",
  rutadocumento: "",
  autor: "",
  resumendocumento: "",
  palabrasclave: ""
};

function LoadFile() 
{
  const [notas, setNotas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => 
  {
    fetchNotes();
  }, []);

  //Esta función utiliza el tipo de API para enviar una consulta a la API de GraphQL
  //y recuperar una lista de notas.
  async function fetchNotes() 
  {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(
      notesFromAPI.map(async (nota) => 
      {
        if (nota.archivo) 
        {
          const file = await Storage.get(nota.archivo);
          nota.archivo = file;
        }
        return nota;
      })
    );
    setNotas(apiData.data.listTodos.items);
  }

  //Esta función crea un archivo JSON y guarda los metadatos del archivo
  async function createTodo() 
  {
    if (!formData.nombrearchivo || !formData.tipoarchivo) return;
    await API.graphql({
      query: createTodoMutation,
      variables: { input: formData },
    });
    try 
    {
      if (formData.archivo) 
      {
        const file = await Storage.get(formData.archivo);
        formData.file = file;
      }
      setNotas([...notas, formData]);
      setFormData(initialFormState);
      swal("Archivo enviado");
    } catch (error) 
    {
      swal("Error uploading file", error);
    }
  }

  //Esta función maneja la carga del archivo
  async function onChange(e) 
  {
    if (!e.target.files[0]) return;
    //Para crear una referencia a la progressbar
    var progressDiv = document.getElementById("myProgress");
    progressDiv.style.display="block";
    var progressBar = document.getElementById("myBar");
    //Aquí carga el archivo
    const file = e.target.files[0];
    let fileUpload = 
    {
      progressStatus: 0,
      status: 'Uploading..',
    }
    //Calculamos el porcentaje de subida
    await Storage.put(file.name, file,
    {
      progressCallback(progress) 
      {
        //swal(`Cargado: ${progress.loaded}/${progress.total}`);
        let progressPercentage = Math.round(progress.loaded / progress.total * 100);
        console.log(progressPercentage);
        progressBar.style.width = progressPercentage + "%";
        if (progressPercentage < 100) 
        {
          fileUpload.progressStatus = progressPercentage;
 
        } else if (progressPercentage == 100) 
        {
          fileUpload.progressStatus = progressPercentage;
 
          fileUpload.status = "Uploaded";
        }
      },
    } );

    //Recogen los valores de los select
    /*var selectcat = document.getElementById('categoria');
    var textcat = selectcat.options[selectcat.selectedIndex].text;
    var selectsubcat = document.getElementById('subcategoria');
    var textsubcat = selectsubcat.options[selectsubcat.selectedIndex].text;
    var selectsubsubcat = document.getElementById('subsubcategoria');
    var textsubsubcat = selectsubsubcat.options[selectsubsubcat.selectedIndex].text; */

    //Dividir el array en elementos
    var cadena = document.getElementById('palabrasclave');
    let palabras= cadena.textContent;
    var newarray= palabras.split(`#\n`);
    let arr = [];
     for(let i of newarray) 
     {
       arr.push(i);
       console.log(arr);
     }
    //const ruta= URL.createObjectURL(file);
    //const signedURL= await Storage.get(file.name)

    setFormData({
      ...formData,
      nombrearchivo: file.name,
      tipoarchivo: file.type,
      tamanoarchivo: file.size,
      archivo: file.name,
      rutadocumento: "https://datalakeitz200223-dev.s3.us-east-2.amazonaws.com/public/"+file.name,
      palabrasclave: arr
    });
    fetchNotes();
  }

  return (
    <div className="LoadFile">
      <h2>Subir archivos</h2>
      <div class="container-fluid">
        <div class="row">
          <div class="col-4">
            <div className="form-group">
              <label htmlFor="example3">Nombre</label>
              <input
                type="text"
                id="example3"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, nombrearchivo: e.target.value })
                }
                value={formData.nombrearchivo}
              />
            </div>

            <div className="form-group">
              <label htmlFor="example3">Tipo de archivo</label>
              <input
                type="text"
                id="example3"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, tipoarchivo: e.target.value })
                }
                value={formData.tipoarchivo}
              />
            </div>

            <div className="form-group">
              <label htmlFor="example3">Tamaño de archivo</label>
              <input
                type="text"
                id="example3"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, tamanoarchivo: e.target.value })
                }
                value={formData.tamanoarchivo}
              />
            </div>

            <div className="form-group">
              <label htmlFor="example3">Autor</label>
              <input
                type="text"
                id="example3"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, autor: e.target.value })
                }
                value={formData.autor}
              />
            </div>
          </div>

          <div class="col-4">
            <div className="form-group">
              <label htmlFor="example3">Categoría</label>
              <br />
              <select id="categoria" className="form-control form-control-sm" onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                value={formData.categoria}>
                <option value="Sistemas" >
                  Sistemas
                </option>
                <option value="Tics">TICS</option>
                <option value="Bioquimica">Bioquimica</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="example3">Subcategoría</label>
              <br />
              <select
                id="subcategoria"
                className="form-control form-control-sm" onChange={(e) =>
                  setFormData({ ...formData, subcategoria: e.target.value })
                }
                value={formData.subcategoria}>
                <option value="Bases de datos">
                  Bases de datos
                </option>
                <option value="Programacion">Programacion</option>
                <option value="Redes">Redes</option>
                <option value="Quimica">Quimica</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="example3">Subsubcategoría</label>
              <br />
              <select
                id="subsubcategoria"
                className="form-control form-control-sm" onChange={(e) =>
                  setFormData({ ...formData, subsubcategoria: e.target.value })
                }
                value={formData.subcategoria} > 
                <option value="NoSQL" >
                  NoSQL
                </option>
                <option value="POO">POO</option>
                <option value="Hacking">Hacking</option>
              </select>
            </div>
          </div>

          <div class="col-4">
            <div className="form-group">
              <label htmlFor="example3">Archivo</label>
              <input
                type="file"
                id="example3"
                className="form-control form-control-sm"
                accept="image/*, video/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={onChange}
                multiple
              />

              <br />

              <div className="form-group" id="myProgress" >
                <div id="myBar"></div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="example3">Ruta del archivo</label>
              <input
                type="rutadocumento"
                id="example3"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, rutadocumento: e.target.value })
                }
                value={formData.rutadocumento}
              />
            </div>

            <div className="form-group">
              <label htmlFor="example3">Resumen del documento</label>
              <textarea
                id="resumendocumento"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, resumendocumento: e.target.value })
                }
                value={formData.resumendocumento}
              />
            </div>

            <div className="form-group">
              <label htmlFor="example3">Palabras clave (separadas por hashtags)</label>
              <textarea
                id="palabrasclave"
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData({ ...formData, palabrasclave: e.target.value })
                }
                value={formData.palabrasclave}
              />
            </div>
          </div>
        </div>

        <br />

        <div className="form-group">
          <Button onClick={createTodo}>Subir archivo</Button>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(LoadFile, API, Storage);
