import React, { Component } from 'react';
import Header from './Header';
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
class NewProfitandLoss extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
	      pldata:[],
        pldataobject:[],
        allnextkeys1:[],
	    }
  	}
  	UNSAFE_componentWillMount () {
	    var  fincode = this.props.match.params.fincode
	    /*************Get Balancesheet*******************/
	    axios.get(`http://172.104.5.85:3000/ProfitandLoss/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //if(data.length>0){
          if(data.Table1.length>0){
            var allkeys=Object.keys(data.Table1[0]);
            var allnextkeys=allkeys.slice(1);
            var allnextkeys=allnextkeys.reverse();
            console.log(allnextkeys);
            this.setState({
               pldata:data.Table1,      
               pldataobject:data.Table1[0],
                allnextkeys1:allnextkeys,
            })
	        }
        //}
	    }).catch(function (error) {});
	}
	render(){
		const {error,pldata,pldataobject,allnextkeys1} = this.state; 
		return(
       <div id="wrapper">
    {/********Header *************/}
      <Header />

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
                            {Object.keys(pldataobject).map(key =>
                                key.toString()!=='Particulars'?
                                  <th key={key.toString()}>{Object.keys(allnextkeys1).map(key2 => key2!=0 && key===allnextkeys1[key2] ? key.toString() : null)}</th>
                                :null
                            )}
                            <th colSpan='5'>Last Five Quarter Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pldata.map((value, index) => (
                            index!==0 ?
                            <tr key={index}>
                              {Object.keys(pldataobject).map(key =>   
                                key.toString()==='Particulars' ?     
                                <td key={key.toString()}>{value[key]}</td> :      
                                <td key={key.toString()}>{Object.keys(allnextkeys1).map(key2 => key===allnextkeys1[key2] ? (value[key]-value[allnextkeys1[key2-1]]<='25') ? <span key={key2} className='redLight'>{value[key]}</span> : (value[key]-value[allnextkeys1[key2-1]]>'25' && value[key]-value[allnextkeys1[key2-1]]<='50') ? <span key={key2} className='yellow'>{value[key]}</span>  : (value[key]-value[allnextkeys1[key2-1]]>'50' && value[key]-value[allnextkeys1[key2-1]]<='75') ? <span key={key2} className='greenLight'>{value[key]}</span> : (value[key]-value[allnextkeys1[key2-1]]>'75') ? <span key={key2} className='greenDark'>{value[key]}</span>: '' : '')}{/*Object.keys(allnextkeys1).map(key2 => key===allnextkeys1[key2] ? value[key]-value[allnextkeys1[key2-1]] : '')*/}</td>
                              )}
                              {Object.keys(pldataobject).map(key =>    
                                key.toString()!=='Particulars' ?
                                <td key={key.toString()} >{Object.keys(allnextkeys1).map(key2 => key===allnextkeys1[key2] ? (value[key]-value[allnextkeys1[key2-1]]<='25') ? <img key={key2} src="/img/img_bed.png"/> : (value[key]-value[allnextkeys1[key2-1]]>'25' && value[key]-value[allnextkeys1[key2-1]]<='50') ? <img key={key2} src="/img/img_good_small.png"/> : (value[key]-value[allnextkeys1[key2-1]]>'50' && value[key]-value[allnextkeys1[key2-1]]<='75') ? <img key={key2} src="/img/img_batter.png"/> : (value[key]-value[allnextkeys1[key2-1]]>'75') ? <img key={key2} src="/img/img_best.png"/> : '' : '')}</td>
                                :null
                              )}
                            </tr>
                            :null
                            ))}  
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
          </div>
       	)
	}
}

export default NewProfitandLoss;