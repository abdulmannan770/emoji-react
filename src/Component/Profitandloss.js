import React, { Component } from 'react';
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
class ProfitandLoss extends Component {
  constructor(props){
      super(props);
      this.state = {
        loading: true,
        pldata:[],
        pldataobject:[],
        allnextkeys1:[],
        checkeyslength:'',
        ischecked:false,
        displayVariance:{ display:'none' },
        displayPLvalue:{ display:'' },
        dropdownopen:false,
        graphtype:'bar',
        checkNsales: 'Nsales', checkTE: '',checkpbit: '', checkOI: '',checkOP: '', checkinterest: '',checkdepreciation: '', checkPBT: '', checkPAT: 'PAT',
      }
    }
    componentDidMount() {
      var  fincode = this.props.fincode;     
      this.getProfitandLoss(fincode);      
      document.addEventListener("mousedown", this.handleClickOutside);
    }
      /*************Get Balancesheet*******************/
    getProfitandLoss = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/ProfitandLoss/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          this.setState({loading: false,});
          var data = responseText.data;
          if(data.Table1.length>0){
            var allkeys=Object.keys(data.Table1[0]);
            var allnextkeys=allkeys.slice(1);
            allnextkeys=allnextkeys.reverse();
            //console.log(allnextkeys);
            this.setState({
               pldata:data.Table1,      
               pldataobject:data.Table1[0],
                allnextkeys1:allnextkeys,
                checkeyslength:allnextkeys.length,
            })
          }
      }).catch(function (error) {});
  }
  cstypeChangehandler = (event) =>{     
      var Rtype=document.getElementById('Rtype').value;
     this.setState({loading: true,});
      this.getaxios(Rtype,event.target.value);
  }
  RtypeChangehandler = (event) =>{     
     var cstype=document.getElementById('cstype').value;
     this.setState({loading: true,});
     this.getaxios(event.target.value,cstype);
  }
  getaxios= async (rtype,cstype)=>{
      var  fincode = this.props.fincode;
     await axios.get(`http://172.104.5.85:3000/demoProfitandLoss/`+fincode+'/'+rtype+'/'+cstype, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          this.setState({loading: false,});
          var data = responseText.data;
          if(data.Table1.length>0){
            var allkeys=Object.keys(data.Table1[0]);
            var allnextkeys=allkeys.slice(1);
            allnextkeys=allnextkeys.reverse();
            //console.log(allnextkeys);
            this.setState({
              pldata:data.Table1,      
              pldataobject:data.Table1[0],
              allnextkeys1:allnextkeys,
              checkeyslength:allnextkeys.length,
              Rtype:rtype,
              cstype:cstype,
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
        ischecked:target.checked,
        displayVariance: { display: value2 },
        displayPLvalue:{ display: value },
      });
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
    const checkitems=['Interest Earned','Net Sales','Total Expenditure','PBIDT (Excl OI)','Other Income','Operating Profit','Interest','Depreciation','Profit Before Tax','Profit After Tax'];
    const {pldata,pldataobject,allnextkeys1,checkeyslength,dropdownopen,graphtype,checkNsales='', checkTE='',checkpbit='', checkOI='',checkOP='', checkinterest='',checkdepreciation='', checkPBT='', checkPAT=''} = this.state; 
    //{Object.keys(allnextkeys1).map(key2 => key2!=0 && key===allnextkeys1[key2] ? key.toString() : null)}
    var allnextkeys2=[];
    if(allnextkeys1.length>0){
      if(checkeyslength>2){
        allnextkeys2=allnextkeys1.slice(1);
        //var allnextkeys2=allnextkeys.reverse();
      }else{
        allnextkeys2=allnextkeys1;
      }
    } 
    //console.log(allnextkeys2);
    var Netsales=[];var profitAT=[];var profitBT=[];var totalexp=[];var PBIDT=[];
    var otherinc=[];var operatingprofit=[];var Interest=[];var Depreciation=[];
    if(pldata.length>0)
    {
        for(var l=0;l<pldata.length;l++)
        {
            for(var k=0;k<allnextkeys2.length;k++){
              if(pldata[l].Particulars==="Interest Earned" || pldata[l].Particulars==="Net Sales")
              {
                  Netsales.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Profit After Tax")
              {
                  profitAT.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Profit Before Tax")
              {
                  profitBT.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Total Expenditure")
              {
                  totalexp.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="PBIDT (Excl OI)")
              {
                  PBIDT.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Other Income")
              {
                  otherinc.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Operating Profit")
              {
                  operatingprofit.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Interest")
              {
                  Interest.push(pldata[l][allnextkeys2[k]])
              }
              if(pldata[l].Particulars==="Depreciation")
              {
                  Depreciation.push(pldata[l][allnextkeys2[k]])
              }
            }
        }
    }   
    var datasets=[];
    if(checkNsales!==''){
        datasets.push({ label : "Net Sales",
          data : Netsales,
          type: graphtype,
          backgroundColor :graphtype === 'bar' ? "#87888b" :"rgba(0,0,0,0)",
          borderColor : "#87888b",
          borderWidth : 1 });
    }
    if(checkPAT!==''){
        datasets.push({ label : "Profit After Tax",
                    data : profitAT,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#265aa8" :"rgba(0,0,0,0)",
                    borderColor : "#265aa8",
                    borderWidth : 0   });
    }
    if(checkPBT!==''){
      datasets.push({ label : "Profit Before Tax",
                    data : profitBT,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#658b00" :"rgba(0,0,0,0)",
                    borderColor : "#658b00",
                    borderWidth : 0   });
    }
    if(checkTE!==''){
        datasets.push({ label : "Total Expenditure",
                    data : totalexp,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#d8b900" :"rgba(0,0,0,0)",
                    borderColor : "#d8b900",
                    borderWidth : 0   });
    }
    if(checkpbit!==''){
        datasets.push({ label : "PBIDT (Excl OI)",
                    data : PBIDT,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#00d8a6" :"rgba(0,0,0,0)",
                    borderColor : "#00d8a6",
                    borderWidth : 0   });
    }
    if(checkOI!==''){
        datasets.push({ label : "Other Income",
                    data : otherinc,
                    type: graphtype,
                    backgroundColor : graphtype === 'bar' ? "#0088d8" :"rgba(0,0,0,0)",
                    borderColor : "#0088d8",
                    borderWidth : 0   });
    }
    if(checkOP!==''){
        datasets.push({ label : "Operating Profit",
          data : operatingprofit,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#264015" :"rgba(0,0,0,0)",
          borderColor : "#264015",
          borderWidth : 0 });
    }
    if(checkinterest!==''){
        datasets.push({ label : "Interest",
          data : Interest,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#2a6903" :"rgba(0,0,0,0)",
          borderColor : "#2a6903",
          borderWidth : 0 });
    }
    if(checkdepreciation!==''){
        datasets.push({ label : "Depreciation",
          data : Depreciation,
          type: graphtype,
          backgroundColor : graphtype === 'bar' ? "#7715f9" :"rgba(0,0,0,0)",
          borderColor : "#7715f9",
          borderWidth : 0 });
    }
    const state = {  labels : allnextkeys2, datasets : datasets };
    //console.log(checkeyslength);
    return(
          <div>
            <div className="profitLoss">
              <div className="mainContainer">
                <div className="profitLossIn">
                  <h2 className="mainHead">PROFIT AND LOSS </h2>
                  <div className="profitLossFilter">
                    <ul>
                      <li>
                        <select id="Rtype" onChange={this.RtypeChangehandler} value={this.state.Rtype}>
                          <option value="Q">Q-O-Q(%)</option>
                          <option value="A">Y-O-Y(%)</option>
                        </select>
                      </li>
                      <li>
                        <select id="cstype" onChange={this.cstypeChangehandler} value={this.state.cstype}>
                          <option value="S">Standalone</option>
                          <option value="C">Consolidated</option>
                        </select>
                      </li>
                      <li>
                        <p><input type="checkbox" name="Variance" checked={this.state.ischecked} value="1" onChange={this.onChangehandler} /> Variance Percentages</p>
                      </li>
                    </ul>
                  </div>
                  <div className="mainTable tableBorder">
                    <div className="table-responsive">
                      <table className="table table-striped tableLoder">
                        <thead>
                                    
                          <tr>
                            <th>Description</th>
                            {Object.keys(allnextkeys1).map(key2 => 
                              checkeyslength  > 2 ?
                                key2!=0 ?
                                  <th key={key2.toString()}>{allnextkeys1[key2]}</th> 
                                :<th key={key2.toString()}></th>
                              : <th key={key2.toString()}>{allnextkeys1[key2]}</th>
                            )}
                            {checkeyslength  > 2 ?
                            <th colSpan='6'>Last {checkeyslength-1} Quarter Performance</th>
                            :null}
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.loading ? <tr><td><div className="emojiloader"><img src="/img/loader.gif" alt="loading..."/></div></td></tr>: 
                            pldata.map((value, index) => (
                              index!==0 && checkitems.indexOf(value.Particulars) > -1 ?
                                <tr key={index}>
                                    <td>{value.Particulars}</td>
                                    {Object.keys(allnextkeys1).map(key2 =>
                                      checkeyslength  > 2 ? 
                                      value.Particulars==="Interest" || value.Particulars==="Depreciation"?
                                      <td key={key2}>                                      
                                          {(parseFloat(value[allnextkeys1[key2]])<parseFloat(value[allnextkeys1[key2-1]])) ? 
                                            <span key={key2} className='greenDark' >
                                                <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                <span style={this.state.displayVariance} >{value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]]!==0 && value[allnextkeys1[key2-1]]!==0 ? parseFloat(((value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]])*100)/value[allnextkeys1[key2-1]]).toFixed(2)+'%' : '' }</span>
                                            </span> 
                                          :(parseFloat(value[allnextkeys1[key2]])>parseFloat(value[allnextkeys1[key2-1]])) ? 
                                              <span key={key2} className='redLight' >
                                                  <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                  <span style={this.state.displayVariance} >{value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]]!==0 && value[allnextkeys1[key2-1]]!==0 ? parseFloat(((value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]])*100)/value[allnextkeys1[key2-1]]).toFixed(2)+'%' : '' }</span>
                                              </span> 
                                          :(parseFloat(value[allnextkeys1[key2]])===parseFloat(value[allnextkeys1[key2-1]])) ? 
                                              <span key={key2} className='yellow' >
                                                  <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                  <span style={this.state.displayVariance} >{value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]]!==0 && value[allnextkeys1[key2-1]]!==0 ? parseFloat(((value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]])*100)/value[allnextkeys1[key2-1]]).toFixed(2)+'%' : '' }</span>
                                              </span>
                                          : key2!=0 ? <span key={key2} className='redLight'>
                                                          <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                      </span>
                                          : null
                                          }
                                      </td>
                                      : <td key={key2}>                                      
                                          {(parseFloat(value[allnextkeys1[key2]])>parseFloat(value[allnextkeys1[key2-1]])) ? 
                                            <span key={key2} className='greenDark' >
                                                <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                <span style={this.state.displayVariance} >{value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]]!==0 && value[allnextkeys1[key2-1]]!==0 ? parseFloat(((value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]])*100)/value[allnextkeys1[key2-1]]).toFixed(2)+'%' : '' }</span>
                                            </span> 
                                          :(parseFloat(value[allnextkeys1[key2]])<parseFloat(value[allnextkeys1[key2-1]])) ? 
                                              <span key={key2} className='redLight' >
                                                  <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                  <span style={this.state.displayVariance} >{value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]]!==0 && value[allnextkeys1[key2-1]]!==0 ? parseFloat(((value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]])*100)/value[allnextkeys1[key2-1]]).toFixed(2)+'%' : '' }</span>
                                              </span> 
                                          :(parseFloat(value[allnextkeys1[key2]])===parseFloat(value[allnextkeys1[key2-1]])) ? 
                                              <span key={key2} className='yellow' >
                                                  <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                  <span style={this.state.displayVariance} >{value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]]!==0 && value[allnextkeys1[key2-1]]!==0 ? parseFloat(((value[allnextkeys1[key2]]-value[allnextkeys1[key2-1]])*100)/value[allnextkeys1[key2-1]]).toFixed(2)+'%' : '' }</span>
                                              </span>
                                          : key2!=0 ? <span key={key2} className='redLight'>
                                                          <span style={this.state.displayPLvalue}>{value[allnextkeys1[key2]]}</span>
                                                      </span>
                                          : null
                                          }
                                      </td> 
                                    : <td key={key2.toString()}> {value[allnextkeys1[key2]]}</td>
                                    )}
                                    {Object.keys(allnextkeys1).map(key2 =>
                                      checkeyslength  > 2 ? 
                                        value.Particulars==="Interest" || value.Particulars==="Depreciation"?
                                          <td key={key2.toString()}>
                                            {(parseFloat(value[allnextkeys1[key2]])>parseFloat(value[allnextkeys1[key2-1]])) ? 
                                                  <img key={key2} src="/img/img_bed.png" alt="bed"/> 
                                            : (parseFloat(value[allnextkeys1[key2]])===parseFloat(value[allnextkeys1[key2-1]])) ? 
                                                  <img key={key2} src="/img/img_good_small.png"  alt="good"/> 
                                            : (parseFloat(value[allnextkeys1[key2]])<parseFloat(value[allnextkeys1[key2-1]])) ? 
                                                  <img key={key2} src="/img/img_best.png"  alt="best"/> 
                                            : key2!=0 ? <img key={key2} src="/img/img_bed.png" alt="bed"/>
                                            : null}
                                          </td>
                                        :<td key={key2.toString()}>
                                          {(parseFloat(value[allnextkeys1[key2]])<parseFloat(value[allnextkeys1[key2-1]])) ? 
                                                <img key={key2} src="/img/img_bed.png" alt="bed"/> 
                                          : (parseFloat(value[allnextkeys1[key2]])===parseFloat(value[allnextkeys1[key2-1]])) ? 
                                                <img key={key2} src="/img/img_good_small.png"  alt="good"/> 
                                          : (parseFloat(value[allnextkeys1[key2]])>parseFloat(value[allnextkeys1[key2-1]])) ? 
                                                <img key={key2} src="/img/img_best.png"  alt="best"/> 
                                          : key2!=0 ? <img key={key2} src="/img/img_best.png" alt="bed"/>
                                          : null }
                                        </td>
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
                      <select  id="graphtype" onChange={this.graphtypeOnChange} value={this.state.graphtype}>
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                      </select>
                  </div>
                  <div className="filterIn" ref={this.container}>
                      {dropdownopen?
                      <ul>
                          <li><input type="checkbox" name="checkNsales" value="Nsales" onChange={this.onChangeGraphHandler} checked={this.state.checkNsales}/>Net Sales</li>
                          <li><input type="checkbox" name="checkTE" value="TE" onChange={this.onChangeGraphHandler}  checked={this.state.checkTE}/>Total Expenditure</li>
                          <li><input type="checkbox" name="checkpbit" value="pbit" onChange={this.onChangeGraphHandler} checked={this.state.checkpbit}/>PBIDT (Excl OI)</li>
                          <li><input type="checkbox" name="checkOI" value="OI" onChange={this.onChangeGraphHandler} checked={this.state.checkOI}/>Other Income</li>
                          <li><input type="checkbox" name="checkOP" value="OP" onChange={this.onChangeGraphHandler} checked={this.state.checkOP}/>Operating Profit</li>
                          <li><input type="checkbox" name="checkinterest" value="interest" onChange={this.onChangeGraphHandler} checked={this.state.checkinterest}/>Interest</li>
                          <li><input type="checkbox" name="checkdepreciation" value="depreciation" onChange={this.onChangeGraphHandler} checked={this.state.checkdepreciation}/>Depreciation</li>
                          <li><input type="checkbox" name="checkPBT" value="PBT" onChange={this.onChangeGraphHandler} checked={this.state.checkPBT}/>Profit Before Tax</li>
                          <li><input type="checkbox" name="checkPAT" value="PAT" onChange={this.onChangeGraphHandler} checked={this.state.checkPAT}/>Profit After Tax</li>
                      </ul>
                      :null}
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

export default ProfitandLoss;