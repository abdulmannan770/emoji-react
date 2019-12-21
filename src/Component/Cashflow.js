import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

const options = {
      layout: {
                padding:{left: 0,right: 50,top: 0,bottom: 0},
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
class Cashflow extends Component {
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
        checkPBT:'PBT',checkAdjustment:'',checkCIWC:'',checkCFCIWC:'',checkCFOA:'CFOA',checkCFIA:'',checkCFFA:'',checkNetCIO:'',checkOCCE:'',checkCCCE:'',
      }
    }
  	//UNSAFE_componentWillMount () {
    componentDidMount() {
      var  fincode = this.props.fincode;
      this.getCashflow('S',fincode);
      document.addEventListener("mousedown", this.handleClickOutside);
    }
    /*************Get Cashflow*******************/
    CSflowtypeChangehandler = (event) =>{ 
      var  fincode = this.props.fincode;
      this.getCashflow(event.target.value,fincode);
    }
    getCashflow = async (cstype,fincode) => {
      await axios.get(`http://172.104.5.85:3000/Cashflow/`+cstype+`/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          this.setState({loading: false,});
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
        this.getCashflow(cstype,fincode); 
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
    const {result,lastyear,Particulars,dropdownopen,graphtype,checkPBT='',checkAdjustment='',checkCIWC='',checkCFCIWC='',checkCFOA='',checkCFIA='',checkCFFA='',checkNetCIO='',checkOCCE='',checkCCCE='',} = this.state;  
     var serachlist =this.state.searchresults.map((value, index) => (
        <li key={value.FINCODE}><Link to="#" onClick={() => this.onClickSearchHadler(value.FINCODE,value.compname)}>{value.compname}</Link></li>
    ));  
    var labels=[];
    var PBT=[];var CFOA=[];var CFIA=[];var CFFA=[];var OCCE=[];var CCCE=[];
    if(result.length>0){
      for(var i=0;i<result.length;i++)
      {
          if(Particulars===result[i].Particulars)
          {
            labels.push(result[i].year);
          }
          if(result[i].Particulars==='Profit Before Tax' || result[i].Particulars==="Net Profit Before Taxes")
          {
            PBT.push(parseFloat(result[i].Particulars_value).toFixed(2));
          }
          if(result[i].Particulars==='Cash Flow from Operating Activities' || result[i].Particulars==="Cash Flow from operating activities")
          {
            CFOA.push(parseFloat(result[i].Particulars_value).toFixed(2));
          }
          if(result[i].Particulars==='Cash Flow from Investing Activities' || result[i].Particulars==="Cash Flow from investing activities")
          {
            CFIA.push(parseFloat(result[i].Particulars_value).toFixed(2));
          }
          if(result[i].Particulars==='Cash Flow from Financing Activities' || result[i].Particulars==="Cash Flow from financing activities")
          {
            CFFA.push(parseFloat(result[i].Particulars_value).toFixed(2));
          }
          if(result[i].Particulars==='Opening Cash & Cash Equivalents')
          {
            OCCE.push(parseFloat(result[i].Particulars_value).toFixed(2));
          }
          if(result[i].Particulars==='Closing Cash & Cash Equivalent')
          {
            CCCE.push(parseFloat(result[i].Particulars_value).toFixed(2));
          }
      }
    }
    //console.log(PBT);
    var datasets=[];
    if(checkPBT!==''){
        datasets.push({ label : "Profit Before Tax",
          data : PBT,
          type: graphtype,
          backgroundColor :graphtype === 'bar' ? "#87888b" :"rgba(0,0,0,0)",
          borderColor : "#87888b",
          borderWidth : 1 });
    }
    if(checkCFOA!==''){
        datasets.push({ label : "Cash Flow from Operating Activities",
                    data : CFOA,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#265aa8" :"rgba(0,0,0,0)",
                    borderColor : "#265aa8",
                    borderWidth : 0   });
    }
    if(checkCFIA!==''){
        datasets.push({ label : "Cash Flow from Investing Activities",
                    data : CFIA,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#0088d8" :"rgba(0,0,0,0)",
                    borderColor : "#0088d8",
                    borderWidth : 0   });
    }
    if(checkCFFA!==''){
        datasets.push({ label : "Cash Flow from Financing Activities",
          data : CFFA,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#264015" :"rgba(0,0,0,0)",
          borderColor : "#264015",
          borderWidth : 0 });
    }
    if(checkOCCE!==''){
        datasets.push({ label : "Opening Cash & Cash Equivalents",
          data : OCCE,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#7715f9" :"rgba(0,0,0,0)",
          borderColor : "#7715f9",
          borderWidth : 0 });
    }
    if(checkCCCE!==''){
        datasets.push({ label : "Closing Cash & Cash Equivalent",
          data : CCCE,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#aec71f" :"rgba(0,0,0,0)",
          borderColor : "#aec71f",
          borderWidth : 0 });
    }
    const state = { labels : labels, datasets : datasets };
    return(
          <div>
             <div className="cashFlow">
              <div className="mainContainer">
                <div className="balanceIn">
                  <h2 className="mainHead">CASH FLOW <span></span></h2>
                  <div className="balanceFilter">
                    <ul>
                      <li>
                        <select  id="cstype" onChange={this.CSflowtypeChangehandler} value={this.state.cstype}>
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
                        <select className="monthSelect">
                          <option>December</option>
                          <option>December</option>
                          <option>December</option>
                          <option>December</option>
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
                              Particulars==data.Particulars ?
                                <th key={ind}>{data.year}</th>
                              :null
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.loading ? <tr><td><div className="emojiloader"><img src="/img/loader.gif" alt="loading..."/></div></td></tr>:
                          result.map((value, index) => (
                              value.year==lastyear ?
                                  <tr key={value._id}>
                                    <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                                    {result.map((data, ind) => (
                                      value.Particulars==data.Particulars ?
                                        <td key={ind}>{data.Particulars_value!=='' ? parseFloat(data.Particulars_value).toFixed(2) : null }</td>
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
                    {dropdownopen ?
                      <ul>
                        <li><input type="checkbox" name="checkPBT" value="PBT" onChange={this.onChangeGraphHandler} checked={this.state.checkPBT}/>Profit Before Tax</li>
                        <li><input type="checkbox" name="checkCFOA" value="CFOA" onChange={this.onChangeGraphHandler} checked={this.state.checkCFOA}/>Cash Flow from Operating Activities </li>
                        <li><input type="checkbox" name="checkCFIA" value="CFIA" onChange={this.onChangeGraphHandler} checked={this.state.checkCFIA}/>Cash Flow from Investing Activities </li>
                        <li><input type="checkbox" name="checkCFFA" value="CFFA" onChange={this.onChangeGraphHandler} checked={this.state.checkCFFA}/>Cash Flow from Financing Activities </li>
                        <li><input type="checkbox" name="checkOCCE" value="OCCE" onChange={this.onChangeGraphHandler} checked={this.state.checkOCCE}/>Opening Cash & Cash Equivalents  </li>
                        <li><input type="checkbox" name="checkCCCE" value="CCCE" onChange={this.onChangeGraphHandler} checked={this.state.checkCCCE}/>Closing Cash & Cash Equivalent </li>
                    
                      </ul>
                      :null
                    }
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

export default Cashflow;