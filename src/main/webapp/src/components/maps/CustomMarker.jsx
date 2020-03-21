import React, {Component} from 'react';
import {InfoWindow, Marker} from "react-google-maps";

export class CustomMarker extends Component {

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
        const { showInfoWindow } = this.state;
        const { lat, lng, address } = this.props;
        return(
            <Marker
                position={{
                    "lat": parseFloat(lat),
                    "lng": parseFloat(lng),
                }}
                label={address}
                onClick={this.handleMouseOver}
            >
                {this.state.showInfoWindow && (
                    <InfoWindow >
                        <div>
                            <p>{address}</p>
                            <p>Lat: {lat}</p>
                            <p>Lng: {lng}</p>
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        );
    }
}

export default CustomMarker;