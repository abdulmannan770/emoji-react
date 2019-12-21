import React, { Component } from "react";
import { hot } from "react-hot-loader";
import './index.css'
import MasterLayout from './Component/masterLayout';

class App extends Component {
  state = {
  };
  render() {
    return (
      <MasterLayout>
        <div className="content" >
          <h1 className="heading">Dynamic ClassName Generate with ReactJs + Webpack</h1>
        </div >
      </MasterLayout>
    );
  }
}

export default hot(module)(App);