import React, { Component } from "react";
import CarouselBox from './components/CarouselBox';
import { Container, CardGroup, Card, Button } from "react-bootstrap";

export default class Home extends Component {
    render() {
        return (
            <div>
                <CarouselBox />
                <Container>
                    <h2 className="text-center m-4">Our Team</h2>
                    <CardGroup className="m-4">
                        <Card>
                            <Card.Img variant="top"
                                style={{height: '200px'}}
                              src="https://images.pexels.com/photos/17170319/pexels-photo-17170319.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                            />
                            <Card.Body>
                                <Card.Title>Developers</Card.Title>
                                <Card.Text>fsaefijesifjaisejf</Card.Text>
                                <Button variant="primary">About team</Button>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Container>
            </div>
        )
    }
}