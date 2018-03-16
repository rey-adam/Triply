import React, { Component } from 'react';
import './Carousel.css';

class Carousel extends Component {
    render() {
        return (
            <div id="carousel-wrapper">

                <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

                    {/* <!-- Indicators --> */}
                    <ol className="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                    </ol>

                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner">

                        {/* slide 1 */}
                        <div className="item active">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/forest.mp4" type="video/mp4" />
                            </video> 
                        </div>

                        {/* slide 2 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://mdbootstrap.com/img/video/Agua-natural.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 3 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                            </video>
                        </div>

                    </div>

                </div>


            </div>
        );
    };
};

export default Carousel;