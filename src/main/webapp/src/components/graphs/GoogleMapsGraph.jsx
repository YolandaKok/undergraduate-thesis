import React, {Component, Fragment} from 'react';
import { withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from 'react-google-maps';
import styles from "../../static/signup.module.css";
import CustomMarker from "../maps/CustomMarker";

class GoogleMapsGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let markers = this.props.markers;
        let center = this.props.center;
        let routes = this.props.routes;
        let routesInt = this.props.routesInt;
        let colors = ['#478912', '#dd3333', '#1122ff', '#df5643',
            '#00bdaa', '#400082', '#fe346e', '#f1e7b6'];
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                center={{lat: center.lat, lng: center.lng}}
                defaultZoom = { 11 }
            >

            {
                routes.map((item, index) => {
                    return(
                        <Polyline
                            path={
                                item
                            }
                            options={{
                                strokeColor: colors[index % routes.length],
                                strokeOpacity: 1,
                                strokeWeight: 2}}
                        />
                    );
                })
            }
            {markers.map((item, index) => <CustomMarker lat={item.lat} lng={item.lng} address={item.address} />)}
            </GoogleMap>
        ));
        return(
            <div>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `500px`, width: '500px', paddingBottom: 30 }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
};
export default GoogleMapsGraph;