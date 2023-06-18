import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import './CarouselBox.css';
import firstImg from '../assets/ering.jpg';
import secondImg from '../assets/Witcher.jpg';

export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img 
                        className="d-block w-100 carouselImg"
                        src={ firstImg }
                        alt="none"
                    />
                    <Carousel.Caption>
                        <h3>Elden Ring</h3>
                        <p>isfjaoejfseijfsaeifjsef</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className="d-block w-100 carouselImg"
                        src={ secondImg }
                        alt="none"
                    />
                    <Carousel.Caption>
                        <h3>Whitcher</h3>
                        <p>dfesfsegerg342423</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}
