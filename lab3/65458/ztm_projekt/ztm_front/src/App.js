import React, { Component } from 'react';
import {BrowserRouter as Router, Route, useParams} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Map from "./components/Map"

class App extends Component{
  state = {
    id: 0,
    trams: [1,2,3,4,6,7,9,10,11,13,14,15,17,18,20,22,23,24,25,26,27,28,31,33,35],
    busses: [102,103,104,105,107,108,109,110,111,112,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,138,139,140,141,142,143,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,206,207,208,209,210,211,212,213,217,218,219,220,222,225,228,234,239,240,245,249,250,251,255,256,264,269,303,304,308,311,314,317,320,321,323,326,328,331,332,338,339,340,345,365,379,397,401,402,409,411,412,414,500,501,502,503,504,507,509,511,512,514,516,517,518,519,520,521,522,523,525,527]
  }

  setID = (param, id) => {
    console.log("Zmieniam id na " + id)
    this.setState({id: id})
  }

  render() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/"
          render={(props) => (
            <React.Fragment>
            <div className="row">
              <div className="col-6 text-center">
                <h1>Tramwaje</h1>
              </div>
              <div className="col-6 text-center">
                <h1>Autobusy</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                {this.state.trams.map(e => (
                  <a key={e} onClick={(param) => this.setID(param, e)} className="btn btn-primary btn-lg transport-button" href={`/line/${e}`}>{e}</a>
                ))}
              </div>
              <div className="col-6">
                {this.state.busses.map(e => (
                  <a key={e} onClick={(param) => this.setID(param, e)} className="btn btn-success btn-lg transport-button" href={`/line/${e}`}>{e}</a>
                ))}
              </div>
            </div>
            </React.Fragment>
          )}
        />
        
        <Route path="/line/:id" component={Map} /> 
      </div>
    </Router>
  );
}
}

export default App;
