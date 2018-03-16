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
                        <li data-target="#carousel-example-generic" data-slide-to="5"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="6"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="7"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="8"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="9"></li>
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

                        {/* slide 4 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/2215/9/236075858/840331843.mp4?token=1521200883-0x9b5f65a5921e0192257b81bb1fcf0a557482151e" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 5 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://player.vimeo.com/external/188556988.hd.mp4?s=106d9a5c0f8e447266a80368c25e2fb704479fdc&amp;profile_id=174&amp;oauth2_token_id=57447761" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 6 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 7 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 8 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 9 */}
                        <div className="item">
                            <video className="video-fluid d-block" autoPlay loop>
                                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* slide 10 */}
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