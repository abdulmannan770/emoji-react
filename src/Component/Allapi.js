import React, { Component } from 'react';
import axios from 'axios';

class Allapi extends Component {
	/*************Get dividend %*******************/
    getDividend = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/dividend/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          //console.log(data);
          if(data.Table.length>0){
            this.setState({
               dividendobject:data.Table[0],
            })
          }
      }).catch(function (error) {});
    }
}
export default Allapi;