import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import './CarouselBox.css';

export default class CarouselBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [], // Список изображений для карусели
        };
    }

    componentDidMount() {
        // Загрузка изображений из определенной папки или API
        // Например, используя fetch или axios
        // После получения списка изображений, обновите состояние компонента

        const images = [
            { src: 'firstImage.jpg', caption: 'Elden Ring', description: 'isfjaoejfseijfsaeifjsef' },
            { src: 'secondImage.jpg', caption: 'Whitcher', description: 'dfesfsegerg342423' },
            // ...другие изображения
        ];

        this.setState({ images });
    }

    render() {
        const { images } = this.state;

        return (
            <Carousel>
                {images.map((images, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 carouselImg"
                            src={`../assets/carouselList/${images.src}`}
                            alt="none"
                        />
                        <Carousel.Caption>
                            <h3>{images.caption}</h3>
                            <p>{images.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }
}
