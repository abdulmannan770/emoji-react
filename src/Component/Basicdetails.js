import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

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
class Basicdetails extends Component {
	constructor(props){
	    super(props);
	    this.state = {
        week52high:0,week52low:0,CLOSE_PRICE:0, 
	      toppeers:[],bottompeers:[],dividendobject:[],allcmps:[],
	      COMPNAME:'',Industry:'',MCAP:'',PE:'',closeprice:'',netsale:'',totalscore:'',efficiency:'',growth:'',liquidity:'',trust:'',postionpeerspos:'', postionpeerslength:'',
	    }
  	}
  	//UNSAFE_componentWillMount () {
    componentDidMount() {
      //console.log(this.props);
	    var  fincode = this.props.fincode
      this.getDividend(fincode);
      this.getBasicdetail(fincode);
      this.getNetsales(fincode);
      this.getTotalscore(fincode);
      this.getNewToppeers(fincode);
    }
    numDifferentiation = (val)=> {
        //if(val.length>=7) val = (val/10000000).toFixed(2);
        if(val.length>=7) val = (val/10).toFixed(2);
        else{val=val;}
        return val;
    }
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
    /*************Get Basic Detail*******************/
    getKeyByValue = (object, value) => {
      if(object.hasOwnProperty(value)) {
        var item = object[value];
          return item;
      }
    }
    getBasicdetail = async (fincode) => { 
	    await axios.get(`http://172.104.5.85:3000/basicdetail/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table.length>0){
	          this.setState({
               COMPNAME:data.Table[0].COMPNAME,
	             Industry:data.Table[0].Industry,
	             MCAP:this.numDifferentiation(parseFloat(data.Table[0].MCAP).toFixed(2)),
	             closeprice:parseFloat(data.Table[0].CLOSE_PRICE).toFixed(2),
	             PE:parseFloat(data.Table[0].PE).toFixed(2),
	          })            
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
          this.props.basicDataList(responseText.data);
	    }).catch(function (error) {});
    }
	    /*************Get Nel Sales*******************/
    getNetsales = async (fincode) => { 
      await axios.get(`http://172.104.5.85:3000/netsales/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
	        if(data.length>0){
	          this.setState({
	             netsale:data[0].Particulars_value,
	          })
	        }
	    }).catch(function (error) {});
    }
	    /*************Get Fundamental Score*******************/
    getTotalscore = async (fincode) => {
	    await axios.get(`http://172.104.5.85:3000/totalscore/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
	        if(data.fundascore.length>0){
	          this.setState({
	            totalscore:parseFloat(data.fundascore[0].score).toFixed(0),
	          })
	        }
	        if(data.subfundascore.length>0){
	          this.setState({
	            efficiency:parseFloat(data.subfundascore[0].efficiency).toFixed(0),
	            growth:parseFloat(data.subfundascore[0].growth).toFixed(0),
	            liquidity:parseFloat(data.subfundascore[0].liquidity).toFixed(0),
	            trust:parseFloat(data.subfundascore[0].trust).toFixed(0),
	          })
            var growthMainValue = 3.6 * parseFloat(data.subfundascore[0].growth).toFixed(0);
            var efficiencyMainValue = 3.6 * parseFloat(data.subfundascore[0].efficiency).toFixed(0);
            var liquidityMainValue = 3.6 * parseFloat(data.subfundascore[0].liquidity).toFixed(0);
            var trustMainValue = 3.6 * parseFloat(data.subfundascore[0].trust).toFixed(0);
            this.setState({
              growthMainValue: growthMainValue,
              efficiencyMainValue: efficiencyMainValue,
              liquidityMainValue: liquidityMainValue,
              trustMainValue: trustMainValue
            });
            if (growthMainValue > 180){
              this.setState({
                growthLeftCircle: growthMainValue - 180,
                growthRightCircle: 180
              });
            }
            if(growthMainValue < 180){
              this.setState({
                growthRightCircle: growthMainValue,
                growthLeftCircle: 0
              });
            }
            if (efficiencyMainValue > 180){
              this.setState({
                efficiencyLeftCircle: efficiencyMainValue - 180,
                efficiencyRightCircle: 180
              });
            }
            if(efficiencyMainValue < 180){
              this.setState({
                efficiencyRightCircle: efficiencyMainValue,
                efficiencyLeftCircle: 0
              });
            }
            if (liquidityMainValue > 180){
              this.setState({
                liquidityLeftCircle: liquidityMainValue - 180,
                liquidityRightCircle: 180
              });
            }
            if(liquidityMainValue < 180){
              this.setState({
                liquidityRightCircle: liquidityMainValue,
                liquidityLeftCircle: 0
              });
            }
            if (trustMainValue > 180){
              this.setState({
                trustLeftCircle: trustMainValue - 180,
                trustRightCircle: 180
              });
            }
            if(trustMainValue < 180){
              this.setState({
                trustRightCircle: trustMainValue,
                trustLeftCircle: 0
              });
            }
	        }
	    }).catch(function (error) {});
    }
	    /*************Get Top peer******************/
    getNewToppeers = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/newspeedtoppeers/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;          
          if(data.fscore.length>0){
              var fdscore=data.fscore;
              fdscore.sort(function(a, b) {
                return b.score - a.score;
              });
             var data2= fdscore.slice(0, 3);           
             var datalength= fdscore.length;
             var pos = fdscore.map(function(e) { return e.fincode; }).indexOf(fincode);
            // console.log(fdscore);
              this.setState({
                 toppeers:data2,
                 postionpeerspos:pos+1,
                 postionpeerslength:datalength,
                 allcmps:data.cmp,
              })            
              fdscore.sort(function(a, b) {
                return a.score - b.score;
              });
             var data3= fdscore.slice(0, 3);
             this.setState({
                 bottompeers:data3,
              })
          }
      }).catch(function (error) {});
	}
	render(){
		const {week52high,week52low,CLOSE_PRICE,COMPNAME,MCAP,closeprice,Industry,PE,netsale,totalscore,efficiency,growth,liquidity,trust,toppeers,bottompeers,postionpeerspos,postionpeerslength,growthLeftCircle,growthRightCircle,growthMainValue,efficiencyMainValue,efficiencyRightCircle,efficiencyLeftCircle,liquidityMainValue,liquidityLeftCircle,liquidityRightCircle,trustMainValue,trustRightCircle,trustLeftCircle,dividendobject,allcmps} = this.state;
    var finalscore=0;
    if(this.props.techScore!='0' || this.props.fscore!='0')
    {
      const tescore=parseFloat(this.props.techScore)+parseFloat(this.props.fscore);
      const newscore=parseFloat(tescore)/2;
      finalscore=parseFloat(newscore).toFixed(0);
    }
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
          }]}
    };
    var toppeer= toppeers.map((value,index)=>(
      parseFloat(value.score)>=50 || postionpeerslength>6?
      <li key={index}>
        {allcmps.map((value1,index1)=>(
          value.fincode===value1.FINCODE ?
            <strong key={index1}>{value1.SYMBOL===""? value1.compname : value1.SYMBOL}</strong>
            : null
        ))}
        <span>{parseFloat(value.score).toFixed(0)}</span>
      </li>
      :''
    ))
    var bottompeer= bottompeers.map((value,index)=>(
    parseFloat(value.score)<50?
      <li key={index}>
        {allcmps.map((value1,index1)=>(
          value.fincode===value1.FINCODE ?
            <strong key={index1}>{value1.SYMBOL===""? value1.compname : value1.SYMBOL}</strong>
            : null
        ))}
        <span>{parseFloat(value.score).toFixed(0)}</span>
      </li>
      :''
    ))   
		return(
			<div>
		 	<h2>{COMPNAME}</h2>
              <div className="industryPoint clearfix">
                <div className="pointDiv">
                  <p>{closeprice}</p>
                  <p>
                    <span>55.75</span>
                    <img src="/img/img_smile_icon.png" alt="Best" />
                    <span>0.52%</span>
                  </p>
                </div>
                <div className="totalScore">
                  <span className="tScore">TOTAL<br/>SCORE</span>
                 {/* <img src="/img/img_good.png" alt="Good" />*/}
                  <img src={finalscore<25 ? "/img/liquidity.png" : finalscore>=25 && finalscore<50 ? "/img/growth.png" : finalscore>=50 && finalscore<75 ? "/img/trustss.png" : finalscore>=75 && finalscore<100 ? "/img/trust.png"  : "/img/liquidity.png" } alt="Totalscore"  height={30}/>
                  <span className="sPoint">{finalscore}</span>
                  <span className="outOfHundred">out of <br/>100</span>

                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="graphIn">
                        <ul className="highlowgraph highlowkeys clearfix">
                            <li>52 WK Low   <img src={week52low < CLOSE_PRICE && week52low < week52high ? "/img/img_fundamentel.png" : week52low > CLOSE_PRICE && week52low < week52high ? "/img/img_technical.png" : week52low < CLOSE_PRICE && week52low > week52high ? "/img/img_technical.png" : week52low > CLOSE_PRICE && week52low > week52high ? "/img/trust.png" : "/img/img_fundamentel.png" } alt="Technical"/></li>

                            <li>Close Price <img src={CLOSE_PRICE > week52low && CLOSE_PRICE > week52high ? "/img/trust.png" : CLOSE_PRICE > week52low && CLOSE_PRICE < week52high ? "/img/img_technical.png" :CLOSE_PRICE < week52low && CLOSE_PRICE > week52high ? "/img/img_technical.png" : CLOSE_PRICE < week52low && CLOSE_PRICE < week52high ? "/img/img_fundamentel.png" : "/img/img_fundamentel.png" } alt="Technical" /></li>

                            <li>52 WK High <img src={week52high < CLOSE_PRICE && week52high < week52low ? "/img/img_fundamentel.png" : week52high > CLOSE_PRICE && week52high < week52low ? "/img/img_technical.png" : week52high < CLOSE_PRICE && week52high > week52low ? "/img/img_technical.png" : week52high > CLOSE_PRICE && week52high > week52low ? "/img/trust.png" : "/img/img_fundamentel.png" } alt="Technical" /></li>
                        </ul>
                        <Bar data={state} options={options} height={70}/>
                        <ul className="highlowgraph clearfix">
                            <li>{week52low}</li>
                            <li></li>
                            <li>{week52high}</li>
                        </ul>
                       {/* <img src="/img/graph.png" alt="graph" />*/}

                      <div className="indutryList">
                      <ul>
                        <li>
                          <h2>Industry <span>{Industry}</span></h2>
                        </li>
                        <li>
                          <h2>Market Cap(Rs. cr) <span>{MCAP}</span></h2>
                        </li>
                        <li>
                          <h2>Dividend Yield (%) <span>
                                        {Object.keys(dividendobject).map(key =>
                                          key.toString()==='Dividend %' ?
                                            <span key={key.toString()}>{dividendobject[key]}</span>
                                          :null
                                        )}
                          </span></h2>
                        </li>
                        <li>
                          <h2>Net Sales <span>{netsale}</span></h2>
                        </li>
                        <li>
                          <h2>P/E <span>{PE}</span></h2>
                        </li>
                        {/*<li>
                                                                        <h2>D/E <span>--</span></h2>
                                                                      </li>
                                              */}                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="circulerProgress">
                    <div className="row">
                          <div className="col-md-3 col-sm-6">
                              <div className={growth>=0 && growth<25 ? "progress pink" : growth>=25 && growth<50 ? "progress yellow" : growth>=50 && growth<75 ? "progress blue" : growth>=75 && growth<100 ? "progress greeeeen" : "progress pink" }>
                                <img src={growth>=0 && growth<25 ? "/img/liquidity.png" : growth>=25 && growth<50 ? "/img/growth.png" : growth>=50 && growth<75 ? "/img/trustss.png" : growth>=75 && growth<100 ? "/img/trust.png"  : "/img/liquidity.png" } alt="growth" />
                                  <span className="progress-left">
                                      <span className="progress-bar" style={{transform: 'rotate('+ growthLeftCircle +'deg)'}}></span>
                                  </span>
                                  <span className="progress-right">
                                      <span className="progress-bar" style={{transform: 'rotate('+ growthRightCircle +'deg)'}}></span>
                                  </span>
                                  <div className="percentCircle groth" style={{transform: 'rotate('+ (growthMainValue) +'deg)'}}>
                                    <div className="progress-value" id="groth" style={{transform: 'rotate('+ (-growthMainValue) +'deg)'}}><span>{growth}</span></div>
                                  </div>
                                  {/*<div className="progressHover">
                                    <p>Lorem ipsum dolor sit amet, Consectetur adipiscing elit, </p>
                                  </div>*/}
                              </div>
                              <h2 className="progressHead">Growth</h2>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className={trust>=0 && trust<25 ? "progress pink" : trust>=25 && trust<50 ? "progress yellow" : trust>=50 && trust<75 ? "progress blue" : "progress greeeeen" }>

                                <img src={trust>=0 && trust<25 ? "/img/liquidity.png" : trust>=25 && trust<50 ? "/img/growth.png" : trust>=50 && trust<75 ? "/img/trustss.png" : "/img/trust.png" } alt="trust" />

                                  <span className="progress-left">
                                      <span className="progress-bar" style={{transform: 'rotate('+ trustLeftCircle +'deg)'}}></span>
                                  </span>
                                  <span className="progress-right">
                                      <span className="progress-bar" style={{transform: 'rotate('+ trustRightCircle +'deg)'}}></span>
                                  </span>
                                  <div className="percentCircle groth" style={{transform: 'rotate('+ trustMainValue +'deg)'}}>
                                    <div className="progress-value" id="groth" style={{transform: 'rotate('+ (-trustMainValue) +'deg)'}}><span>{trust}</span></div>
                                  </div>
                                  {/*<div className="progressHover">
                                    <p>Lorem ipsum dolor sit amet, Consectetur adipiscing elit, </p>
                                  </div>*/}
                              </div>
                              <h2 className="progressHead">Trust</h2>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className={efficiency>=0 && efficiency<25 ? "progress pink" : efficiency>=25 && efficiency<50 ? "progress yellow" : efficiency>=50 && efficiency<75 ? "progress blue" : "progress greeeeen" }>
                                <img src={efficiency>=0 && efficiency<25 ? "/img/liquidity.png" : efficiency>=25 && efficiency<50 ? "/img/growth.png" : efficiency>=50 && efficiency<75 ? "/img/trustss.png" : "/img/trust.png" } alt="trust" />
                                  <span className="progress-left">
                                      <span className="progress-bar" style={{transform: 'rotate('+ efficiencyLeftCircle +'deg)'}}></span>
                                  </span>
                                  <span className="progress-right">
                                      <span className="progress-bar" style={{transform: 'rotate('+ efficiencyRightCircle +'deg)'}}></span>
                                  </span>
                                  <div className="percentCircle groth" style={{transform: 'rotate('+ efficiencyMainValue +'deg)'}}>
                                    <div className="progress-value" id="groth" style={{transform: 'rotate('+ (-efficiencyMainValue) +'deg)'}}><span>{efficiency}</span></div>
                                  </div>
                                  {/*<div className="progressHover">
                                    <p>Lorem ipsum dolor sit amet, Consectetur adipiscing elit, </p>
                                  </div>*/}
                              </div>
                              <h2 className="progressHead">Efficiency</h2>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className={liquidity>=0 && liquidity<25 ? "progress pink" : liquidity>=25 && liquidity<50 ? "progress yellow" : liquidity>=50 && liquidity<75 ? "progress blue" : "progress greeeeen" }>
                                <img src={liquidity>=0 && liquidity<25 ? "/img/liquidity.png" : liquidity>=25 && liquidity<50 ? "/img/growth.png" : liquidity>=50 && liquidity<75 ? "/img/trustss.png" : "/img/trust.png" } alt="trust" />
                                  <span className="progress-left">
                                      <span className="progress-bar" style={{transform: 'rotate('+ liquidityLeftCircle +'deg)'}}></span>
                                  </span>
                                  <span className="progress-right">
                                      <span className="progress-bar" style={{transform: 'rotate('+ liquidityRightCircle +'deg)'}}></span>
                                  </span>
                                  <div className="percentCircle groth" style={{transform: 'rotate('+ liquidityMainValue +'deg)'}}>
                                    <div className="progress-value" id="groth" style={{transform: 'rotate('+ (-liquidityMainValue) +'deg)'}}><span>{liquidity}</span></div>
                                  </div>
                                  {/*<div className="progressHover">
                                    <p>Lorem ipsum dolor sit amet, Consectetur adipiscing elit, </p>
                                  </div>*/}
                              </div>
                              <h2 className="progressHead">Liquidity</h2>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="peerAnalys">
                    <h2>PEER ANALYSIS</h2>
                    <p>Stock Rank {postionpeerspos}th Out of {postionpeerslength} in Same Sector</p>
                    <div className="topBottom">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="topBottomIn topIn">
                            <img src="/img/trust.png" alt="Top 3" />
                            <h2>TOP 3</h2>
                            <div className="topBottomList">
                              <ul>
                              {toppeer}
                              {/*toppeers.map((value,index)=>(
                                 <li key={index}>{value.companylist_doc[0].compname} <span>{value.score}</span></li>
                              ))*/}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="topBottomIn bottomIn">
                            <img src="/img/liquidity.png" alt="Bottom 3" />
                            <h2>BOTTOM 3</h2>
                            <div className="topBottomList">
                              <ul>
                              {bottompeer}
                              {/*bottompeers.map((value,index)=>(
                                 <li key={index}>{value.companylist_doc[0].compname} <span>{value.score}</span></li>
                              ))*/}
                              </ul>
                            </div>
                          </div>
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

export default Basicdetails;