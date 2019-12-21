import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Balancesheet extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
	      balancesheet:[],
        balancesheetnext:[],
        updatedyear:'',
        lastyear:'',
        startyear:'',
        endyear:'',
        Particulars:''
	    }
  	}
  	UNSAFE_componentWillMount () {
	    var  fincode = this.props.fincode
	    /*************Get Balancesheet*******************/
	    axios.get(`http://172.104.5.85:3000/Balancesheet/S/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
          //console.log(data[data.length-1].year);
	        if(data.length>0){
           var startyear=data[data.length-1].year.substr(data[data.length-1].year.length - 4);
           var endyear=data[0].year.substr(data[0].year.length - 4);
	          this.setState({
               balancesheet:data,
               updatedyear:data[0].year,
               Particulars:data[0].Particulars,
               lastyear:data[data.length-1].year,  
               startyear:startyear,
               endyear:endyear            
	          })
	        }
	    }).catch(function (error) {});
	}
	render(){
		const {error,balancesheet,lastyear,updatedyear,startyear,endyear,Particulars} = this.state;    
		return(
			       <div className="balanceSheet">
              <div className="mainContainer">
                <div className="balanceIn">
                  <h2 className="mainHead">BALANCE SHEET <span></span></h2>
                  <div className="balanceFilter">
                    <ul>
                      <li>
                        <select>
                          <option>Standalone</option>
                          <option>Consolidated</option>
                        </select>
                      </li>
                      <li>
                        <i className="fa fa-search"></i>
                        <input type="text" name="" placeholder="Search Stocks" />
                      </li>
                      <li>
                        <select>
                          <option>By Percentage</option>
                          <option>By Percentage</option>
                          <option>By Percentage</option>
                          <option>By Percentage</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                  <div className="mainTable">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Description</th>
                            {balancesheet.map((data, ind) => (
                              Particulars==data.Particulars ?
                                <th key={ind}>{data.year}</th>
                              :null
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {balancesheet.map((value, index) => (
                              value.year==lastyear && value.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Quoted' && value.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Unquoted'?
                                  <tr key={value._id}>
                                    <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                                    {balancesheet.map((data, ind) => (
                                      value.Particulars==data.Particulars && data.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Quoted' && data.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Unquoted' ?
                                        <td key={ind}>{data.Particulars_value}</td>
                                      :null
                                    ))}
                                  </tr> 
                              :null
                            ))
                          }
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

export default Balancesheet;