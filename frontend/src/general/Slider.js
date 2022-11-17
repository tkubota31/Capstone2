import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import Baby from "../images/baby.jpeg"
import Rabbits from "../images/rabbits.jpeg"
import CatDog from "../images/catdog.webp"

function Slider() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Baby}
          alt="First slide"
          width="800"
          height="500"
        />
        <Carousel.Caption>
          <h1>Welcome</h1>
          <h4>The place to meet your best furend</h4>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={CatDog}
          alt="Cat and Dog"
          width="800"
          height="500"
        />

        <Carousel.Caption>
          <h1>Pets Are Looking For A Home And Family</h1>
          <h4>They offer love and affection</h4>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Rabbits}
          alt="Rabbits"
          width="800"
          height="500"
        />

        <Carousel.Caption>
          <h1>Pets Of All Species And Breeds</h1>
          <h4>Dogs, Cats, Rabbits, Aquatic Animals, Etc.</h4>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
