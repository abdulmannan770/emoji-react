import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Balancesheet extends Component {
	  constructor(props){
	    super(props);
	    this.state = {
        loading: true,
	      balancesheet:[],
        balancesheetnext:[],
        lastyear:'',
        Particulars:'',
        cstype:'',
        results: [],
        display: {  display: 'none' },
        cmpname:'',
	    }
  	}
    componentDidMount() {
      var  fincode = this.props.fincode;
      this.getBalancesheet('S',fincode);
    }
	  /*************Get Balancesheet*******************/
    CStypeChangehandler = (event) =>{
      var  fincode = this.props.fincode;  
      this.getBalancesheet(event.target.value,fincode);
    }
	  getBalancesheet = async (cstype,fincode) => {
      await axios.get(`http://172.104.5.85:3000/Balancesheet/`+cstype+`/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
          this.setState({loading: false,});
	        var data = responseText.data;
	        if(data.length>0){
	          this.setState({
               balancesheet:data,
               updatedyear:data[0].year,
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
                 results: data,
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
        this.getBalancesheet(cstype,fincode); 
    }
	render(){
    const checkbalancesheetitems=['EQUITY AND LIABILITIES','Share Capital','Share Warrants & Outstandings','Total Reserves',"Shareholder's Funds",'Long-Term Borrowings','Secured Loans','Unsecured Loans','Deferred Tax Assets / Liabilities','Other Long Term Liabilities','Long Term Trade Payables','Long Term Provisions','Total Non-Current Liabilities','Current Liabilities','Trade Payables','Other Current Liabilities','Short Term Borrowings','Short Term Provisions','Total Current Liabilities','Total Liabilities','ASSETS','Total Non-Current Assets','Gross Block','Less: Accumulated Depreciation','Less: Impairment of Assets','Net Block','Lease Adjustment A/c','Capital Work in Progress','Total Assets','Long Term Loans & Advances','Other Non Current Assets','Total Non-Current Assets','Current Assets  Loans & Advances','Currents Investments','Inventories','Sundry Debtors','Cash and Bank','Other Current Assets','Short Term Loans and Advances','&nbsp;&nbsp;&nbsp;&nbsp;Amounts due from directors','Total Current Assets','Net Current Assets (Including Current Investments)','Miscellaneous Expenses not written off','Contingent Liabilities','Total Debt','Book Value','Adjusted Book Value'];
		const {balancesheet,lastyear,Particulars} = this.state;    
    var serachlist =this.state.results.map((value, index) => (
        <li key={value.FINCODE}><Link to="#" onClick={() => this.onClickSearchHadler(value.FINCODE,value.compname)}>{value.compname}</Link></li>
      ));
		return(
			       <div className="balanceSheet">
              <div className="mainContainer">
                <div className="balanceIn">
                  <h2 className="mainHead">BALANCE SHEET <span></span></h2>
                  <div className="balanceFilter">
                    <ul>
                      <li>
                        <select id="cstype" onChange={this.CStypeChangehandler} value={this.state.cstype}>
                            <option value="S">Standalone</option>
                            <option value="C">Consolidated</option>
                        </select>
                      </li>
                      <li>
                        <i className="fa fa-search"></i>
                        <input type="text" name="query" id="query" placeholder="Search Stock" value={this.state.cmpname}  onChange={this.onChangeHadler.bind(this)} autoComplete="off"/>
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
                            {balancesheet.map((data, ind) => (
                              Particulars==data.Particulars ?
                                <th key={ind}>{data.year}</th>
                              :null
                            ))}
                          </tr>
                        </thead>                        
                        <tbody>
                        { this.state.loading ? <tr><td><div className="emojiloader"><img src="/img/loader.gif" alt="loading..."/></div></td></tr>:
                          balancesheet.map((value, index) => (
                              value.year==lastyear && value.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Quoted' && value.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Unquoted' && checkbalancesheetitems.indexOf(value.Particulars) > -1 ?
                                  <tr key={value._id}>
                                    <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                                    {balancesheet.map((data, ind) => (
                                      value.Particulars==data.Particulars && data.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Quoted' && data.Particulars!='&nbsp;&nbsp;&nbsp;&nbsp;Unquoted' ?
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
       	)
	}
}

export default Balancesheet;