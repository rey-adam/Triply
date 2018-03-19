import React, { Component } from 'react';
import './Accordion.css';

class Accordion extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
            
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title">
                                <a onClick={this.handleNameClick} data-value="Yosemite National Park" className="collapsed yosemite anchor" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Yosemite National Park
                                </a>
                            </h4>
                            <button className="add-btn grow btn btn-default">Add To Trips</button>
                            <button className="add-btn shrink btn btn-default">Add</button>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div className="panel-body">
                        Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra.

                        First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more.
                        </div>
                        </div>
                    </div>
            
            
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingTwo">
                            <h4 className="panel-title">
                                <a data-value="Zion National Park" className="collapsed zion anchor" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Zion National Park
                                </a>
                            </h4>
                            <button className="add-btn grow btn btn-default">Add To Trips</button>
                            <button className="add-btn shrink btn btn-default">Add</button>
                        </div>
                        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                        <div className="panel-body">
                        Follow the paths where ancient native people and pioneers walked. Gaze up at massive sandstone cliffs of cream, pink, and red that soar into a brilliant blue sky. Experience wilderness in a narrow slot canyon. Zion’s unique array of plants and animals will enchant you as you absorb the rich history of the past and enjoy the excitement of present day adventures.
                        </div>
                        </div>
                    </div>
            
            
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingThree">
                            <h4 className="panel-title">
                                <a data-value="Glacier National Park" className="collapsed glacier anchor" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Glacier National Park
                                </a>
                            </h4>
                            <button className="add-btn grow btn btn-default">Add To Trips</button>
                            <button className="add-btn shrink btn btn-default">Add</button>
                        </div>
                        <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                        <div className="panel-body">
                            As the Crown of the Continent, Glacier is the headwaters for streams that flow to the Pacific Ocean, the Gulf of Mexico, and to Hudson's Bay. What happens here affects waters in a huge section of North America. Due to a detection of invasive mussel populations in central Montana, Glacier has closed all park waters to motorized and trailered watercraft until further notice.
                        </div>
                        </div>
                    </div>
            
            
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingFour">
                            <h4 className="panel-title">
                                <a data-value="Bryce Canyon National Park" className="collapsed bryce anchor" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Bryce Canyon National Park
                                </a>
                            </h4>
                            <button className="add-btn grow btn btn-default">Add To Trips</button>
                            <button className="add-btn shrink btn btn-default">Add</button>
                        </div>
                        <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                        <div className="panel-body">
                            There is no place like Bryce Canyon. Hoodoos (odd-shaped pillars of rock left standing from the forces of erosion) can be found on every continent, but here is the largest collection of hoodoos in the world! Descriptions fail. Photographs do not do it justice. Bring your sense of wonder and imagination when visiting Bryce Canyon National Park.
                        </div>
                        </div>
                    </div>
            
            
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingFive">
                            <h4 className="panel-title">
                                <a data-value="Yellowstone National Park" className="collapsed yellowstone anchor" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Yellowstone National Park
                                </a>
                            </h4>
                            <button className="add-btn grow btn btn-default">Add To Trips</button>
                            <button className="add-btn shrink btn btn-default">Add</button>
                        </div>
                        <div id="collapseFive" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
                        <div className="panel-body">
                        Visit Yellowstone and experience the world's first national park. Marvel at a volcano’s hidden power rising up in colorful hot springs, mudpots, and geysers. Explore mountains, forests, and lakes to watch wildlife and witness the drama of the natural world unfold. Discover the history that led to the conservation of our national treasures “for the benefit and enjoyment of the people.”
                        </div>
                    </div>
            
                </div>
            
            </div>
            </div>
        );
    };
};

export default Accordion;