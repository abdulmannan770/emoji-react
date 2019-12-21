import React, { Component } from 'react';
/*import { Link } from 'react-router-dom';*/
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
          ticks : {beginAtZero: true,},
          //gridLines : {borderDash: [3, 1],color: "#9c9da0"}                
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
        loading: true,
        subloading: true,
        Peercompare:[],
        fundascore:[],
        resultunique:[],
        ischecked:false,
        subPeercompare:[],
        subfundascore:[],
        graphtype:'bar',
        display2: { display: 'none' },
        display: { display: '' },
        checkprice: 'price', checkfscore: 'fscore',checkgrowth: '', checkliquidity: '',checktrust: '', checkeff: '',checksales: '', checkprofit: '', checkpe: '', checkmrkcap: '',
        dropdownopen:false,
        netsale:'',
        netProfit:'',
      }
    }
    UNSAFE_componentWillMount () {
    //componentDidMount() {
        var  fincode = this.props.fincode
      this.getNewPeerCampare(fincode);
      this.getPeerCamparewithSubscore(fincode);
      document.addEventListener("mousedown", this.handleClickOutside);
      this.getNetsales(fincode);
      this.getNetprofit(fincode);
    }
    /********Get Netsales**********/
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
    /********Get Profit**********/
    getNetprofit = async (fincode) => { 
      await axios.get(`http://172.104.5.85:3000/netProfit/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          //console.log(data);
          if(data.length>0){
            this.setState({
               netProfit:data[0].Particulars_value,
            })
          }
      }).catch(function (error) {});
    }
      /*************Get stockbulkdeals*******************/
    getNewPeerCampare = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/newpeercampare/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          this.setState({loading: false,});
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
  onChangehandler = (event) =>{  
      var  fincode = this.props.fincode;  
      const target = event.target;
      const value2 = target.checked === true ? '' : 'none';
      const value = target.checked === true ? 'none' : '';
      this.setState({
        abc: value,
        ischecked:target.checked,
        display2: { display: value2 },
        display: { display: value },
      });
  }
  onChangeGraphHandler = (event) => {
      const target = event.target;
      const { name = '', value = '' } = target;
      target.checked === true ? this.setState({ [name]: value })
      :this.setState({[name]: ''})
  }
  getPeerCamparewithSubscore = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/peercamparewithparameter/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          this.setState({subloading: false,});
          var data = responseText.data;
          if(data.Table.length>0){
            //console.log(data.subfscore);
            this.setState({
               subPeercompare:data.Table,
               subfundascore:data.subfscore,
            })
          }
      }).catch(function (error) {});
  } 
  numDifferentiation = (val)=> {
      if(val.length>=7) val = (val/10000000).toFixed(2);
      else{val=val;}
      return val;
  }
  nummiliontocr = (val)=> {
        //if(val.length>=7) val = (val/10000000).toFixed(2);
        if(val.length>=7) val = (val/10).toFixed(2);
        else{val=val;}
        return val;
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
    var selfscore="N/A";
    if(this.props.fscore!=="")
    {
       selfscore= this.props.fscore;
    }
    var selfefficiency='';var selfgrowth='';var selfliquidity='';var selftrust='';
    if(Object.keys(this.props.scoreparameter).length>0){
        selfefficiency=this.props.scoreparameter.efficiency;
        selfgrowth=this.props.scoreparameter.growth;
        selfliquidity=this.props.scoreparameter.liquidity;
        selftrust=this.props.scoreparameter.trust;
    }
    var selfCOMPNAME=""; var selfMCAP="";var selfcloseprice="";var selfPE="";var selfFINCODE="";
    if(Object.keys(this.props.basicDetails).length>0){
        if(this.props.basicDetails.Table.length>0){
           selfFINCODE=this.props.basicDetails.Table[0].FINCODE;
           selfCOMPNAME=this.props.basicDetails.Table[0].COMPNAME;
           selfMCAP=this.nummiliontocr(parseFloat(this.props.basicDetails.Table[0].MCAP).toFixed(2));
           selfcloseprice=parseFloat(this.props.basicDetails.Table[0].CLOSE_PRICE).toFixed(2);
           selfPE=parseFloat(this.props.basicDetails.Table[0].PE).toFixed(2);
        }
    }
    const {Peercompare,fundascore,resultunique,subPeercompare,subfundascore,graphtype,checkprice='',checkfscore='',checkgrowth='',checkliquidity='',checktrust='',checkeff='',checksales='',checkprofit='',checkpe='',checkmrkcap='',dropdownopen,netsale,netProfit} = this.state;
    var labels=[]; var price=[];var fundascr=[];var Sales=[];var growth=[];var liquidity=[];var trust=[];var efficiency=[];
    var PE=[];var profit=[];var MCAP=[];
    if(netsale!=='')
    {
      if(Peercompare.length>0)
      {
          growth.push(selfgrowth);
          liquidity.push(selfliquidity);
          trust.push(selftrust);
          efficiency.push(selfefficiency);
          labels.push(selfCOMPNAME);
          price.push(selfcloseprice);
          Sales.push(netsale);
          PE.push(selfPE);
          MCAP.push(selfMCAP);
          profit.push(netProfit);
          fundascr.push(selfscore);
          for(var l=0;l<Peercompare.length;l++)
          {
              labels.push(Peercompare[l].SNAME);
              price.push(Peercompare[l].CLOSE1);
              Sales.push(Peercompare[l].SALES_TURNOVER);
              PE.push(Peercompare[l].PE);
              MCAP.push(this.numDifferentiation(Peercompare[l].MCAP));    
              if(resultunique.some(prof => prof.fincode === Peercompare[l].FINCODE)){
                profit.push(resultunique.find(prof => prof.fincode === Peercompare[l].FINCODE).Particulars_value);
              }else{
                profit.push(0);
              }
              if(fundascore.some(fscr => fscr.fincode === Peercompare[l].FINCODE)){
                 fundascr.push(fundascore.find(fscr => fscr.fincode === Peercompare[l].FINCODE).score);
              }else{
               fundascr.push(0);
              }
              if(subfundascore.some(fscr => fscr.fincode === Peercompare[l].FINCODE)){
                  growth.push(subfundascore.find(fscr => fscr.fincode === Peercompare[l].FINCODE).growth);
                  liquidity.push(subfundascore.find(fscr => fscr.fincode === Peercompare[l].FINCODE).liquidity);
                  trust.push(subfundascore.find(fscr => fscr.fincode === Peercompare[l].FINCODE).trust);
                  efficiency.push(subfundascore.find(fscr => fscr.fincode === Peercompare[l].FINCODE).efficiency);
              }else{
                  growth.push(0);
                  liquidity.push(0);
                  trust.push(0);
                  efficiency.push(0);
              }
          }
      }
    }
    var datasets=[];
    if(checkprice!==''){
        datasets.push({ label : "Price",
          data : price,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#87888b" :"rgba(0,0,0,0)",
          borderColor : "#87888b",
          borderWidth : 0 });
    }
    if(checksales!==''){
        datasets.push({ label : "Sales",
          data : Sales,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#e3a600" :"rgba(0,0,0,0)",
          borderColor : "#e3a600",
          borderWidth : 0 });
    }
    if(checkprofit!==''){
        datasets.push({ label : "Profit",
          data : profit,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#264015" :"rgba(0,0,0,0)",
          borderColor : "#264015",
          borderWidth : 0 });
    }
    if(checkmrkcap!==''){
        datasets.push({ label : "MCAP",
          data : MCAP,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#2a6903" :"rgba(0,0,0,0)",
          borderColor : "#2a6903",
          borderWidth : 0 });
    }
    if(checkpe!==''){
        datasets.push({ label : "PE",
          data : PE,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#7715f9" :"rgba(0,0,0,0)",
          borderColor : "#7715f9",
          borderWidth : 0 });
    }
    if(checkfscore!==''){
        datasets.push({ label : "Score",
                    data : fundascr,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#265aa8" :"rgba(0,0,0,0)",
                    borderColor : "#265aa8",
                    borderWidth : 0   });
    }
    if(checkgrowth!==''){
      datasets.push({ label : "Growth",
                    data : growth,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#658b00" :"rgba(0,0,0,0)",
                    borderColor : "#658b00",
                    borderWidth : 0   });
    }
    if(checkliquidity!==''){
        datasets.push({ label : "Liquidity",
                    data : liquidity,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#d8b900" :"rgba(0,0,0,0)",
                    borderColor : "#d8b900",
                    borderWidth : 0   });
    }
    if(checktrust!==''){
        datasets.push({ label : "Trust",
                    data : trust,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#00d8a6" :"rgba(0,0,0,0)",
                    borderColor : "#00d8a6",
                    borderWidth : 0   });
    }
    if(checkeff!==''){
        datasets.push({ label : "Efficiency",
                    data : efficiency,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#0088d8" :"rgba(0,0,0,0)",
                    borderColor : "#0088d8",
                    borderWidth : 0   });
    }
    const state = { labels : labels, datasets : datasets };
    return(
          <div>
            <div className="peerSection">
                <div className="mainContainer">
                  <h2 className="mainHead">Peer comparison<span></span>
                  </h2>
                  <p className="parametr">
                    {/*<i className="fa fa-check-square"></i>*/} <input type="checkbox" id="parameter" checked={this.state.ischecked} value="1" onChange={this.onChangehandler}/> Parameters
                  </p>
                  <div className="dataTablePeer table-responsive">
                    <table id="peerTable" className="table table-striped tableLoder" style={this.state.display}>
                          <thead>
                        <tr className="bgBlueTable">
                          <th>Name</th>
                          <th>Price</th>
                          <th>Sales</th>
                          <th>Profit</th>
                          <th>PE</th>
                          <th>F Score</th>
                          <th>Mkt Cap (Rs. cr)</th>
                        </tr>
                      </thead>
                      <tbody>
                        { this.state.netsale ?
                          <tr><td>{selfCOMPNAME}</td><td>{selfcloseprice}</td><td>{netsale}</td><td>{netProfit}</td><td>{selfPE}</td><td>{selfscore}</td><td>{selfMCAP}</td></tr>
                        : null }
                        { this.state.netsale==='' ? <tr><td><div className="emojiloader"><img src="/img/loader.gif" alt="loading..."/></div></td></tr>:
                        Peercompare.map((value, index) => (
                          selfFINCODE!==value.FINCODE?
                          <tr key={value.srno}>
                            <td>{value.SNAME} {/*<img src="/img/img_linechart.png" alt="Line Chart" />*/}</td>
                            <td>{parseFloat(value.CLOSE1).toFixed(2)}</td>
                            <td>{parseFloat(value.SALES_TURNOVER).toFixed(2)}</td>
                            <td>
                            {resultunique.map((data, ind) => (
                              data.fincode === value.FINCODE ?
                                <span  key={ind}>{parseFloat(data.Particulars_value).toFixed(2)}</span>
                              :null
                            ))}
                            {resultunique.some(prof => prof.fincode === value.FINCODE)? null : 
                                 <span>N/A</span>
                            }
                            </td>
                            <td>{value.PE}</td>
                            <td>
                            {fundascore.map((data, ind) => (
                              data.fincode === value.FINCODE ?
                                <span  key={ind}>{parseFloat(data.score).toFixed(2)}</span>
                              : null
                            ))}
                            {fundascore.some(fscr => fscr.fincode === value.FINCODE)? null : 
                                 <span>N/A</span>
                            }
                            </td>
                            <td>{this.numDifferentiation(value.MCAP)}</td>
                          </tr>
                          : null
                        ))}
                      </tbody>
                    </table>
                    <table id="peerTable" className="table table-striped tableLoder" style={this.state.display2}>
                          <thead>
                              <tr className="bgBlueTable">
                                <th>Name</th>
                                <th>Price</th>
                                <th>Sales</th>
                                <th>  
                                    <ul className="parmList">
                                      <li>Growth</li>
                                      <li>Liquidity</li>
                                      <li>Trust</li>
                                      <li>Efficiency</li>
                                    </ul>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            { this.state.netsale ?
                              <tr>
                                <td>{selfCOMPNAME}</td>
                                <td>{parseFloat(selfcloseprice).toFixed(2)}</td>
                                <td>{parseFloat(netsale).toFixed(2)}</td>
                                <td>
                                    <ul className="parmList blackColor">
                                        <li>{selfgrowth!=='' ? parseFloat(selfgrowth).toFixed(2) : 'N/A'}</li>
                                        <li>{selfliquidity!=='' ? parseFloat(selfliquidity).toFixed(2) : 'N/A'}</li>
                                        <li>{selftrust!=='' ? parseFloat(selftrust).toFixed(2) : 'N/A'}</li>
                                        <li>{selfefficiency!=='' ? parseFloat(selfefficiency).toFixed(2) : 'N/A'}</li>
                                    </ul>
                                </td>
                              </tr> : null }
                              { this.state.netsale==='' ? <tr><td><div className="emojiloader"><img src="/img/loader.gif" alt="loading..."/></div></td></tr>:
                              subPeercompare.map((value, index) => (
                                <tr key={value.srno}>
                                  <td>{value.SNAME}</td>
                                  <td>{parseFloat(value.CLOSE1).toFixed(2)}</td>
                                  <td>{parseFloat(value.SALES_TURNOVER).toFixed(2)}</td> 
                                  <td>

                                  {subfundascore.map((data, ind) => (
                                    data.fincode === value.FINCODE ?

                                    <ul className="parmList blackColor" key={ind}>
                                        <li>{parseFloat(data.growth).toFixed(2)}</li>
                                        <li>{parseFloat(data.liquidity).toFixed(2)}</li>
                                        <li>{parseFloat(data.trust).toFixed(2)}</li>
                                        <li>{parseFloat(data.efficiency).toFixed(2)}</li>
                                    </ul>
                                    : null
                                  ))}
                                  {subfundascore.some(subfscr => subfscr.fincode === value.FINCODE)? null : 
                                      <ul className="parmList blackColor">
                                        <li>N/A</li>
                                        <li>N/A</li>
                                        <li>N/A</li>
                                        <li>N/A</li>
                                      </ul>
                                  } 
                                  </td>
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
                      <select  id="graphtype" onChange={this.graphtypeOnChange} value={this.state.graphtype}>
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                      </select>
                    </div>
                    <div className="filterIn"  ref={this.container}>
                      {dropdownopen?
                      <ul>
                          <li><input type="checkbox" name="checkprice" value="price" onChange={this.onChangeGraphHandler} checked={this.state.checkprice}/>Price</li>
                          <li><input type="checkbox" name="checkfscore" value="fscore" onChange={this.onChangeGraphHandler}  checked={this.state.checkfscore}/>F Score</li>
                          <li><input type="checkbox" name="checkgrowth" value="growth" onChange={this.onChangeGraphHandler} checked={this.state.checkgrowth}/>Growth</li>
                          <li><input type="checkbox" name="checkliquidity" value="liquidity" onChange={this.onChangeGraphHandler} checked={this.state.checkliquidity}/>Liquidity</li>
                          <li><input type="checkbox" name="checktrust" value="trust" onChange={this.onChangeGraphHandler} checked={this.state.checktrust}/>Trust</li>
                          <li><input type="checkbox" name="checkeff" value="eff" onChange={this.onChangeGraphHandler} checked={this.state.checkeff}/>Efficiency</li>
                          <li><input type="checkbox" name="checksales" value="sales" onChange={this.onChangeGraphHandler} checked={this.state.checksales}/>Sales</li>
                          <li><input type="checkbox" name="checkprofit" value="profit" onChange={this.onChangeGraphHandler} checked={this.state.checkprofit}/>Profit</li>
                          <li><input type="checkbox" name="checkpe" value="pe" onChange={this.onChangeGraphHandler} checked={this.state.checkpe}/>PE</li>
                          <li><input type="checkbox" name="checkmrkcap" value="mrkcap" onChange={this.onChangeGraphHandler} checked={this.state.checkmrkcap}/>Mkt Cap</li>
                      </ul>
                      :null}
                    {/*<select>
                                          <option>By Parameters</option>
                                          <option>By Parameters</option>
                                        </select>*/}
                      <span className="paraMe" onClick={() => this.setState({ dropdownopen: !this.state.dropdownopen })}>By Parameters</span>
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