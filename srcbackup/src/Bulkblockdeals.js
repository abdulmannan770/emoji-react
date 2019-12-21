import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Bulkblockdeals extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
	      bulkDeals:[],blockDeals:[]
	    }
  	}
  	UNSAFE_componentWillMount () {
	    var  fincode = this.props.fincode
	    /*************Get stockbulkdeals*******************/
	    axios.get(`http://172.104.5.85:3000/stockbulkdeals/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table.length>0){
	          this.setState({
	             bulkDeals:data.Table,
	          })
	        }
	    }).catch(function (error) {});
	    /*************Get stockblockdeals*******************/
	    axios.get(`http://172.104.5.85:3000/stockblockdeals/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
	        if(data.Table.length>0){
	          this.setState({
	             blockDeals:data.Table,
	          })
	        }
	    }).catch(function (error) {});
	}
	render(){
		const {error,bulkDeals,blockDeals} = this.state; 
    var blockDeal=blockDeals.map((value, index) => (
        <tr key={value.srno}>
          <td>{value.UPD_TIME}</td>
          <td>{value.CLIENTNAME}</td>
          <td>{value.DEALTYPE}</td>
          <td>{value.VOLUME}</td>
          <td>{value.TRADEPRICE}</td>
        </tr>
      ));
    var bulkDeal=bulkDeals.map((value, index) => (
        <tr key={value.srno}>
          <td>{value.UPD_TIME}</td>
          <td>{value.CLIENTNAME}</td>
          <td>{value.DEALTYPE}</td>
          <td>{value.VOLUME}</td>
          <td>{value.TRADEPRICE}</td>
        </tr>
      ));
		return(
			<div>
  		 	  <div className="blockDeal">
                <div className="mainContainer">
                  <h2 className="mainHead">BLOCK DEAL <span></span></h2>
                  <div className="mainTable mt20">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Client Name</th>
                            <th>Buy / Sell</th>
                            <th>Quantity Traded</th>
                            <th>Trade Price / Wght. Avg. Price</th>
                          </tr>
                        </thead>
                        <tbody>
                        {blockDeal}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bulkDeal">
                <div className="mainContainer">
                  <h2 className="mainHead">BULK DEAL <span></span></h2>
                  <div className="mainTable mt10">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Client Name</th>
                            <th>Buy / Sell</th>
                            <th>Quantity Traded</th>
                            <th>Trade Price / Wght. Avg. Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkDeal}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       	)
	}
}

export default Bulkblockdeals;