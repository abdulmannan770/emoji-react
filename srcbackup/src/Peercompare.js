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
class Peercompare extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
        Peercompare:[],
        fundascore:[],
        resultunique:[],
	    }
  	}
  	UNSAFE_componentWillMount () {
	    var  fincode = this.props.fincode
	    /*************Get stockbulkdeals*******************/
	    axios.get(`http://172.104.5.85:3000/newpeercampare/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table.length>0){
            //console.log(data.fscore);
	          this.setState({
               Peercompare:data.Table,
	             fundascore:data.fscore,
               resultunique:data.resultunique,
	          })
	        }
	    }).catch(function (error) {});
	}
	render(){
		const {error,Peercompare,fundascore,resultunique} = this.state; 
		return(
		      <div>
            <div className="peerSection">
                <div className="mainContainer">
                  <h2 className="mainHead">Peer comparison<span></span>
                  </h2>
                  <p className="parametr">
                    <i className="fa fa-check-square"></i> Parameters
                  </p>
                  <div className="dataTablePeer table-responsive">
                    <table id="peerTable" className="table table-striped">
                          <thead>
                        <tr className="bgBlueTable">
                          <th>Name</th>
                          <th>Price</th>
                          <th>Sales</th>
                          <th>Profit</th>
                          <th>PE</th>
                          <th>F Score</th>
                          <th>Mkt Cap</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Peercompare.map((value, index) => (
                          <tr key={value.srno}>
                            <td>{value.SNAME} <img src="/img/img_linechart.png" alt="Line Chart" /></td>
                            <td>{value.CLOSE1}</td>
                            <td>{value.SALES_TURNOVER}</td>
                            <td>
                            {resultunique.map((data, ind) => (
                              data.fincode === value.FINCODE ?
                                <span  key={ind}>{data.Particulars_value}</span>
                              :null
                            ))}
                            </td>
                            <td>{value.PE}</td>
                            <td>
                            {fundascore.map((data, ind) => (
                              data.fincode === value.FINCODE ?
                                <span  key={ind}>{data.score}</span>
                              : null
                            ))}
                            </td>
                            <td>{value.MCAP}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Peercompare;