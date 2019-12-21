import React, { Component } from 'react';

class numDifferentiation extends Component {
   numformate = (val)=> {
        if(val.length>=7) val = (val/10000000).toFixed(2);
        else{val=val;}
        return val;
  }
}

export default numDifferentiation;