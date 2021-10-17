import Carousel from 'react-bootstrap/Carousel';
import Imagen1 from '../pages/tecnm_logo.png';
import Imagen2 from '../pages/tecnm.jpg';

function Carrusel()
{
    return (
        <Carousel>
        <Carousel.Item interval={1000}>
          <img src={Imagen1} alt="First slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img src={Imagen1} alt="Second slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Imagen2} alt="Third slide" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
    
}

export default Carrusel;

