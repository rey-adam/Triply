import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';
class ControlledCarousel extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null
        };
    }

    handleSelect(selectedIndex, e) {
        // alert(`selected=${selectedIndex}, direction=${e.direction}`);
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        const { index, direction } = this.state;

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

// {/* aerial blue lake & cliffs */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/206207967.hd.mp4?s=62775cf396e55dd8abd9bf463028012762a0e923&amp;profile_id=172&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* overlay trees */}
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* aerial snowy mountain */}
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/209332812.hd.mp4?s=9a45fce597d28295b7fda2f14907e19d0ab45b52&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* timelapse night sky */}
// <Carousel.Item>
//     <video id="video__night-sky" className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/236075858.hd.mp4?s=539faad12f040eb5afd8de3160db1220f1a5bac0&amp;profile_id=175&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* tranquil river */}
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/206207917.hd.mp4?s=addbc8a868b5ccddbc0d9bf2a1013ada5eadf140&amp;profile_id=172&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* mt baker */}
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* aerial waterfall */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/208272982.hd.mp4?s=deef9bcb944b68a7ad69bcfba2d3b451e3822b37&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* aerial lake */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/185192576.hd.mp4?s=1519a891ae4379cf4a8858ebdfe26f8823002e81&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* aerial trees sunset */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/193789085.hd.mp4?s=ba8973f772415908443af70bd8c470cbb9061106&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* gentle breeze & sunlight through field */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/174003281.hd.mp4?s=f08d8a93640693a48a6bec71bf80828704401839&amp;profile_id=169&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* aerial slow sunset */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/207976535.hd.mp4?s=a16f7de5be2e82e1c3ff928f9a4411c1f810bd64&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* calm lake */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/173243368.hd.mp4?s=883ccf491bea0e6907fde3fd0e89ad20135a740d&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>

// {/* campfire */ }
// <Carousel.Item>
//     <video className="video-fluid d-block" autoPlay loop muted>
//         <source src="https://player.vimeo.com/external/210741501.hd.mp4?s=26d6aea376d6031b9452a4b32869fdf31efef5ac&amp;profile_id=119&amp;oauth2_token_id=57447761" type="video/mp4" />
//     </video>
//     <div className="overlay"></div>
// </Carousel.Item>
