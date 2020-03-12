import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';

class GoogleMapsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords:
                [
                    {
                        "lat": 38.0236572,
                        "lng": 23.7420564
                    },
                    {
                        "lat": 37.9823238,
                        "lng": 23.6337796
                    },
                    {
                        "lat": 38.0221451,
                        "lng": 23.7529295
                    },
                    {
                        "lat": 38.0188948,
                        "lng": 23.7560223
                    },
                    {
                        "lat": 37.9969183,
                        "lng": 23.732759
                    },
                    {
                        "lat": 38.0176405,
                        "lng": 23.7354784
                    }
                ]
        }
    }

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                center= {{
                    "lat": 38.0236572,
                    "lng": 23.7420564
                }}
                defaultZoom = { 13 }
            >
            <Polyline
                path={[
                    {
                        "lat": 38.02217,
                        "lng": 23.75288
                    },
                    {
                        "lat": 38.021660000000004,
                        "lng": 23.75252
                    },
                    {
                        "lat": 38.02134,
                        "lng": 23.7523
                    },
                    {
                        "lat": 38.02116,
                        "lng": 23.752670000000002
                    },
                    {
                        "lat": 38.020920000000004,
                        "lng": 23.75324
                    },
                    {
                        "lat": 38.02087,
                        "lng": 23.75337
                    },
                    {
                        "lat": 38.02085,
                        "lng": 23.75345
                    },
                    {
                        "lat": 38.02069,
                        "lng": 23.753390000000003
                    },
                    {
                        "lat": 38.02035,
                        "lng": 23.75325
                    },
                    {
                        "lat": 38.020010000000006,
                        "lng": 23.753120000000003
                    },
                    {
                        "lat": 38.01993,
                        "lng": 23.75308
                    },
                    {
                        "lat": 38.019850000000005,
                        "lng": 23.75328
                    },
                    {
                        "lat": 38.01968,
                        "lng": 23.753680000000003
                    },
                    {
                        "lat": 38.019420000000004,
                        "lng": 23.75428
                    },
                    {
                        "lat": 38.01917,
                        "lng": 23.75496
                    },
                    {
                        "lat": 38.018910000000005,
                        "lng": 23.75578
                    },
                    {
                        "lat": 38.01885,
                        "lng": 23.756
                    },
                    {
                        "lat": 38.018820000000005,
                        "lng": 23.756100000000004
                    },
                    {
                        "lat": 38.018930000000005,
                        "lng": 23.75615
                    },
                    {
                        "lat": 38.01917,
                        "lng": 23.75627
                    },
                    {
                        "lat": 38.01932,
                        "lng": 23.75635
                    },
                    {
                        "lat": 38.019220000000004,
                        "lng": 23.756670000000003
                    },
                    {
                        "lat": 38.01917,
                        "lng": 23.75683
                    },
                    {
                        "lat": 38.019070000000006,
                        "lng": 23.756990000000002
                    },
                    {
                        "lat": 38.018910000000005,
                        "lng": 23.7574
                    },
                    {
                        "lat": 38.01883,
                        "lng": 23.75758
                    },
                    {
                        "lat": 38.018820000000005,
                        "lng": 23.75769
                    },
                    {
                        "lat": 38.018530000000005,
                        "lng": 23.757550000000002
                    },
                    {
                        "lat": 38.018640000000005,
                        "lng": 23.75729
                    },
                    {
                        "lat": 38.01881,
                        "lng": 23.756890000000002
                    },
                    {
                        "lat": 38.018860000000004,
                        "lng": 23.75665
                    },
                    {
                        "lat": 38.01906,
                        "lng": 23.756040000000002
                    },
                    {
                        "lat": 38.018150000000006,
                        "lng": 23.755580000000002
                    },
                    {
                        "lat": 38.017140000000005,
                        "lng": 23.755080000000003
                    },
                    {
                        "lat": 38.016670000000005,
                        "lng": 23.754880000000004
                    },
                    {
                        "lat": 38.01633,
                        "lng": 23.754720000000002
                    },
                    {
                        "lat": 38.016040000000004,
                        "lng": 23.754550000000002
                    },
                    {
                        "lat": 38.01572,
                        "lng": 23.754340000000003
                    },
                    {
                        "lat": 38.015510000000006,
                        "lng": 23.754230000000003
                    },
                    {
                        "lat": 38.014880000000005,
                        "lng": 23.75393
                    },
                    {
                        "lat": 38.01431,
                        "lng": 23.75365
                    },
                    {
                        "lat": 38.013650000000005,
                        "lng": 23.75336
                    },
                    {
                        "lat": 38.01335,
                        "lng": 23.753220000000002
                    },
                    {
                        "lat": 38.0131,
                        "lng": 23.75308
                    },
                    {
                        "lat": 38.013020000000004,
                        "lng": 23.75305
                    },
                    {
                        "lat": 38.01288,
                        "lng": 23.753030000000003
                    },
                    {
                        "lat": 38.012710000000006,
                        "lng": 23.753000000000004
                    },
                    {
                        "lat": 38.01258,
                        "lng": 23.75298
                    },
                    {
                        "lat": 38.012240000000006,
                        "lng": 23.7528
                    },
                    {
                        "lat": 38.012100000000004,
                        "lng": 23.7527
                    },
                    {
                        "lat": 38.01198,
                        "lng": 23.75259
                    },
                    {
                        "lat": 38.0118,
                        "lng": 23.752360000000003
                    },
                    {
                        "lat": 38.011750000000006,
                        "lng": 23.752250000000004
                    },
                    {
                        "lat": 38.01158,
                        "lng": 23.75193
                    },
                    {
                        "lat": 38.01147,
                        "lng": 23.75167
                    },
                    {
                        "lat": 38.01136,
                        "lng": 23.751320000000003
                    },
                    {
                        "lat": 38.011210000000005,
                        "lng": 23.750860000000003
                    },
                    {
                        "lat": 38.01106,
                        "lng": 23.750390000000003
                    },
                    {
                        "lat": 38.01059,
                        "lng": 23.748890000000003
                    },
                    {
                        "lat": 38.010250000000006,
                        "lng": 23.74774
                    },
                    {
                        "lat": 38.010110000000005,
                        "lng": 23.74744
                    },
                    {
                        "lat": 38.01001,
                        "lng": 23.74726
                    },
                    {
                        "lat": 38.00977,
                        "lng": 23.74698
                    },
                    {
                        "lat": 38.00949000000001,
                        "lng": 23.7467
                    },
                    {
                        "lat": 38.00891,
                        "lng": 23.746360000000003
                    },
                    {
                        "lat": 38.00836,
                        "lng": 23.745990000000003
                    },
                    {
                        "lat": 38.00808,
                        "lng": 23.745790000000003
                    },
                    {
                        "lat": 38.007780000000004,
                        "lng": 23.745600000000003
                    },
                    {
                        "lat": 38.00766,
                        "lng": 23.74557
                    },
                    {
                        "lat": 38.00748,
                        "lng": 23.74546
                    },
                    {
                        "lat": 38.007000000000005,
                        "lng": 23.745150000000002
                    },
                    {
                        "lat": 38.00657,
                        "lng": 23.744790000000002
                    },
                    {
                        "lat": 38.0061,
                        "lng": 23.74435
                    },
                    {
                        "lat": 38.005950000000006,
                        "lng": 23.744210000000002
                    },
                    {
                        "lat": 38.00583,
                        "lng": 23.744040000000002
                    },
                    {
                        "lat": 38.005570000000006,
                        "lng": 23.743530000000003
                    },
                    {
                        "lat": 38.005050000000004,
                        "lng": 23.742600000000003
                    },
                    {
                        "lat": 38.004450000000006,
                        "lng": 23.741560000000003
                    },
                    {
                        "lat": 38.004380000000005,
                        "lng": 23.74144
                    },
                    {
                        "lat": 38.00437,
                        "lng": 23.741380000000003
                    },
                    {
                        "lat": 38.00448,
                        "lng": 23.740650000000002
                    },
                    {
                        "lat": 38.004670000000004,
                        "lng": 23.73927
                    },
                    {
                        "lat": 38.005010000000006,
                        "lng": 23.73684
                    },
                    {
                        "lat": 38.0052,
                        "lng": 23.735500000000002
                    },
                    {
                        "lat": 38.00526,
                        "lng": 23.73505
                    },
                    {
                        "lat": 38.00529,
                        "lng": 23.734830000000002
                    },
                    {
                        "lat": 38.005160000000004,
                        "lng": 23.734800000000003
                    },
                    {
                        "lat": 38.004850000000005,
                        "lng": 23.734720000000003
                    },
                    {
                        "lat": 38.004690000000004,
                        "lng": 23.73469
                    },
                    {
                        "lat": 38.004850000000005,
                        "lng": 23.734720000000003
                    },
                    {
                        "lat": 38.005160000000004,
                        "lng": 23.734800000000003
                    },
                    {
                        "lat": 38.00547,
                        "lng": 23.73486
                    },
                    {
                        "lat": 38.00592,
                        "lng": 23.73496
                    },
                    {
                        "lat": 38.00663,
                        "lng": 23.735100000000003
                    },
                    {
                        "lat": 38.007020000000004,
                        "lng": 23.735110000000002
                    },
                    {
                        "lat": 38.008230000000005,
                        "lng": 23.735110000000002
                    },
                    {
                        "lat": 38.00874,
                        "lng": 23.735090000000003
                    },
                    {
                        "lat": 38.009280000000004,
                        "lng": 23.73507
                    },
                    {
                        "lat": 38.00988,
                        "lng": 23.735090000000003
                    },
                    {
                        "lat": 38.01044,
                        "lng": 23.73515
                    },
                    {
                        "lat": 38.01098,
                        "lng": 23.735200000000003
                    },
                    {
                        "lat": 38.01142,
                        "lng": 23.73522
                    },
                    {
                        "lat": 38.01203,
                        "lng": 23.73524
                    },
                    {
                        "lat": 38.01256,
                        "lng": 23.735290000000003
                    },
                    {
                        "lat": 38.013290000000005,
                        "lng": 23.735310000000002
                    },
                    {
                        "lat": 38.01381000000001,
                        "lng": 23.73533
                    },
                    {
                        "lat": 38.015100000000004,
                        "lng": 23.73534
                    },
                    {
                        "lat": 38.01567,
                        "lng": 23.735390000000002
                    },
                    {
                        "lat": 38.0157,
                        "lng": 23.735390000000002
                    },
                    {
                        "lat": 38.01568,
                        "lng": 23.73552
                    },
                    {
                        "lat": 38.01568,
                        "lng": 23.735850000000003
                    },
                    {
                        "lat": 38.01567,
                        "lng": 23.736300000000004
                    },
                    {
                        "lat": 38.0157,
                        "lng": 23.736430000000002
                    },
                    {
                        "lat": 38.01588,
                        "lng": 23.73694
                    },
                    {
                        "lat": 38.01601,
                        "lng": 23.73731
                    },
                    {
                        "lat": 38.01603,
                        "lng": 23.7374
                    },
                    {
                        "lat": 38.016020000000005,
                        "lng": 23.737530000000003
                    },
                    {
                        "lat": 38.01597,
                        "lng": 23.73806
                    },
                    {
                        "lat": 38.0159,
                        "lng": 23.738650000000003
                    },
                    {
                        "lat": 38.01583,
                        "lng": 23.739300000000004
                    },
                    {
                        "lat": 38.01578000000001,
                        "lng": 23.740000000000002
                    },
                    {
                        "lat": 38.01559,
                        "lng": 23.741860000000003
                    },
                    {
                        "lat": 38.01541,
                        "lng": 23.743470000000002
                    },
                    {
                        "lat": 38.015280000000004,
                        "lng": 23.744480000000003
                    },
                    {
                        "lat": 38.01521,
                        "lng": 23.744770000000003
                    },
                    {
                        "lat": 38.01487,
                        "lng": 23.745520000000003
                    },
                    {
                        "lat": 38.01433,
                        "lng": 23.746720000000003
                    },
                    {
                        "lat": 38.01408,
                        "lng": 23.74727
                    },
                    {
                        "lat": 38.014010000000006,
                        "lng": 23.74753
                    },
                    {
                        "lat": 38.014010000000006,
                        "lng": 23.749070000000003
                    },
                    {
                        "lat": 38.014,
                        "lng": 23.749280000000002
                    },
                    {
                        "lat": 38.014230000000005,
                        "lng": 23.749280000000002
                    },
                    {
                        "lat": 38.01428000000001,
                        "lng": 23.74931
                    },
                    {
                        "lat": 38.01447,
                        "lng": 23.74949
                    },
                    {
                        "lat": 38.01498,
                        "lng": 23.750110000000003
                    },
                    {
                        "lat": 38.01547,
                        "lng": 23.75074
                    },
                    {
                        "lat": 38.015890000000006,
                        "lng": 23.75128
                    },
                    {
                        "lat": 38.01626,
                        "lng": 23.751730000000002
                    },
                    {
                        "lat": 38.01635,
                        "lng": 23.751810000000003
                    },
                    {
                        "lat": 38.01648,
                        "lng": 23.75186
                    },
                    {
                        "lat": 38.016600000000004,
                        "lng": 23.751900000000003
                    },
                    {
                        "lat": 38.01664,
                        "lng": 23.751880000000003
                    },
                    {
                        "lat": 38.016980000000004,
                        "lng": 23.75202
                    },
                    {
                        "lat": 38.017230000000005,
                        "lng": 23.752110000000002
                    },
                    {
                        "lat": 38.0178,
                        "lng": 23.75232
                    },
                    {
                        "lat": 38.01876,
                        "lng": 23.752660000000002
                    },
                    {
                        "lat": 38.019650000000006,
                        "lng": 23.75298
                    },
                    {
                        "lat": 38.01993,
                        "lng": 23.75308
                    },
                    {
                        "lat": 38.02018,
                        "lng": 23.75318
                    },
                    {
                        "lat": 38.02085,
                        "lng": 23.75345
                    },
                    {
                        "lat": 38.021950000000004,
                        "lng": 23.75383
                    },
                    {
                        "lat": 38.022200000000005,
                        "lng": 23.75335
                    },
                    {
                        "lat": 38.022380000000005,
                        "lng": 23.753030000000003
                    },
                    {
                        "lat": 38.02217,
                        "lng": 23.75288
                    }
                ]}
                options={{
                    strokeColor: '#478912',
                    strokeOpacity: 1,
                    strokeWeight: 2}}
            />

                <Polyline
                    path={[
                        {
                            "lat": 38.0236572,
                            "lng": 23.7420564
                        },
                        {
                            "lat": 38.0221451,
                            "lng": 23.7529295
                        },
                        {
                            "lat": 38.0188948,
                            "lng": 23.7560223
                        },
                        {
                            "lat": 37.9969183,
                            "lng": 23.732759
                        },
                        {
                            "lat": 38.0236572,
                            "lng": 23.7420564
                        },
                    ]}
                    options={{
                        strokeColor: '#456789',
                        strokeOpacity: 1,
                        strokeWeight: 2}}
                />

            <Marker
                position={{
                    "lat": 38.0236572,
                    "lng": 23.7420564
                }}
                label={'Starting Point'}
            />
            <Marker
                position={{
                    "lat": 37.9823238,
                    "lng": 23.6337796
                }}
                label={'1'}
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