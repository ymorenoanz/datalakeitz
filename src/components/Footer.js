import React from 'react';
 
 
class Footer extends React.Component 
{
 
  render() {
 
    return (
 
        <footer className="container">
            <p>&copy; {(new Date().getFullYear())} Repositorio ITZ &middot; <a href="http://www.itzacatepec.edu.mx/">Instituto Tecnológico de Zacatepec</a> &middot; </p>
        </footer>
 
    )
    
  }
 
}
 
export default Footer;