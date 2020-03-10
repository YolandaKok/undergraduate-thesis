import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';

class GoogleMapsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords:
                [{ lat: 40.766795, lng: -73.954298 },
                { lat: 40.756895, lng: -73.954698 },
                { lat: 40.756895, lng: -73.955698 }, { lat: 40.766795, lng: -73.954298 }]
        }
    }

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                center={ { "lat": 37.9823238,
                    "lng": 23.6337796 } }
                defaultZoom = { 13 }
            >
            <Polyline
                path={this.state.coords}
                options={{
                    strokeColor: '#478912',
                    strokeOpacity: 1,
                    strokeWeight: 2}}
            />
            <Marker
                position={{
                    "lat": 37.9823238,
                    "lng": 23.6337796 }}
                label={'Starting Point'}
            />
            </GoogleMap>
        ));
        return(
            <div>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
};
export default GoogleMapsGraph;