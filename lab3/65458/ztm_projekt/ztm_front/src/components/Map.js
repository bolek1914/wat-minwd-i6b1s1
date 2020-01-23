import React, { Component } from 'react'
import Axios from 'axios'
import GoogleMapReact from 'google-map-react'

const Autobus = ({text}) => <img src="/img/bus1.png"/>
const Tramwaj = ({text}) => <img src="/img/tram1.png"/>

export class Map extends Component {
    static defaultProps = {
        center: {
            lat: 52.2330653,
            lng: 20.9211124
        },
        zoom: 11
    };

    state = {
        transports: [],
        id: 0
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        
        this.setState({id: params.id}, () => {
            this.getData();
        });
        
        this.interval = setInterval(() => this.getData(), 10000);
        
      }

      getData = () => {
        Axios.get(`http://localhost:8000/api/transport/${this.state.id}`).then((res) => {
            this.setState({transports: res.data}, () => {
                console.log(this.state.transports);
            });
        })
      }


    render() {
        return (
            <React.Fragment>
                <div style={{ height: '75vh', width: '100%'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAa3ONsAAsZGcAcS9jWYHHmdyg9yPo1SFE"}}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                    
                        {this.state.transports.map(t => (
                            (t.Lines > 100) ? (
                                <Autobus key={t.VehicleNumber}
                                        lat={t.Lat}
                                        lng={t.Lon}
                                        text="xxx"
                                />
                            ) : (
                                <Tramwaj key={t.VehicleNumber}
                                        lat={t.Lat}
                                        lng={t.Lon}
                                        text="xxx"
                                />
                            )
                        ))}
                        
                    </GoogleMapReact>
                </div>
                <a href="/" style={{color: 'white'}} className="btn btn-danger btn-lg transport-button">Cofnij do wyboru linii</a>
            </React.Fragment>
        )
    }
}

export default Map
