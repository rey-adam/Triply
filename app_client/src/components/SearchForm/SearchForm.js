import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    render() {
        return (
            <div id="carousel-wrapper">
                

                

            </div>

        );
    };
};

export default SearchForm;

// <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

//                     {/* <!-- Indicators --> */}
//                     <ol className="carousel-indicators">
//                         <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
//                         <li data-target="#carousel-example-generic" data-slide-to="1"></li>
//                         <li data-target="#carousel-example-generic" data-slide-to="2"></li>
//                         <li data-target="#carousel-example-generic" data-slide-to="3"></li>
//                         <li data-target="#carousel-example-generic" data-slide-to="4"></li>
//                     </ol>

//                     {/* <!-- Wrapper for slides --> */}
//                     <div className="carousel-inner">
                    
//                         {/* slide 1 */}
//                         <div className="item active">
//                             <div className="natParkImage" id="yosemite"></div>
//                             <div className="carousel-caption">
//                                 Yosemite National Park
//                             </div>
//                         </div>

//                         {/* slide 2 */}
//                         <div className="item">
//                             <div className="natParkImage" id="zion"></div>
//                             <div className="carousel-caption">
//                                 Zion National Park
//                             </div>
//                         </div>

//                         {/* slide 3 */}
//                         <div className="item">
//                             <div className="natParkImage" id="glacier"></div>
//                             <div className="carousel-caption">
//                                 Glacier National Park
//                             </div>
//                         </div>

//                         {/* slide 4 */}
//                         <div className="item">
//                             <div className="natParkImage" id="bryce"></div>
//                             <div className="carousel-caption">
//                                 Bryce Canyon National Park
//                             </div>
//                         </div>

//                         {/* slide 5 */}
//                         <div className="item">
//                             <div className="natParkImage" id="yellowstone"></div>
//                             <div className="carousel-caption">
//                                 Yellowstone National Park
//                             </div>
//                         </div>

//                     </div>


//                     {/* <!-- Controls --> */}
//                     <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
//                         <span className="glyphicon glyphicon-chevron-left"></span>
//                     </a>
//                     <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
//                         <span className="glyphicon glyphicon-chevron-right"></span>
//                     </a>
//                 </div>

// <div id="park-results"></div>
                
//                 <form className="park-form">
//                     <div className="form-group">
//                         <label htmlFor="park-select">Choose your next national park:</label>
//                         <select id="park-select" className="form-control">
//                             <option value="Yosemite National Park">Yosemite National Park</option>
//                             <option value="Zion National Park">Zion National Park</option>
//                             <option value="Glacier National Park">Glacier National Park</option>
//                             <option value="Bryce Canyon National Park">Bryce Canyon National Park</option>
//                             <option value="Yellowstone National Park">Yellowstone National Park</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="btn btn-primary" onClick={this.props.handleParkSubmit}>Submit</button>
//                 </form>