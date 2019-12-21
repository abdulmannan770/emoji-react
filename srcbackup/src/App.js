import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import Header from './Header';
import Basicdetails from './Basicdetails';
import Peercompare from './Peercompare';
import Bulkblockdeals from './Bulkblockdeals';
import Corporateactions from './Corporateactions';
import Balancesheet from './Balancesheet';
import Cashflow from './Cashflow';
import Financialratios from './Financialratios';
import Announcement from './Announcement';
import Profitandloss from './Profitandloss';
import Shareholding from './Shareholding';
import axios from 'axios';
const options = {
      layout: { padding:{left: 0,right: 50,top: 0,bottom: 0} },
      title:{display:false,text:'',fontSize:20},
      legend:{ display:false,position:'right'},
      scales : {
        yAxes : [{
          ticks : {beginAtZero: true},
          gridLines : {borderDash: [3, 1],color: "#9c9da0"}                
        }],
        xAxes : [{
            gridLines: {display: false, color: "#9c9da0"},
            type: 'time',
            time: { unit: 'month' },
            categoryPercentage: 0.5,barPercentage: 1,

        }] }
  }
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
       fincode: this.props.match.params.fincode,
       fscore:'',
       strengthdata:[],
       weekness:[],
    }
  }
  	UNSAFE_componentWillMount () {
   	 	var  fincode = this.props.match.params.fincode;
   		axios.get(`http://172.104.5.85:3000/totalscore/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
	        if(data.fundascore.length>0){
	          this.setState({
	            fscore:parseFloat(data.fundascore[0].score).toFixed(0),
	          })
	        }
	    }).catch(function (error) {});
   		axios.get(`http://testpnp.ml/accorddemo/index.php/welcome/newstrengthweekness/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        this.setState({
	            strengthdata:data.strength,
	            weekness:data.weekness,
	        })
	    }).catch(function (error) {});
      axios.get(`http://172.104.5.85:3000/graphfunda/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          if(data.length>0){
            //console.log(data.length);
            var alllabels=[];
            var fundavalues=[];
            for(var i=0;i<data.length;i++){
                alllabels.push(data[i].date);
                fundavalues.push(data[i].score);
            }
            this.setState({
              fundavalues:fundavalues,
              alllabels:alllabels,
            })
          }
      }).catch(function (error) {});
	}
  render() {
  	const {error,fscore,strengthdata,weekness,alllabels,fundavalues} = this.state; 
    var statedata={  labels: alllabels,
                    datasets : [{
                        label : "Price",
                        data : [-100,-70,-20,-50,-90,-40,],
                        backgroundColor : "#e88582",
                        borderColor : "#87888b",
                        borderWidth : 0
                      },{
                        label : "",
                        data : [50,90,40,100,70,20],
                        backgroundColor : "#69cb9f",
                        borderColor : "#265aa8",
                        borderWidth : 0
                      },{
                        label : "Score",
                        type: 'line',
                        data : fundavalues,
                        backgroundColor : "rgba(0,0,0,0)",
                        borderColor : "#3d464f",
                        borderWidth : 2
                      }
                  ]
                };
  	var strengthdatanew=strengthdata.slice(0, 4).map((value, index) => (
        <li key={index}>{value}</li>
      ));
  	var weeknessdata=weekness.slice(0, 4).map((value, index) => (
        <li key={index}>{value}</li>
      ));
    return (
      <div id="wrapper">
    {/********Header *************/}
      <Header />

      <article className="aticle">
        <div id="mainimg">
          <div className="scoreSection">
            <div className="mainContainer">
              <div className="mainScore clearfix">
                <div className="fundaScore">
                  <h2>FUNDAMENTAL SCORE</h2>
                  <img src="/img/img_fundamentel.png" alt="Fundamentel" />
                  <span>{fscore}</span>
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


            <div className="industrySection">
          {/********Basic Detail*************/}
            <Basicdetails {...this.state}/>


              <div className="row mt10">
                <div className="col-md-4">
                  <div className="candelChart">
                    <Bar data={statedata} options={options} />
                  </div>
                    {/*<img src="/img/graph_chart_img.png" alt="Technical" style={{height: '235px'}}/>
                  
                    <div id="chartContainer" style={{height: '167px', width: '100%'}}></div>
                  */}
                </div>
                <div className="col-md-8">
                  <div className="strengthWeek">
                    <div className="clearfix">
                      <div className="strength">
                        <h2>Strength</h2>
                        <ul>
                        {strengthdatanew}
                        </ul>
                      </div>
                      <div className="weekness">
                        <h2>WEAKNESS</h2>
                        <ul>
                         {weeknessdata}
                        </ul>
                      </div>
                    </div>
                    <p className="knowMore"><a href="#" className="">Know More</a></p>
                  </div>
                </div>
              </div>
            </div>



            <div className="aboutCompany mt50">
              <div className="mainContainer">
                <h2 className="mainHead">ABOUT THE COMPANY 
                  <span></span>
                </h2>
                <div className="aboutContain">
                  <div className="containIn">
                    <p>Reliance Industries Limited (RIL) is an Indian multinational conglomerate company headquartered in Mumbai, Maharashtra, India. Reliance owns businesses across India engaged in energy, petrochemicals, textiles, natural resources, retail, and telecommunications. Reliance is one of the most profitable companies in India, the largest ly traded company in India by market capitalization, and the largest company in India as measured by revenue after recently surpassing the government-controlled Indian Oil Corporation. On 18 October 2007, Reliance Industries became the first Indian company to breach &#37;100 billion market capitalization.</p>
                    <p>The company is ranked 148th on the Fortune Global 500 list of the world's biggest corporations as of 2018. It is ranked 8th among the Top 250 Global Energy Companies by Platts as of 2016. Reliance continues to be India’s largest exporter, accounting for 8% of India's total merchandise exports with a value of Rs 147,755 crore and access to markets in 108 countries.Reliance is responsible for almost 5% of the government of India's total revenues from customs and excise duty. It is also the highest income tax payer in the private sector in India.</p>
                    <h2>HISTORY</h2>
                    <p>The company's equity shares are listed on the National Stock Exchange of India Limited (NSE) and the BSE Limited. The Global Depository Receipts (GDRs) issued by the Company are listed on Luxembourg Stock Exchange.It has issued approx. 56 million GDRs wherein each GDR is equivalent to two equity shares of the company. Approximately 3.46% of its total shares are listed on Luxembourg Stock Exchange.</p>
                    <p>Its debt securities are listed at the Wholesale Debt Market (WDM) Segment of the National Stock Exchange of India Limited (NSE).</p>
                    <p>It has received domestic credit ratings of AAA from CRISIL (S&P subsidiary) and Fitch. Moody's and S&amp;P have provided investment grade ratings for international debt of the company, as Baa2 positive outlook (local currency issuer rating) and BBB+ outlook respectively.On the 28th of December, 2017, RIL announced that it will be acquiring the wireless assets of Anil Ambani-led Reliance Communications for about ₹23,000 crores.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>
            </div>

            {/******peercompare************/}

            <Peercompare  {...this.state} />
            

            {/******Bulk Block Deals************/}
            <Bulkblockdeals  {...this.state}/>

            {/******Corporateactions************/}
            <Corporateactions  {...this.state}/>

            {/******Announcement************/}
            <Announcement  {...this.state}/>
           
            {/******Announcement************/}
            <Profitandloss  {...this.state}/>        


            {/********Balancesheet Detail*************/}
            <Balancesheet {...this.state}/>

            {/********Cashflow Detail*************/}
            <Cashflow {...this.state}/>           


            {/********Financialratios Detail*************/}
            <Financialratios {...this.state}/>            


            {/********Share Holding Detail*************/}
            <Shareholding {...this.state}/>   

            <div className="invest">
              <div className="mainContainer">
                <h2 className="mainHead">INVESTOR PRESENTATION <span></span></h2>
                <div className="row mt10">
                  <div className="col-md-7">
                    <div className="mainTab">
                      <div className="tab" role="tabpanel">
                        <ul className="nav nav-tabs" role="tablist">
                              <li role="presentation" className="active">
                                <a href="#Section11" aria-controls="home" role="tab" data-toggle="tab">Investor Presentation</a>
                              </li>
                              <li role="presentation">
                                <a href="#Section12" aria-controls="profile" role="tab" data-toggle="tab">ConCall</a>
                              </li>
                        </ul>
                        <div className="tab-content tabs">

                          <div role="tabpanel" className="tab-pane show in active" id="Section11">
                            <div className="investerTop">
                                    <ul>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                      <li className="clearfix">
                                        <div className="investerDiv">
                                          <h2>Investor Presentation</h2>
                                          <span>Thu, 11-Sep-2019 14:27</span>
                                        </div>
                                        <div className="pdfLink">
                                          <a href="#">
                                            <img src="/img/img_pdf.png" alt="PDF" />
                                          </a>
                                        </div>
                                      </li>
                                    </ul>
                            </div>
                                  
                          </div>




                          <div role="tabpane0l" className="tab-pane fade" id="Section12">
                                    <div className="investerTop">
                                      <ul>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
                                        <li className="clearfix">
                                          <div className="investerDiv">
                                            <h2>Investor Presentation</h2>
                                            <span>Thu, 11-Sep-2019 14:27</span>
                                          </div>
                                          <div className="pdfLink">
                                            <a href="#">
                                              <img src="/img/img_pdf.png" alt="PDF" />
                                            </a>
                                          </div>
                                        </li>
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


            <div className="technical">
              <div className="mainContainer">
                <div className="technicalTab">
                  <div className="mainTab">
                    <div className="tab" role="tabpanel">
                      <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active">
                          <a href="#Section21" aria-controls="home" role="tab" data-toggle="tab" aria-expanded="true">Technical</a>
                        </li>
                        <li role="presentation" className="">
                          <a href="#Section22" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">Featured</a>
                        </li>
                        <li role="presentation" className="">
                          <a href="#Section23" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">Fundamental</a>
                        </li>
                      </ul>
                      <div className="tab-content tabs">

                        <div role="tabpanel" className="tab-pane show active in" id="Section21">
                          
                          <div className="techniIn">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_candle.png" alt="Candlestick Patterns" />
                                  <h2>Candlestick Patterns</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_trad.png" alt="Expert Trader" />
                                  <h2>Expert Trader</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_indicator.png" alt="Technical Indicators" />
                                  <h2>Technical Indicators</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_future.png" alt="Future Corner" />
                                  <h2>Future Corner</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_price.png" alt="Price Action EOD" />
                                  <h2>Price Action EOD</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_price.png" alt="Price Action Intraday" />
                                  <h2>Price Action Intraday</h2>
                                  <div className="techniHover posChange">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul>
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>




                        <div role="tabpanel" className="tab-pane fade" id="Section22">
                          <div className="techniIn">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_candle.png" alt="Candlestick Patterns" />
                                  <h2>Candlestick Patterns</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_trad.png" alt="Expert Trader" />
                                  <h2>Expert Trader</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_indicator.png" alt="Technical Indicators" />
                                  <h2>Technical Indicators</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_future.png" alt="Future Corner" />
                                  <h2>Future Corner</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_price.png" alt="Price Action EOD" />
                                  <h2>Price Action EOD</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_price.png" alt="Price Action Intraday" />
                                  <h2>Price Action Intraday</h2>
                                  <div className="techniHover posChange">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul>
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>    
                        </div>




                        <div role="tabpanel" className="tab-pane fade" id="Section23">
                          <div className="techniIn">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_candle.png" alt="Candlestick Patterns" />
                                  <h2>Candlestick Patterns</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_trad.png" alt="Expert Trader" />
                                  <h2>Expert Trader</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_indicator.png" alt="Technical Indicators" />
                                  <h2>Technical Indicators</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_future.png" alt="Future Corner" />
                                  <h2>Future Corner</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_price.png" alt="Price Action EOD" />
                                  <h2>Price Action EOD</h2>
                                  <div className="techniHover">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                              <div className="col-md-2">
                                <div className="tecniPattern">
                                  <img src="/img/img_price.png" alt="Price Action Intraday" />
                                  <h2>Price Action Intraday</h2>
                                  <div className="techniHover posChange">
                                    <ul>
                                      <li>
                                        <a href="#">Doji Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul>
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bearish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>

                                      <li>
                                        <a href="#">Bullish Continuation Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bearish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
                                      
                                      <li>
                                        <a href="#">Bullish Reversal Pattern <i className="fa fa-plus" aria-hidden="true"></i></a>
                                        <ul className="openPattern">
                                          <li>Doji (79)</li>
                                          <li>Long Legged Doji (20)</li>
                                          <li>Dragon Fly Doji (15)</li>
                                          <li>Gravestone Doji (12)</li>
                                        </ul>
                                      </li>
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
                </div>
              </div>
            </div>








          </div>

            <div className="stayUpdate">
              <div className="mainContainer">
                <div className="stayIn">
                  <h2>Stay Updated</h2>
                  <p>Get your latest content delivered straight to your inbox or WhatsApp</p>
                  <button className="subscriBtn">Subscribe to our alerts</button>
                </div>
              </div>
            </div>
        </div>
      </article>
      <footer>
        <div id="footer">
          <div className="mainContainer">
            <div className="footIn">
              <div className="row">
                <div className="col-md-3">
                  <div className="footAbout">
                    <p className="op">
                      <img src="/img/footer_logo.png" alt="Footer Logo" />
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="footLink">
                    <h2 className="footHead">Our Address</h2>
                    <ul>
                      <li>
                        <a href="#">Our Address</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="footLink">
                    <h2 className="footHead">Lorem Ipsum</h2>
                    <ul>
                      <li>
                        <a href="#">© 2019 by Stocks Emoji</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="contact">
                    <h2 className="footHead">Contact Us</h2>
                    <ul className="social">
                      <li>
                        <a href="#"><i className="fa fa-facebook"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fa fa-linkedin"></i></a>
                      </li>
                    </ul>

                    <div className="footLink">
                      <ul>
                        <li>
                          <a href="#">+91 98765 23252</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}}
export default App;