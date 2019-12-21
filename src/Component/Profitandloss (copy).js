import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
const state = {
  labels : ["","","","","",""],
  datasets : [{
      label : "",
      data : [750,950,450,1000,750,250],
      backgroundColor : "#87888b",
      borderColor : "#87888b",
      borderWidth : 0
    },{
      label : "",
      data : [1200,900,925,450,1300,900],
      backgroundColor : "#265aa8",
      borderColor : "#265aa8",
      borderWidth : 0
    }]
};
const options = {
      layout: {
                padding:{left: 0,right: 50,top: 0,bottom: 0}
              },
      title:{display:false,text:'',fontSize:20},
      legend:{ display:false,position:'right'},
      scales : {
        yAxes : [{
          ticks : {beginAtZero: true,min : 0,max : 1400,},
          gridLines : {borderDash: [3, 1],color: "#9c9da0"}                
        }],
        xAxes : [{
           gridLines: {display: false, color: "#9c9da0"},
              categoryPercentage: 0.5,barPercentage: 1
        }]
      }
}
class ProfitandLoss extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
	      ProfitandLoss:[],
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
	    axios.get(`http://172.104.5.85:3000/ProfitandLoss/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
          //console.log(data[data.length-1].year);
	        if(data.length>0){
           var startyear=data[data.length-1].year.substr(data[data.length-1].year.length - 4);
           var endyear=data[0].year.substr(data[0].year.length - 4);
	          this.setState({
               ProfitandLoss:data,
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
		const {error,ProfitandLoss,lastyear,updatedyear,startyear,endyear,Particulars} = this.state;    
		return(
          <div>
			      <div className="profitLoss">
              <div className="mainContainer">
                <div className="profitLossIn">
                  <h2 className="mainHead">PROFIT AND LOSS </h2>
                  <div className="profitLossFilter">
                    <ul>
                      <li>
                        <select>
                          <option>Y-O-Y(%)</option>
                          <option>Q-O-Q(%)</option>
                        </select>
                      </li>
                      <li>
                        <select>
                          <option>Standalone</option>
                          <option>Standalone</option>
                          <option>Standalone</option>
                        </select>
                      </li>
                      <li>
                        <p><input type="checkbox" name="" /> Variance Percentages</p>
                      </li>
                    </ul>
                  </div>
                  <div className="mainTable tableBorder">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                                    
                          <tr>
                            <th>Description</th>
                            {ProfitandLoss.map((data, ind) => (
                              Particulars==data.Particulars ?
                                <th key={ind}>{data.year}</th>
                              :null
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                         {ProfitandLoss.map((value, index) => (
                              value.year==lastyear && value.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Quoted' && value.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Unquoted'?
                                  <tr key={value._id}>
                                    <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                                    {ProfitandLoss.map((data, ind) => (
                                      value.Particulars==data.Particulars && data.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quoted' && data.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Unquoted' ?
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
            <div className="peerChart">
              <div className="chartIn">
                <div className="filter">
                  <div className="filterIn">
                    <select>
                      <option>Bar Chart</option>
                      <option>Line Chart</option>
                    </select>
                  </div>
                  <div className="filterIn">
                    <select>
                      <option>By Parameters</option>
                      <option>By Parameters</option>
                    </select>
                  </div>
                </div>
                  <Bar data={state} options={options} />
                  {/*<canvas id="barChart" height="224" style={{height: '224px'}}></canvas>*/}
              </div>
            </div>
          </div>
       	)
	}
}

export default ProfitandLoss;