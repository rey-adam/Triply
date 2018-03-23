import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';
class ControlledCarousel extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            // index: 0,
            direction: null
        };
    }

    handleSelect(selectedIndex, e) {
        // alert(`selected=${selectedIndex}, direction=${e.direction}`);
        this.setState({
            // index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        const { direction } = this.state;

        return (
            <Carousel
                interval={8000}
                controls={false}
                indicators={false}
                direction={direction}
                onSelect={this.handleSelect}
            >
                {/* aerial lake */}
                <Carousel.Item id="carousel__lake-camp">
                    <video className="video-fluid d-block" autoPlay loop muted>
                        <source src="https://player.vimeo.com/external/185192576.hd.mp4?s=1519a891ae4379cf4a8858ebdfe26f8823002e81&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                </Carousel.Item>    
            
                {/* mt baker */}
                <Carousel.Item id="carousel__mt-baker">
                    <video className="video-fluid d-block" autoPlay loop muted>
                        <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                </Carousel.Item>

                {/* aerial snowy mountain */}
                <Carousel.Item id="carousel__mountain-sunrise">
                    <video className="video-fluid d-block" autoPlay loop muted>
                        <source src="https://player.vimeo.com/external/209332812.hd.mp4?s=9a45fce597d28295b7fda2f14907e19d0ab45b52&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                </Carousel.Item>

                {/* timelapse night sky */}
                <Carousel.Item id="carousel__night-sky">
                    <video className="video-fluid d-block" autoPlay loop muted>
                        <source src="https://player.vimeo.com/external/236075858.hd.mp4?s=539faad12f040eb5afd8de3160db1220f1a5bac0&amp;profile_id=175&amp;oauth2_token_id=57447761" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                </Carousel.Item>

                {/* aerial blue lake & cliffs */}
                <Carousel.Item id="carousel__lake-cliffs">
                    <video className="video-fluid d-block" autoPlay loop muted>
                        <source src="https://player.vimeo.com/external/206207967.hd.mp4?s=62775cf396e55dd8abd9bf463028012762a0e923&amp;profile_id=172&amp;oauth2_token_id=57447761" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default ControlledCarousel;