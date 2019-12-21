import React, { Component } from 'react';
/*import { Link } from 'react-router-dom';*/
import axios from 'axios';
class Bulkblockdeals extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      bulkDeals:[],blockDeals:[],
        bulkDealslength:'',
        blockDealslength:'',
	    }
  	}
  	//UNSAFE_componentWillMount () {
    componentDidMount() {
      var  fincode = this.props.fincode;
      this.getStockBulkDeals(fincode);
      this.getStockBlockDeals(fincode);
    }
	    /*************Get stockbulkdeals*******************/
	  getStockBulkDeals = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/stockbulkdeals/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table.length>0){
	          this.setState({
	             bulkDeals:data.Table,
               bulkDealslength:data.Table.length,
	          })
	         }else{
            this.setState({
               bulkDealslength:data.Table.length,
            })
          }
	    }).catch(function (error) {});
    }
	    /*************Get stockblockdeals*******************/
	  getStockBlockDeals = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/stockblockdeals/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
	        if(data.Table.length>0){
	          this.setState({
	             blockDeals:data.Table,
               blockDealslength:data.Table.length,
	          })
	        }else{
            this.setState({
               blockDealslength:data.Table.length,
            })
          }
	    }).catch(function (error) {});
	}
	render(){
		const {bulkDeals,blockDeals,blockDealslength,bulkDealslength} = this.state; 
    if(blockDealslength>0){
      var blockDeal=blockDeals.map((value, index) => (
        <tr key={value.srno}>
          <td>{value.UPD_TIME}</td>
          <td>{value.CLIENTNAME}</td>
          <td>{value.DEALTYPE}</td>
          <td>{value.VOLUME}</td>
          <td>{value.TRADEPRICE}</td>
        </tr>
      ));
    }else{ var blockDeal=<tr><td>Record Not Found!</td></tr>}
    if(bulkDealslength>0){
    var bulkDeal=bulkDeals.map((value, index) => (
        <tr key={value.srno}>
          <td>{value.UPD_TIME}</td>
          <td>{value.CLIENTNAME}</td>
          <td>{value.DEALTYPE}</td>
          <td>{value.VOLUME}</td>
          <td>{value.TRADEPRICE}</td>
        </tr>
      ));
  }else{ var bulkDeal=<tr><td>Record Not Found!</td></tr>}
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