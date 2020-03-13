import React, {Component, Fragment} from 'react';
import { withGoogleMap, GoogleMap, Polyline, Marker, InfoWindow } from 'react-google-maps';
import styles from "../../static/signup.module.css";

class GoogleMapsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfoWindow: false
        }
        this.handleMouseExit = this.handleMouseExit.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(e) {
        if(this.state.showInfoWindow == false) {
            this.setState({
                showInfoWindow: true
            });
        } else {
            this.setState({
                showInfoWindow: false
            });
        }

    };
    handleMouseExit(e){
        this.setState({
            showInfoWindow: false
        });
    };

    render() {
        let markers = this.props.markers;
        let center = this.props.center;
        let routes = this.props.routes;
        let routesInt = this.props.routesInt;
        let colors = ['#478912', '#dd3333', '#1122ff'];
        const { showInfoWindow } = this.state;
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                center={{lat: center.lat, lng: center.lng}}
                defaultZoom = { 13 }
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
            {
                markers.map((item, index) => {
                    return(
                        <Marker
                            position={{
                                "lat": item.lat,
                                "lng": item.lng,
                            }}
                            label={routesInt[index]}
                            onClick={this.handleMouseOver}
                        >
                            {this.state.showInfoWindow && (
                                <InfoWindow>
                                    <div>
                                        <p>{item.address}</p>
                                        <p>Lat: {item.lat}</p>
                                        <p>Lng: {item.lng}</p>
                                        <p>Vehicle: {index}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    );
                })
            }
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