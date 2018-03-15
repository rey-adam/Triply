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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
            
                </div>
            
            </div>
            </div>
        );
    };
};

export default Accordion;