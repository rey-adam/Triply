//import the GoogleApiWrapper
import { GoogleApiWrapper } from 'google-maps-react';

//pass the google info as props to the Map
<Map google = {this.props.google} />


//export the container WITHIN the GoogleApiWrapper
export default GoogleApiWrapper ({
    apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
    libraries: ['visualization']
}) (MapContainer)
