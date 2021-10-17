import React, { useEffect, useState } from 'react';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function Card({archivo}) 
{
   const classes = useStyles();
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

  return(
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Tipo de archivo</TableCell>
            <TableCell align="right">Archivo</TableCell>
            <TableCell align="right">Descargar</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Subcategoria</TableCell>
            <TableCell align="right">Subsubcategoria</TableCell>
            <TableCell align="right">Autor</TableCell>
            <TableCell align="right">Resumen</TableCell>
            <TableCell align="right">Palabras clave</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={archivo.id}>
              <TableCell component="th" scope="row">
                {archivo.nombrearchivo}
              </TableCell>

              <TableCell style={{ width: 160 }} align="right">
                {archivo.tipoarchivo}
              </TableCell>

              <TableCell style={{ width: 160 }} align="right">
              <img className="br-100 h3 w3 dib" alt={archivo.nombrearchivo} src={process.env.PUBLIC_URL + archivo.rutadocumento} />
              </TableCell>
      
                  <TableCell align="right"> <a href={archivo.rutadocumento} target="_blank">Descargar</a> </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.categoria}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.subcategoria}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.subsubcategoria}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.autor}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.resumendocumento}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.palabrasclave}
              </TableCell>
            </TableRow>
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </TableContainer>
      </Container>
   
  );
}

export default Card;