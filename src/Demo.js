import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Component/Header';
import axios from 'axios';
import {Bar,Doughnut} from 'react-chartjs-2';

const options = {
      title:{display:false,text:'',fontSize:20},
      legend:{ display:false,position:'right'},
      scales : {
        yAxes : [{
          display: false,
          gridLines : {color: "rgba(0, 0, 0, 0)"}                
        }],
        xAxes : [{
            display: false,
           gridLines: {display: false, color: "#9c9da0"},
              categoryPercentage: 0.5,barPercentage: 1
        }]
      }
}
class Demo extends Component {
	constructor(props){
	    super(props);
	    this.state = {
              week52high:0,
              week52low:0,
              CLOSE_PRICE:0, 
      }

    }
    UNSAFE_componentWillMount () {
        var  fincode = this.props.match.params.fincode
        this.getBasicdetail(fincode);
    }     
  /*************Get stockbulkdeals*******************/     
   getBasicdetail = async (fincode) => { 
      await axios.get(`http://172.104.5.85:3000/basicdetail/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          if(data.Table.length>0){
            var jsObject=data.Table[0];
            var week52high=this.getKeyByValue(jsObject,"52WeekHigh");
            var week52low=this.getKeyByValue(jsObject,"52WeekLow");
            var  CLOSE_PRICE=jsObject.CLOSE_PRICE;
            this.setState({
              week52high:parseInt(week52high),
              week52low:parseInt(week52low),
              CLOSE_PRICE:parseInt(CLOSE_PRICE),
            })
          }
      }).catch(function (error) {});
    }
  getKeyByValue = (object, value) => {
    if(object.hasOwnProperty(value)) {
      var item = object[value];
        return item;
    }
  }
  numDifferentiation = (val)=> {
      if(val.length>=7) val = (val/10000000).toFixed(0)+'cr';
      else{val=val;}
      return val;
  }
	render(){
    const {week52high,week52low,CLOSE_PRICE,alllabels,fundavalues} = this.state; 
		const state = (canvas) =>  {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 275, 0);
        if(week52low<CLOSE_PRICE && CLOSE_PRICE<week52high){
          gradient.addColorStop(1, 'rgba(0,105,12,1)');   //green
          gradient.addColorStop(0.5, 'rgba(246,196,0,1)'); //yellow
          gradient.addColorStop(0, 'rgba(169,9,9,1)');     //red
        }else if(week52low > CLOSE_PRICE && CLOSE_PRICE<week52high && week52low > week52high){
          gradient.addColorStop(0, 'rgba(0,105,12,1)');   //green
          gradient.addColorStop(0.5, 'rgba(169,9,9,1)'); //red
          gradient.addColorStop(1, 'rgba(246,196,0,1)'); //yellow
        }else if(week52low>CLOSE_PRICE && CLOSE_PRICE<week52high && week52low < week52high){
          gradient.addColorStop(1, 'rgba(0,105,12,1)');   //green
          gradient.addColorStop(0.5, 'rgba(169,9,9,1)'); //red
          gradient.addColorStop(0, 'rgba(246,196,0,1)'); //yellow
        }else if(CLOSE_PRICE>week52low && CLOSE_PRICE>week52high && week52low > week52high){
          gradient.addColorStop(0.5, 'rgba(0,105,12,1)');   //green
          gradient.addColorStop(1, 'rgba(169,9,9,1)'); //red
          gradient.addColorStop(0, 'rgba(246,196,0,1)'); //yellow
        }else if(week52low>CLOSE_PRICE && CLOSE_PRICE>week52high){
          gradient.addColorStop(0, 'rgba(0,105,12,1)');   
          gradient.addColorStop(0.5, 'rgba(246,196,0,1)');
          gradient.addColorStop(1, 'rgba(169,9,9,1)');
        }
        return {labels : [week52low,"",week52high],
          datasets : [{
              label : "",
              type: 'line',
              data : [week52low,CLOSE_PRICE,week52high],
              backgroundColor : gradient,
              borderColor : "#87888b",
              borderWidth : 0
            }]
        }
    };

		return(
       <div id="wrapper">
    {/********Header *************/}
      <Header />

          <div>
        <div id="mainimg">
          <div className="scoreSection">
            <div className="mainContainer">
              <div className="mainScore clearfix">
                <div className="fundaScore">
                  <h2>FUNDAMENTAL SCORE</h2>
                  <img src="/img/img_fundamentel.png" alt="Fundamentel" />
                </div>
                <div className="fundaScore techni">
                  <h2>TECHNICAL SCORE</h2>
                  <img src="/img/img_technical.png" alt="Technical" />
                  <span>75</span>
                </div>
              </div>
            </div>
          </div>      
        </div>
        <div id="contents">
          <div id="main">
			      <div className="row mt10">
                <div className="col-md-3">
                  <div className="graphIn">
                    <ul className="highlowgraph highlowkeys clearfix">
                            <li>52 WK Low   <img src={week52low < CLOSE_PRICE && week52low < week52high ? "/img/img_fundamentel.png" : week52low > CLOSE_PRICE && week52low < week52high ? "/img/img_technical.png" : week52low < CLOSE_PRICE && week52low > week52high ? "/img/img_technical.png" : week52low > CLOSE_PRICE && week52low > week52high ? "/img/trust.png" : "/img/img_fundamentel.png" } alt="Technical"/></li>

                            <li>Close Price <img src={CLOSE_PRICE > week52low && CLOSE_PRICE > week52high ? "/img/trust.png" : CLOSE_PRICE > week52low && CLOSE_PRICE < week52high ? "/img/img_technical.png" :CLOSE_PRICE < week52low && CLOSE_PRICE > week52high ? "/img/img_technical.png" : CLOSE_PRICE < week52low && CLOSE_PRICE < week52high ? "/img/img_fundamentel.png" : "/img/img_fundamentel.png" } alt="Technical" /></li>

                            <li>52 WK High <img src={week52high < CLOSE_PRICE && week52high < week52low ? "/img/img_fundamentel.png" : week52high > CLOSE_PRICE && week52high < week52low ? "/img/img_technical.png" : week52high < CLOSE_PRICE && week52high > week52low ? "/img/img_technical.png" : week52high > CLOSE_PRICE && week52high > week52low ? "/img/trust.png" : "/img/img_fundamentel.png" } alt="Technical" /></li>
                        </ul>
                        <Bar data={state} options={options} height={50}/>
                        <ul className="highlowgraph clearfix">
                            <li>{week52low}</li>
                            <li></li>
                            <li>{week52high}</li>
                        </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="strengthWeek">
                    <div className="clearfix">
                      <div className="strength">
                        <h2>Strength</h2>
                        <ul>
                        </ul>
                      </div>
                      <div className="weekness">
                        <h2>WEAKNESS</h2>
                        <ul>
                        </ul>
                      </div>
                    </div>
                    <p className="knowMore"><Link to="#" className="">Know More</Link></p>
                    <select id="cstype" onChange={this.cstypeChangehandler} value={this.state.cstype}>
                      <option value="S">Standalone</option>
                      <option value="C">Consolidated</option>
                    </select>
                   
                  </div>
                  </div>
              </div>
            </div>
          </div>
            </div>
          </div>
       	)
	}
}

export default Demo;