import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

const options = {
      layout: {
                padding:{left: 0,right: 50,top: 0,bottom: 0}
              },
      title:{display:false,text:'',fontSize:20},
      legend:{ display:false,position:'right'},
      scales : {
        yAxes : [{
          ticks : {beginAtZero: true},
          gridLines : {borderDash: [3, 1],color: "#9c9da0"}                
        }],
        xAxes : [{
           gridLines: {display: false, color: "#9c9da0"},
              categoryPercentage: 0.5,barPercentage: 1
        }]
      }
}
class Test extends Component {
  constructor(props){
      super(props);
      this.state = {
        loading: true,
        result:[],
        lastyear:'',
        Particulars:'',
        cstype:'',
        searchresults: [],
        display: {  display: 'none' },
        cmpname:'',
        dropdownopen:false,
        graphtype:'bar',
        checkevEbita: 'evEbita', checkbookPrice: 'bookPrice',checkevnetSales: '', checkYield: '',checkdebtEquity: '', checkinterestCover: '',checkROA: '', checkROE: '', checkROCE: '',
      }
    }
    //UNSAFE_componentWillMount () {
    componentDidMount() {
        var  fincode = this.props.match.params.fincode
      this.getFinancialRatios('S',fincode);
      document.addEventListener("mousedown", this.handleClickOutside);
      this.getTechnicalScore(fincode);
    }
    getTechnicalScore = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/getTechnicalScore/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          console.log(data.data)
          this.setState({
              //strengthdata:data.strength,
              //weekness:data.weekness,
          })
      }).catch(function (error) {});
    }
      /*************Get financialratios*******************/
    CSfinctypeChangehandler = (event) =>{  
        var  fincode = this.props.match.params.fincode
      this.getFinancialRatios(event.target.value,fincode);
    }
    getFinancialRatios = async (cstype,fincode) => {
      await axios.get(`http://172.104.5.85:3000/financialratios/`+cstype+`/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          this.setState({loading: false,});
          var data = responseText.data;
          //console.log(data[data.length-1].year);
          if(data.length>0){
            this.setState({
               result:data,
               Particulars:data[0].Particulars,
               lastyear:data[data.length-1].year,
               cstype:cstype,  
            })
          }
      }).catch(function (error) {});
  }
  onChangeHadler(e){
      if (e.target.value && e.target.value.length > 1) {
         axios.get("http://172.104.5.85:3000/searchcompany/"+e.target.value, {
            headers: new Headers({
              "Content-Type": "application/json", // <-- Specifying the Content-Type
            }),
          }).then(responseText => {
              var data = responseText.data;
              this.setState({
                 searchresults: data,
              })
          }).catch(function (error) {}); 
          this.setState({
            cmpname:e.target.value,
            display: {  display: 'block' },
          })
      }else{
          this.setState({
            display: { display: 'none' },
            cmpname:e.target.value,
          })
      }
    }
    onClickSearchHadler(fincode,cmpname){  
        var cstype=document.getElementById('cstype').value;
        this.setState({
          loading:true,
          display: {  display: 'none' },
          cmpname:cmpname,
        })
        this.getFinancialRatios(cstype,fincode); 
    }

  onChangeGraphHandler = (event) => {
      const target = event.target;
      const { name = '', value = '' } = target;
      target.checked === true ? this.setState({ [name]: value })
      :this.setState({[name]: ''})
  }
  graphtypeOnChange =(event)=>{
    this.setState({
      graphtype:event.target.value
    })
  }
  container = React.createRef();
  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        dropdownopen: false,
      });
    }
  };
  render(){
    const checkitems=["&nbsp;&nbsp;&nbsp;EV/Core EBITDA(x)","&nbsp;&nbsp;&nbsp;Price/Book(x)","&nbsp;&nbsp;&nbsp;EV/Net Sales(x)","&nbsp;&nbsp;&nbsp;Yield(%)","&nbsp;&nbsp;&nbsp;Total Debt/Equity(x)","&nbsp;&nbsp;&nbsp;Interest Cover(x)","&nbsp;&nbsp;&nbsp;ROA(%)","&nbsp;&nbsp;&nbsp;ROE(%)","&nbsp;&nbsp;&nbsp;ROCE(%)"];  
    const {result,lastyear,Particulars,dropdownopen,graphtype,checkevEbita= '', checkbookPrice= '',checkevnetSales= '', checkYield= '',checkdebtEquity= '', checkinterestCover= '',checkROA= '', checkROE= '', checkROCE= '',} = this.state;    
    var serachlist =this.state.searchresults.map((value, index) => (
        <li key={value.FINCODE}><Link to="#" onClick={() => this.onClickSearchHadler(value.FINCODE,value.compname)}>{value.compname}</Link></li>
    ));  
    var labels = []; var evEbita=[];var bookPrice=[];var evnetSales=[];var yieldper=[];
    var debtEquity=[];var interestCover=[];var ROA=[];var ROE=[];var ROCE=[];
    if(result.length>0)
    {
        for(var l=0;l<result.length;l++)
        {
            if(Particulars===result[l].Particulars)
            {
              labels.push(result[l].year);
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;EV/Core EBITDA(x)")
            {
                evEbita.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;Price/Book(x)")
            {
                bookPrice.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;EV/Net Sales(x)")
            {
                evnetSales.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;Yield(%)")
            {
                yieldper.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;Total Debt/Equity(x)")
            {
                debtEquity.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;Interest Cover(x)")
            {
                interestCover.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;ROA(%)")
            {
                ROA.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;ROE(%)")
            {
                ROE.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
            if(result[l].Particulars==="&nbsp;&nbsp;&nbsp;ROCE(%)")
            {
                ROCE.push(parseFloat(result[l].Particulars_value).toFixed(2));
            }
        }
    }   
    //console.log(evEbita);
    var datasets=[];
    if(checkevEbita!==''){
        datasets.push({ label : "EV/Core EBITDA(x)",
          data : evEbita,
          type: graphtype,
          backgroundColor :graphtype === 'bar' ? "#87888b" :"rgba(0,0,0,0)",
          borderColor : "#87888b",
          borderWidth : 1 });
    }
    if(checkbookPrice!==''){
        datasets.push({ label : "Price/Book(x)",
                    data : bookPrice,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#265aa8" :"rgba(0,0,0,0)",
                    borderColor : "#265aa8",
                    borderWidth : 0   });
    }
    if(checkevnetSales!==''){
      datasets.push({ label : "EV/Net Sales(x)",
                    data : evnetSales,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#658b00" :"rgba(0,0,0,0)",
                    borderColor : "#658b00",
                    borderWidth : 0   });
    }
    if(checkYield!==''){
        datasets.push({ label : "Yield(%)",
                    data : yieldper,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#d8b900" :"rgba(0,0,0,0)",
                    borderColor : "#d8b900",
                    borderWidth : 0   });
    }
    if(checkdebtEquity!==''){
        datasets.push({ label : "Total Debt/Equity(x)",
                    data : debtEquity,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#00d8a6" :"rgba(0,0,0,0)",
                    borderColor : "#00d8a6",
                    borderWidth : 0   });
    }
    if(checkinterestCover!==''){
        datasets.push({ label : "Interest Cover(x)",
                    data : interestCover,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#0088d8" :"rgba(0,0,0,0)",
                    borderColor : "#0088d8",
                    borderWidth : 0   });
    }
    if(checkROA!==''){
        datasets.push({ label : "ROA(%)",
          data : ROA,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#264015" :"rgba(0,0,0,0)",
          borderColor : "#264015",
          borderWidth : 0 });
    }
    if(checkROE!==''){
        datasets.push({ label : "ROE(%)",
          data : ROE,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#2a6903" :"rgba(0,0,0,0)",
          borderColor : "#2a6903",
          borderWidth : 0 });
    }
    if(checkROCE!==''){
        datasets.push({ label : "ROCE(%)",
          data : ROCE,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#7715f9" :"rgba(0,0,0,0)",
          borderColor : "#7715f9",
          borderWidth : 0 });
    }
    const state = {  labels : labels, datasets : datasets };
    return(
            <div>
             <div className="balanceSheet">
              <div className="mainContainer">
                <div className="finencialIn">
                  <h2 className="mainHead">FINANCIAL RATIOS <span></span></h2>
                  <div className="balanceFilter">
                    <ul>
                      <li>
                        <select id="cstype" onChange={this.CSfinctypeChangehandler} value={this.state.cstype}>
                            <option value="S">Standalone</option>
                            <option value="C">Consolidated</option>
                        </select>
                      </li>
                      <li>
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search Stock" value={this.state.cmpname}  onChange={this.onChangeHadler.bind(this)} autoComplete="off"/>
                        <ul className="downshift-dropdown companyList innerserach" style={this.state.display}>
                          {serachlist}
                        </ul>
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
                      <table className="table table-striped tableLoder">
                        <thead>
                          <tr>
                            <th>Description</th>
                            {result.map((data, ind) => (
                              Particulars===data.Particulars ?
                                <th key={ind}>{data.year}</th>
                              :null
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.loading ? <tr><td><div className="emojiloader"><img src="/img/loader.gif" alt="loading..."/></div></td></tr>:
                            result.map((value, index) => (
                              value.year===lastyear && checkitems.indexOf(value.Particulars) > -1 ?
                                  <tr key={value._id}>
                                    <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;", " ")}</td>
                                    {result.map((data, ind) => (
                                      value.Particulars===data.Particulars ?
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
                      <select  id="graphtype" onChange={this.graphtypeOnChange} value={this.state.graphtype}>
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                      </select>
                  </div>  
                  <div className="filterIn" ref={this.container}>
                      <span className="paraMe" onClick={() => this.setState({ dropdownopen: !this.state.dropdownopen })}>By Parameters</span>
                      {dropdownopen?
                      <ul>
                          <li><input type="checkbox" name="checkevEbita" value="evEbita" onChange={this.onChangeGraphHandler} checked={this.state.checkevEbita}/>EV/Core EBITDA(x)</li>
                          <li><input type="checkbox" name="checkbookPrice" value="bookPrice" onChange={this.onChangeGraphHandler}  checked={this.state.checkbookPrice}/>Price/Book(x)</li>
                          <li><input type="checkbox" name="checkevnetSales" value="evnetSales" onChange={this.onChangeGraphHandler} checked={this.state.checkevnetSales}/>EV/Net Sales(x)</li>
                          <li><input type="checkbox" name="checkYield" value="yieldper" onChange={this.onChangeGraphHandler} checked={this.state.checkYield}/>Yield(%)</li>
                          <li><input type="checkbox" name="checkdebtEquity" value="debtEquity" onChange={this.onChangeGraphHandler} checked={this.state.checkdebtEquity}/>Total Debt/Equity(x)</li>
                          <li><input type="checkbox" name="checkinterestCover" value="interestCover" onChange={this.onChangeGraphHandler} checked={this.state.checkinterestCover}/>Interest Cover(x)</li>
                          <li><input type="checkbox" name="checkROA" value="ROA" onChange={this.onChangeGraphHandler} checked={this.state.checkROA}/>ROA(%)</li>
                          <li><input type="checkbox" name="checkROE" value="ROE" onChange={this.onChangeGraphHandler} checked={this.state.checkROE}/>ROE(%)</li>
                          <li><input type="checkbox" name="checkROCE" value="ROCE" onChange={this.onChangeGraphHandler} checked={this.state.checkROCE}/>ROCE(%)</li>
                      </ul>
                      :null}
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

export default Test;