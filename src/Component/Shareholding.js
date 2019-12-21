import React, { Component } from 'react';
/*import { Link } from 'react-router-dom';*/
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios';
class Shareholding extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
        percentofshare:[],percentofshareobject:[],noofshare:[],
	      noofshareholders:[],allperiodshareholding:[],allperiodshareholdingobject:[],
        publicshareholding:[],publicshareholdingobject:[],Promotershareholding:[],Promotershareholdingobject:[],        
        /*promoters:'',fii:'',mutualfund:'',noninst:'', */
        objectkey:'',   
        allperiodkeys:[],
	    }

  	}
  	//UNSAFE_componentWillMount () {
    componentDidMount() {
      var  fincode = this.props.fincode;
      this.getShareHolding(fincode);
      this.getAllPeriodShareHolding(fincode);
      this.getPublicShareholding(fincode);
      this.getPromoterShareholding(fincode);
    }
	    /*************Get shareholding*******************/
	  getShareHolding = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/shareholding/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table1.length>0){
            /*var promoters='0';var fii='0';var mutualfund='0';var noninst='0';
            for(var l=0;l<data.Table1.length;l++)
            {
                if(data.Table1[l].Particulars=='Indian Promoters')
                {
                    var newobj=Object.values(data.Table1[l]);
                    promoters=newobj[2];
                }
                if(data.Table1[l].Particulars=='&nbsp;&nbsp;&nbsp;&nbsp;Foreign Portfolio investors')
                {
                    var newobj1=Object.values(data.Table1[l]);
                    fii=newobj1[2];
                }
                if(data.Table1[l].Particulars=='&nbsp;&nbsp;&nbsp;&nbsp;Mutual  Funds / UTI')
                {
                    var newobj2=Object.values(data.Table1[l]);
                    mutualfund=newobj2[2];
                }
                if(data.Table1[l].Particulars=='Non-Institutions')
                {
                    var newobj3=Object.values(data.Table1[l]);
                    noninst=newobj3[2];
                }
            }*/
            //console.log(promoters);
            var objectkey=Object.keys(data.Table1[0]);
	          this.setState({
               percentofshare:data.Table1, percentofshareobject:data.Table1[0], objectkey:objectkey[2], 
               noofshareobject:data.Table2[0], noofshareholdersobject:data.Table3[0], noofshare:data.Table2,  
               noofshareholders:data.Table3, 
	          })
	        }
	    }).catch(function (error) {});
    }
      /*************Get all periods shareholding*******************/
    getAllPeriodShareHolding = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/allperiodshareholding/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          if(data.Table1.length>0){
            var allkeys=Object.keys(data.Table1[0]);
            this.setState({
               allperiodshareholding:data.Table1,      
               allperiodshareholdingobject:data.Table1[0],
               allperiodkeys:allkeys.slice(2),
            })
          }
      }).catch(function (error) {});
    }
      /*************Get Public shareholding*******************/
    getPublicShareholding= async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/publicshareholding/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          if(data.Table1.length>0){
            this.setState({
               publicshareholding:data.Table1,      
               publicshareholdingobject:data.Table1[0],
            })
          }
      }).catch(function (error) {});
    }
      /*************Get PROMOTER shareholding*******************/
    getPromoterShareholding= async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/Promotershareholding/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          if(data.Table1.length>0){
            this.setState({
               Promotershareholding:data.Table1,      
               Promotershareholdingobject:data.Table1[0],
            })
          }
      }).catch(function (error) {});
	}
  indianClickhandle =()=>{
    this.state({indianDisplay:!{display:'block'}
    })
  }
	render(){
    const checkindianpromoterholder=["&nbsp;&nbsp;&nbsp;&nbsp;Individuals / Hindu Undivided Family","&nbsp;&nbsp;&nbsp;&nbsp;Central Government/State Government(s)","&nbsp;&nbsp;&nbsp;&nbsp;Bodies Corporate","&nbsp;&nbsp;&nbsp;&nbsp;Financial Institutions / Banks","&nbsp;&nbsp;&nbsp;&nbsp;Other"];
    const checkForeignpromoterholder=["&nbsp;&nbsp;&nbsp;&nbsp;Non-Residents Individuals / Foreign Individuals","&nbsp;&nbsp;&nbsp;&nbsp;'Bodies Corporate","&nbsp;&nbsp;&nbsp;&nbsp;Institutions","&nbsp;&nbsp;&nbsp;&nbsp;Other"];    
    const checkdiiholder=["&nbsp;&nbsp;&nbsp;&nbsp;Mutual  Funds / UTI","&nbsp;&nbsp;&nbsp;&nbsp;Insurance Companies","&nbsp;&nbsp;&nbsp;&nbsp;Financial Institutions / Banks","&nbsp;&nbsp;&nbsp;&nbsp;Central Government / State Government(s)","&nbsp;&nbsp;&nbsp;&nbsp;Alternate Investment Funds"];    
    const checkFIIholder=["&nbsp;&nbsp;&nbsp;&nbsp;Foreign Institutional Investors","&nbsp;&nbsp;&nbsp;&nbsp;Foreign Portfolio investors","&nbsp;&nbsp;&nbsp;&nbsp;Foreign Venture Capital Investors","&nbsp;&nbsp;&nbsp;&nbsp;Foreign Financial Institutions / Banks","&nbsp;&nbsp;&nbsp;&nbsp;Foreign Bodies DR"];    
    const checkotherinstholder=["&nbsp;&nbsp;&nbsp;&nbsp;Venture Capital Funds","&nbsp;&nbsp;&nbsp;&nbsp;State Finance Corporation","Others"];
    const checknotinstholder=["&nbsp;&nbsp;&nbsp;&nbsp;Bodies Corporate","&nbsp;&nbsp;&nbsp;&nbsp;Non Resident Indians","&nbsp;&nbsp;&nbsp;&nbsp;Individuals","&nbsp;&nbsp;&nbsp;&nbsp;Individual shareholders holding nominal share capital up to Rs. 1 lakh","&nbsp;&nbsp;&nbsp;&nbsp;Individual shareholders holding nominal share capital in excess of Rs. 1 lakh","&nbsp;&nbsp;&nbsp;&nbsp;Foreign Collaborators","&nbsp;&nbsp;&nbsp;&nbsp;Trusts","&nbsp;&nbsp;&nbsp;&nbsp;Hindu Undivided Families","&nbsp;&nbsp;&nbsp;&nbsp;Shares in transit","&nbsp;&nbsp;&nbsp;&nbsp;Market Maker","&nbsp;&nbsp;&nbsp;&nbsp;ESOP/ESOS/ESPS","&nbsp;&nbsp;&nbsp;&nbsp;Societies","&nbsp;&nbsp;&nbsp;&nbsp;Escrow Account","&nbsp;&nbsp;&nbsp;&nbsp;Any Other","&nbsp;&nbsp;&nbsp;&nbsp;Clearing Members","&nbsp;&nbsp;&nbsp;&nbsp;NBFCs Registed with RBI"];    
    const checkholder=['Indian Promoters','Foreign Promoters','Institutions','&nbsp;&nbsp;&nbsp;&nbsp;Foreign Portfolio investors','Non-Institutions'];
    const {error,percentofshare,noofshare,noofshareholders,percentofshareobject,noofshareobject,noofshareholdersobject,allperiodshareholding,allperiodshareholdingobject,publicshareholding,publicshareholdingobject,Promotershareholding,Promotershareholdingobject,allperiodkeys} = this.state;
    var indprom=0;var foreignprom=0;var Institutions=0;var diiprom=0;var fiiprom=0; var otherprom=0; var noninstprom=0;
    var noofshareindprom=0;var noofshareforeignprom=0;var noofshareInstitutions=0;var noofsharediiprom=0;
    var noofsharefiiprom=0; var noofshareotherprom=0; var noofsharenoninstprom=0;
    var noofholderindprom=0;var noofholderforeignprom=0;var noofholderInstitutions=0;var noofholderdiiprom=0;
    var noofholderfiiprom=0; var noofholderotherprom=0; var noofholdernoninstprom=0;
    if(percentofshare.length>0){        
        percentofshare.map((value, index) => (
          checkindianpromoterholder.indexOf(value.Particulars) > -1 && index >=3 && index<=11?
              value[this.state.objectkey]!=='' ?  indprom=parseFloat(value[this.state.objectkey])+parseFloat(indprom)  : ''
          : checkForeignpromoterholder.indexOf(value.Particulars) > -1  && index >=13 && index<=18?
              value[this.state.objectkey]!=='' ? foreignprom=parseFloat(value[this.state.objectkey])+parseFloat(foreignprom) : ''
          : value.Particulars==="Institutions" ?
            value[this.state.objectkey]!=='' ? Institutions=value[this.state.objectkey] : ''
          : checkdiiholder.indexOf(value.Particulars) > -1  && index >=21 && index<=33?
              value[this.state.objectkey]!=='' ? diiprom=parseFloat(value[this.state.objectkey])+parseFloat(diiprom) : ''
          : checkFIIholder.indexOf(value.Particulars) > -1 ?
              value[this.state.objectkey]!=='' ? fiiprom=parseFloat(value[this.state.objectkey])+parseFloat(fiiprom) : ''
          : checkotherinstholder.indexOf(value.Particulars) > -1 ?
              value[this.state.objectkey]!=='' ? otherprom=parseFloat(value[this.state.objectkey])+parseFloat(otherprom) : ''
          :  checknotinstholder.indexOf(value.Particulars) > -1   && index >=39 && index <=70 ?
              value[this.state.objectkey]!=='' ? noninstprom=parseFloat(value[this.state.objectkey])+parseFloat(noninstprom) : ''
          : ''
        ))
    }
    if(noofshare.length>0){        
        noofshare.map((value, index) => (
          checkindianpromoterholder.indexOf(value.Particulars) > -1 && index >=3 && index<=11?
              value[this.state.objectkey]!=='' ?  noofshareindprom=parseFloat(value[this.state.objectkey])+parseFloat(noofshareindprom)  : ''
          : checkForeignpromoterholder.indexOf(value.Particulars) > -1  && index >=13 && index<=18?
              value[this.state.objectkey]!=='' ? noofshareforeignprom=parseFloat(value[this.state.objectkey])+parseFloat(noofshareforeignprom) : ''
          : value.Particulars==="Institutions" ?
            value[this.state.objectkey]!=='' ? noofshareInstitutions=value[this.state.objectkey] : ''
          : checkdiiholder.indexOf(value.Particulars) > -1  && index >=21 && index<=33?
              value[this.state.objectkey]!=='' ? noofsharediiprom=parseFloat(value[this.state.objectkey])+parseFloat(noofsharediiprom) : ''
          : checkFIIholder.indexOf(value.Particulars) > -1 ?
              value[this.state.objectkey]!=='' ? noofsharefiiprom=parseFloat(value[this.state.objectkey])+parseFloat(noofsharefiiprom) : ''
          : checkotherinstholder.indexOf(value.Particulars) > -1 ?
              value[this.state.objectkey]!=='' ? noofshareotherprom=parseFloat(value[this.state.objectkey])+parseFloat(noofshareotherprom) : ''
          : checknotinstholder.indexOf(value.Particulars) > -1   && index >=39 && index <=70 ?
              value[this.state.objectkey]!=='' ? noofsharenoninstprom=parseFloat(value[this.state.objectkey])+parseFloat(noofsharenoninstprom) : ''
          : ''
        ))
    }    
    if(noofshareholders.length>0){        
        noofshareholders.map((value, index) => (
          checkindianpromoterholder.indexOf(value.Particulars) > -1 && index >=3 && index<=11?
              value[this.state.objectkey]!=='' ?  noofholderindprom=parseFloat(value[this.state.objectkey])+parseFloat(noofholderindprom)  : ''
          : checkForeignpromoterholder.indexOf(value.Particulars) > -1  && index >=13 && index<=18?
              value[this.state.objectkey]!=='' ? noofholderforeignprom=parseFloat(value[this.state.objectkey])+parseFloat(noofholderforeignprom) : ''
          : value.Particulars==="Institutions" ?
            value[this.state.objectkey]!=='' ? noofholderInstitutions=value[this.state.objectkey] : ''
          : checkdiiholder.indexOf(value.Particulars) > -1  && index >=21 && index<=33?
              value[this.state.objectkey]!=='' ? noofholderdiiprom=parseFloat(value[this.state.objectkey])+parseFloat(noofholderdiiprom) : ''
          : checkFIIholder.indexOf(value.Particulars) > -1 ?
              value[this.state.objectkey]!=='' ? noofholderfiiprom=parseFloat(value[this.state.objectkey])+parseFloat(noofholderfiiprom) : ''
          : checkotherinstholder.indexOf(value.Particulars) > -1 ?
              value[this.state.objectkey]!=='' ? noofholderotherprom=parseFloat(value[this.state.objectkey])+parseFloat(noofholderotherprom) : ''
          : checknotinstholder.indexOf(value.Particulars) > -1   && index >=39 && index <=70 ?
              value[this.state.objectkey]!=='' ? noofholdernoninstprom=parseFloat(value[this.state.objectkey])+parseFloat(noofholdernoninstprom) : ''
          : ''
        ))
    }
    const indsubgroup=percentofshare.map((value, index) => (        
        checkindianpromoterholder.indexOf(value.Particulars) > -1 && index >=3 && index<=11?
          <tr key={index}>
            <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
            <td>                                       
            {Object.keys(percentofshareobject).map(key =>
                key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                  <span key={key.toString()}>{value[key]}</span>
                :null
            )}
            </td>
            <td>
            {noofshare.map((value2, index2) => (
                Object.keys(noofshareobject).map(key2 =>
                    key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars && index2 >=3 && index2<=11?
                      <span key={key2.toString()}>{value2[key2]}</span>
                    :null
                )
            ))}
            </td>
            <td>
            {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                    key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars && index3 >=3 && index3<=11?
                      <span key={key3.toString()}>{value3[key3]}</span>
                    :null
                )
            ))}   
            </td> 
          </tr>
        :null
    ))
    const foreignsubgroup=percentofshare.map((value, index) => (        
        checkForeignpromoterholder.indexOf(value.Particulars) > -1 && index >=13 && index<=18 ?
          <tr key={index}>
            <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
            <td>                                       
            {Object.keys(percentofshareobject).map(key =>
                key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                  <span key={key.toString()}>{value[key]}</span>
                :null
            )}
            </td>
            <td>
            {noofshare.map((value2, index2) => (
                Object.keys(noofshareobject).map(key2 =>
                    key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars && index2 >=13 && index2<=18?
                      <span key={key2.toString()}>{value2[key2]}</span>
                    :null
                )
            ))}
            </td>
            <td>
            {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                    key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars && index3 >=13 && index3<=18?
                      <span key={key3.toString()}>{value3[key3]}</span>
                    :null
                )
            ))}   
            </td> 
          </tr>
        :null
    ))
    const diisubgroup=percentofshare.map((value, index) => (        
        checkdiiholder.indexOf(value.Particulars) > -1  && index >=21 && index<=33?
          <tr key={index}>
            <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
            <td>                                       
            {Object.keys(percentofshareobject).map(key =>
                key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                  <span key={key.toString()}>{value[key]}</span>
                :null
            )}
            </td>
            <td>
            {noofshare.map((value2, index2) => (
                Object.keys(noofshareobject).map(key2 =>
                    key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars && index2 >=21 && index2<=33?
                      <span key={key2.toString()}>{value2[key2]}</span>
                    :null
                )
            ))}
            </td>
            <td>
            {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                    key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars && index3 >=21 && index3<=33?
                      <span key={key3.toString()}>{value3[key3]}</span>
                    :null
                )
            ))}   
            </td> 
          </tr>
        :null
    ))
    const fiisubgroup=percentofshare.map((value, index) => (        
        checkFIIholder.indexOf(value.Particulars) > -1?
          <tr key={index}>
            <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
            <td>                                       
            {Object.keys(percentofshareobject).map(key =>
                key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                  <span key={key.toString()}>{value[key]}</span>
                :null
            )}
            </td>
            <td>
            {noofshare.map((value2, index2) => (
                Object.keys(noofshareobject).map(key2 =>
                    key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars ?
                      <span key={key2.toString()}>{value2[key2]}</span>
                    :null
                )
            ))}
            </td>
            <td>
            {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                    key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars?
                      <span key={key3.toString()}>{value3[key3]}</span>
                    :null
                )
            ))}   
            </td> 
          </tr>
        :null
    ))
    const otherinstsubgroup=percentofshare.map((value, index) => (        
        checkotherinstholder.indexOf(value.Particulars) > -1?
          <tr key={index}>
            <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
            <td>                                       
            {Object.keys(percentofshareobject).map(key =>
                key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                  <span key={key.toString()}>{value[key]}</span>
                :null
            )}
            </td>
            <td>
            {noofshare.map((value2, index2) => (
                Object.keys(noofshareobject).map(key2 =>
                    key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars ?
                      <span key={key2.toString()}>{value2[key2]}</span>
                    :null
                )
            ))}
            </td>
            <td>
            {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                    key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars ?
                      <span key={key3.toString()}>{value3[key3]}</span>
                    :null
                )
            ))}   
            </td> 
          </tr>
        :null
    ))
    const noninstsubgroup=percentofshare.map((value, index) => (        
        checknotinstholder.indexOf(value.Particulars) > -1  && index >=39 && index<=70?
          <tr key={index}>
            <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
            <td>                                       
            {Object.keys(percentofshareobject).map(key =>
                key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                  <span key={key.toString()}>{value[key]}</span>
                :null
            )}
            </td>
            <td>
            {noofshare.map((value2, index2) => (
                Object.keys(noofshareobject).map(key2 =>
                    key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars && index2 >=39 && index2<=70?
                      <span key={key2.toString()}>{value2[key2]}</span>
                    :null
                )
            ))}
            </td>
            <td>
            {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                    key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars && index3 >=39 && index3<=70?
                      <span key={key3.toString()}>{value3[key3]}</span>
                    :null
                )
            ))}   
            </td> 
          </tr>
        :null
    ))
    var allpromoter=indprom+foreignprom;
    const data= {
        datasets: [{
          data: [parseFloat(allpromoter).toFixed(2),parseFloat(fiiprom).toFixed(2), parseFloat(diiprom).toFixed(2),parseFloat(otherprom).toFixed(2),parseFloat(noninstprom).toFixed(2)],
          backgroundColor: [ '#ff6384','#36a2eb', '#cc65fe', '#275cac', '#ffce56']
        }],
        labels: ['Promoters '+parseFloat(allpromoter).toFixed(2)+'%','FIIs'+parseFloat(fiiprom).toFixed(2)+'%','DII'+parseFloat(diiprom).toFixed(2)+'%','Other Institutions '+parseFloat(otherprom).toFixed(2)+'%','Non-Institutions '+parseFloat(noninstprom).toFixed(2)+'%']
    }
    var allindprom=0;var allindprom1=0;var allindprom2=0;var allindprom3=0;var allindprom4=0;var allindprom5=0;
    var allforeignprom=0;var allforeignprom1=0;var allforeignprom2=0;var allforeignprom3=0;var allforeignprom4=0;var allforeignprom5=0;
    var alldiiprom=0;var alldiiprom1=0;var alldiiprom2=0;var alldiiprom3=0;var alldiiprom4=0;var alldiiprom5=0;
    var allfiiprom=0; var allfiiprom1=0;var allfiiprom2=0;var allfiiprom3=0;var allfiiprom4=0;var allfiiprom5=0;
    var allotherprom=0; var allotherprom1=0;var allotherprom2=0;var allotherprom3=0;var allotherprom4=0;var allotherprom5=0;
    var allnoninstprom=0;var allnoninstprom1=0;var allnoninstprom2=0;var allnoninstprom3=0;var allnoninstprom4=0;var allnoninstprom5=0;
    if(allperiodshareholding.length>0){
      for(var l=0;l<allperiodshareholding.length;l++)
      {
          if(checkindianpromoterholder.indexOf(allperiodshareholding[l].Particulars) > -1 && l >=3 && l<=11){          
            if(allperiodkeys.length>0)
            { 
              if(allperiodshareholding[l][allperiodkeys[0]]!==''){
                allindprom=parseFloat(allperiodshareholding[l][allperiodkeys[0]])+parseFloat(allindprom);
              }
              if(allperiodkeys.length>=2)
              {
                if(allperiodshareholding[l][allperiodkeys[1]]!==''){
                  allindprom1=parseFloat(allperiodshareholding[l][allperiodkeys[1]])+parseFloat(allindprom1);
                }
              }
              if(allperiodkeys.length>=3)
              {
                if(allperiodshareholding[l][allperiodkeys[2]]!==''){
                  allindprom2=parseFloat(allperiodshareholding[l][allperiodkeys[2]])+parseFloat(allindprom2);
                }
              }
              if(allperiodkeys.length>=4)
              {
                if(allperiodshareholding[l][allperiodkeys[3]]!==''){
                  allindprom3=parseFloat(allperiodshareholding[l][allperiodkeys[3]])+parseFloat(allindprom3);
                }
              }
              if(allperiodkeys.length>=5)
              {
                if(allperiodshareholding[l][allperiodkeys[4]]!==''){
                  allindprom4=parseFloat(allperiodshareholding[l][allperiodkeys[4]])+parseFloat(allindprom4);
                }
              }
              if(allperiodkeys.length>=6)
              {
                if(allperiodshareholding[l][allperiodkeys[5]]!==''){
                  allindprom5=parseFloat(allperiodshareholding[l][allperiodkeys[5]])+parseFloat(allindprom5);
                }
              }
            }
          }
          if(checkForeignpromoterholder.indexOf(allperiodshareholding[l].Particulars) > -1 && l >=13 && l<=18){          
            if(allperiodkeys.length>0)
            { 
              if(allperiodshareholding[l][allperiodkeys[0]]!==''){
                allforeignprom=parseFloat(allperiodshareholding[l][allperiodkeys[0]])+parseFloat(allforeignprom);
              }
              if(allperiodkeys.length>=2)
              {
                if(allperiodshareholding[l][allperiodkeys[1]]!==''){
                  allforeignprom1=parseFloat(allperiodshareholding[l][allperiodkeys[1]])+parseFloat(allforeignprom1);
                }
              }
              if(allperiodkeys.length>=3)
              {
                if(allperiodshareholding[l][allperiodkeys[2]]!==''){
                  allforeignprom2=parseFloat(allperiodshareholding[l][allperiodkeys[2]])+parseFloat(allforeignprom2);
                }
              }
              if(allperiodkeys.length>=4)
              {
                if(allperiodshareholding[l][allperiodkeys[3]]!==''){
                  allforeignprom3=parseFloat(allperiodshareholding[l][allperiodkeys[3]])+parseFloat(allforeignprom3);
                }
              }
              if(allperiodkeys.length>=5)
              {
                if(allperiodshareholding[l][allperiodkeys[4]]!==''){
                  allforeignprom4=parseFloat(allperiodshareholding[l][allperiodkeys[4]])+parseFloat(allforeignprom4);
                }
              }
              if(allperiodkeys.length>=6)
              {
                if(allperiodshareholding[l][allperiodkeys[5]]!==''){
                  allforeignprom5=parseFloat(allperiodshareholding[l][allperiodkeys[5]])+parseFloat(allforeignprom5);
                }
              }
            }
          }
          if(checkdiiholder.indexOf(allperiodshareholding[l].Particulars) > -1 && l >=21 && l<=33){          
            if(allperiodkeys.length>0)
            { 
              if(allperiodshareholding[l][allperiodkeys[0]]!==''){
                alldiiprom=parseFloat(allperiodshareholding[l][allperiodkeys[0]])+parseFloat(alldiiprom);
              }
              if(allperiodkeys.length>=2)
              {
                if(allperiodshareholding[l][allperiodkeys[1]]!==''){
                  alldiiprom1=parseFloat(allperiodshareholding[l][allperiodkeys[1]])+parseFloat(alldiiprom1);
                }
              }
              if(allperiodkeys.length>=3)
              {
                if(allperiodshareholding[l][allperiodkeys[2]]!==''){
                  alldiiprom2=parseFloat(allperiodshareholding[l][allperiodkeys[2]])+parseFloat(alldiiprom2);
                }
              }
              if(allperiodkeys.length>=4)
              {
                if(allperiodshareholding[l][allperiodkeys[3]]!==''){
                  alldiiprom3=parseFloat(allperiodshareholding[l][allperiodkeys[3]])+parseFloat(alldiiprom3);
                }
              }
              if(allperiodkeys.length>=5)
              {
                if(allperiodshareholding[l][allperiodkeys[4]]!==''){
                  alldiiprom4=parseFloat(allperiodshareholding[l][allperiodkeys[4]])+parseFloat(alldiiprom4);
                }
              }
              if(allperiodkeys.length>=6)
              {
                if(allperiodshareholding[l][allperiodkeys[5]]!==''){
                  alldiiprom5=parseFloat(allperiodshareholding[l][allperiodkeys[5]])+parseFloat(alldiiprom5);
                }
              }
            }
          }
          if(checkFIIholder.indexOf(allperiodshareholding[l].Particulars) > -1){          
            if(allperiodkeys.length>0)
            { 
              if(allperiodshareholding[l][allperiodkeys[0]]!==''){
                allfiiprom=parseFloat(allperiodshareholding[l][allperiodkeys[0]])+parseFloat(allfiiprom);
              }
              if(allperiodkeys.length>=2)
              {
                if(allperiodshareholding[l][allperiodkeys[1]]!==''){
                  allfiiprom1=parseFloat(allperiodshareholding[l][allperiodkeys[1]])+parseFloat(allfiiprom1);
                }
              }
              if(allperiodkeys.length>=3)
              {
                if(allperiodshareholding[l][allperiodkeys[2]]!==''){
                  allfiiprom2=parseFloat(allperiodshareholding[l][allperiodkeys[2]])+parseFloat(allfiiprom2);
                }
              }
              if(allperiodkeys.length>=4)
              {
                if(allperiodshareholding[l][allperiodkeys[3]]!==''){
                  allfiiprom3=parseFloat(allperiodshareholding[l][allperiodkeys[3]])+parseFloat(allfiiprom3);
                }
              }
              if(allperiodkeys.length>=5)
              {
                if(allperiodshareholding[l][allperiodkeys[4]]!==''){
                  allfiiprom4=parseFloat(allperiodshareholding[l][allperiodkeys[4]])+parseFloat(allfiiprom4);
                }
              }
              if(allperiodkeys.length>=6)
              {
                if(allperiodshareholding[l][allperiodkeys[5]]!==''){
                  allfiiprom5=parseFloat(allperiodshareholding[l][allperiodkeys[5]])+parseFloat(allfiiprom5);
                }
              }
            }
          }
          if(checkotherinstholder.indexOf(allperiodshareholding[l].Particulars) > -1){          
            if(allperiodkeys.length>0)
            { 
              if(allperiodshareholding[l][allperiodkeys[0]]!==''){
                allotherprom=parseFloat(allperiodshareholding[l][allperiodkeys[0]])+parseFloat(allotherprom);
              }
              if(allperiodkeys.length>=2)
              {
                if(allperiodshareholding[l][allperiodkeys[1]]!==''){
                  allotherprom1=parseFloat(allperiodshareholding[l][allperiodkeys[1]])+parseFloat(allotherprom1);
                }
              }
              if(allperiodkeys.length>=3)
              {
                if(allperiodshareholding[l][allperiodkeys[2]]!==''){
                  allotherprom2=parseFloat(allperiodshareholding[l][allperiodkeys[2]])+parseFloat(allotherprom2);
                }
              }
              if(allperiodkeys.length>=4)
              {
                if(allperiodshareholding[l][allperiodkeys[3]]!==''){
                  allotherprom3=parseFloat(allperiodshareholding[l][allperiodkeys[3]])+parseFloat(allotherprom3);
                }
              }
              if(allperiodkeys.length>=5)
              {
                if(allperiodshareholding[l][allperiodkeys[4]]!==''){
                  allotherprom4=parseFloat(allperiodshareholding[l][allperiodkeys[4]])+parseFloat(allotherprom4);
                }
              }
              if(allperiodkeys.length>=6)
              {
                if(allperiodshareholding[l][allperiodkeys[5]]!==''){
                  allotherprom5=parseFloat(allperiodshareholding[l][allperiodkeys[5]])+parseFloat(allotherprom5);
                }
              }
            }
          }
          if(checknotinstholder.indexOf(allperiodshareholding[l].Particulars) > -1&& l>=39 && l<=70 ){          
            if(allperiodkeys.length>0)
            { 
              if(allperiodshareholding[l][allperiodkeys[0]]!==''){
                allnoninstprom=parseFloat(allperiodshareholding[l][allperiodkeys[0]])+parseFloat(allnoninstprom);
              }
              if(allperiodkeys.length>=2)
              {
                if(allperiodshareholding[l][allperiodkeys[1]]!==''){
                  allnoninstprom1=parseFloat(allperiodshareholding[l][allperiodkeys[1]])+parseFloat(allnoninstprom1);
                }
              }
              if(allperiodkeys.length>=3)
              {
                if(allperiodshareholding[l][allperiodkeys[2]]!==''){
                  allnoninstprom2=parseFloat(allperiodshareholding[l][allperiodkeys[2]])+parseFloat(allnoninstprom2);
                }
              }
              if(allperiodkeys.length>=4)
              {
                if(allperiodshareholding[l][allperiodkeys[3]]!==''){
                  allnoninstprom3=parseFloat(allperiodshareholding[l][allperiodkeys[3]])+parseFloat(allnoninstprom3);
                }
              }
              if(allperiodkeys.length>=5)
              {
                if(allperiodshareholding[l][allperiodkeys[4]]!==''){
                  allnoninstprom4=parseFloat(allperiodshareholding[l][allperiodkeys[4]])+parseFloat(allnoninstprom4);
                }
              }
              if(allperiodkeys.length>=6)
              {
                if(allperiodshareholding[l][allperiodkeys[5]]!==''){
                  allnoninstprom5=parseFloat(allperiodshareholding[l][allperiodkeys[5]])+parseFloat(allnoninstprom5);
                }
              }
            }
          }
      } 
    }
    const allindsubgroup=allperiodshareholding.map((value, index) => (        
        checkindianpromoterholder.indexOf(value.Particulars) > -1 && index >=3 && index<=11?
          <tr key={index}>
            {Object.keys(allperiodshareholdingobject).map(key =>
                key.toString()!=='BOLD' ?
                  <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                :null
            )}
          </tr>
        :null
    ))
    const allforeignsubgroup=allperiodshareholding.map((value, index) => (        
        checkForeignpromoterholder.indexOf(value.Particulars) > -1 && index >=13 && index<=18 ?
          <tr key={index}>
            {Object.keys(allperiodshareholdingobject).map(key =>
                key.toString()!=='BOLD' ?
                  <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                :null
            )}
          </tr>
        :null
    ))
    const alldiisubgroup=allperiodshareholding.map((value, index) => (        
        checkdiiholder.indexOf(value.Particulars) > -1  && index >=21 && index<=33?
          <tr key={index}>
            {Object.keys(allperiodshareholdingobject).map(key =>
                key.toString()!=='BOLD' ?
                  <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                :null
            )}
          </tr>
        :null
    ))
    const allfiisubgroup=allperiodshareholding.map((value, index) => (        
        checkFIIholder.indexOf(value.Particulars) > -1?
          <tr key={index}>
            {Object.keys(allperiodshareholdingobject).map(key =>
                key.toString()!=='BOLD' ?
                  <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                :null
            )}
          </tr>
        :null
    ))
    const allotherinstsubgroup=allperiodshareholding.map((value, index) => (        
        checkotherinstholder.indexOf(value.Particulars) > -1?
          <tr key={index}>
            {Object.keys(allperiodshareholdingobject).map(key =>
                key.toString()!=='BOLD' ?
                  <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                :null
            )}
          </tr>
        :null
    ))
    const allnoninstsubgroup=allperiodshareholding.map((value, index) => (        
        checknotinstholder.indexOf(value.Particulars) > -1  && index >=39 && index<=70?
          <tr key={index}>
            {Object.keys(allperiodshareholdingobject).map(key =>
                key.toString()!=='BOLD' ?
                  <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
                :null
            )}
          </tr>
        :null
    ))
		return(
			       <div className="shareHolder">
              <div className="mainContainer">
                <div className="holderIn">
                  <h2 className="mainHead">SHAREHOLDING PATTERN</h2>
                  <div className="shareHolderTab">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="mainTab">
                          <div className="tab" role="tabpanel">
                            <ul className="nav nav-tabs nav-justified" role="tablist">
                              <li role="presentation" className="active">
                                <a href="#Section01" aria-controls="home" role="tab" data-toggle="tab">Shareholding Pattern</a>
                              </li>
                              <li role="presentation">
                                <a href="#Section02" aria-controls="profile" role="tab" data-toggle="tab">All Periods</a>
                              </li>
                              <li role="presentation">
                                <a href="#Section03" aria-controls="messages" role="tab" data-toggle="tab">Top  Shareholding</a>
                              </li>
                              <li role="presentation">
                                <a href="#Section04" aria-controls="messages" role="tab" data-toggle="tab">Promoter Holding</a>
                              </li>
                            </ul>
                            <div className="tab-content tabs">

                              <div role="tabpanel" className="tab-pane show in active" id="Section01">
                                <div className="mainTable">
                                  <div className="table-responsive">
                                    <table className="table table-striped">
                                      <thead>
                                        <tr>
                          
                                          <th>Particulars</th>
                                          <th>% of Shares</th>
                                          <th>No. of Shares</th>
                                          <th>Shareholders</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                            <td colSpan="4">Promoter</td>
                                          </tr>
                                        </tbody>
                                      <tbody className="subBody">
                                        <tr>
                                          <td>Indian Promoters &nbsp;
                                              <i className={this.state.indianDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ indianDisplay: !this.state.indianDisplay })}></i>
                                          </td>
                                          <td>{parseFloat(indprom).toFixed(2)}</td>    
                                          <td>{parseFloat(noofshareindprom).toFixed(0)}</td>    
                                          <td>{parseFloat(noofholderindprom).toFixed(0)}</td>    
                                        </tr>
                                        </tbody>
                                        {this.state.indianDisplay ? <tbody className="subBodyInner">{indsubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                          <tr>
                                            <td>Foreign Promoters &nbsp;
                                                <i className={this.state.ForeignDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ ForeignDisplay: !this.state.ForeignDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(foreignprom).toFixed(2)}</td>
                                            <td>{parseFloat(noofshareforeignprom).toFixed(0)}</td>
                                            <td>{parseFloat(noofholderforeignprom).toFixed(0)}</td>   
                                          </tr>
                                        </tbody>
                                        {this.state.ForeignDisplay ? <tbody className="subBodyInner">{foreignsubgroup}</tbody>:'' }
                                        <tbody>
                                          <tr>
                                            <td colSpan="4">Institutions</td>
                                            {/*<td>{parseFloat(Institutions).toFixed(2)}</td> 
                                                                                         <td>{parseFloat(noofshareInstitutions).toFixed(0)}</td> 
                                                                                         <td>{parseFloat(noofholderInstitutions).toFixed(0)}</td>*/} 
                                          </tr>
                                        </tbody>
                                        <tbody className="subBody">
                                          <tr>
                                            <td>DII &nbsp;
                                                <i className={this.state.DIIDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ DIIDisplay: !this.state.DIIDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(diiprom).toFixed(2)}</td>       
                                            <td>{parseFloat(noofsharediiprom).toFixed(0)}</td>       
                                            <td>{parseFloat(noofholderdiiprom).toFixed(0)}</td>       
                                          </tr>
                                        </tbody>
                                        {this.state.DIIDisplay ? <tbody className="subBodyInner">{diisubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                          <tr>
                                            <td>FIIs &nbsp;
                                                <i className={this.state.FIIsDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ FIIsDisplay: !this.state.FIIsDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(fiiprom).toFixed(2)}</td>       
                                            <td>{parseFloat(noofsharefiiprom).toFixed(0)}</td>       
                                            <td>{parseFloat(noofholderfiiprom).toFixed(0)}</td>       
                                          </tr>
                                        </tbody>
                                        {this.state.FIIsDisplay ? <tbody className="subBodyInner">{fiisubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                          <tr>
                                            <td>Other Institutions  &nbsp;
                                                <i className={this.state.otherDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ otherDisplay: !this.state.otherDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(otherprom).toFixed(2)}</td>     
                                            <td>{parseFloat(noofshareotherprom).toFixed(0)}</td>     
                                            <td>{parseFloat(noofholderotherprom).toFixed(0)}</td>     
                                          </tr>
                                        </tbody>
                                        {this.state.otherDisplay ? <tbody className="subBodyInner">{otherinstsubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                        <tr>
                                          <td>Non-Institutions  &nbsp;
                                              <i className={this.state.nonDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ nonDisplay: !this.state.nonDisplay })}></i>
                                          </td>
                                          <td>{parseFloat(noninstprom).toFixed(2)}</td>  
                                          <td>{parseFloat(noofsharenoninstprom).toFixed(0)}</td>  
                                          <td>{parseFloat(noofholdernoninstprom).toFixed(0)}</td>  
                                        </tr>                                   
                                      </tbody>
                                      {this.state.nonDisplay ? <tbody className="subBodyInner">{noninstsubgroup}</tbody>:'' }
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div role="tabpane0l" className="tab-pane fade" id="Section02">
                                <div className="mainTable">
                                  <div className="table-responsive">
                                    <table className="table table-striped">
                                      <thead>
                                        <tr>                          
                                          <th>Particulars</th>
                                          {Object.keys(allperiodshareholdingobject).map(key =>
                                              key.toString()!=='BOLD' && key.toString()!=='Particulars'?
                                                <th key={key.toString()}>{key.toString()}</th>
                                              :null
                                          )}
                                        </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                            <td colSpan="4">Promoter</td>
                                          </tr>
                                        </tbody>
                                      <tbody className="subBody">
                                        <tr>
                                          <td>Indian Promoters &nbsp;
                                              <i className={this.state.indianDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ indianDisplay: !this.state.indianDisplay })}></i>
                                          </td>
                                          <td>{parseFloat(allindprom).toFixed(2)}</td>    
                                          <td>{parseFloat(allindprom1).toFixed(2)}</td>    
                                          <td>{parseFloat(allindprom2).toFixed(2)}</td>    
                                          <td>{parseFloat(allindprom3).toFixed(2)}</td>    
                                          <td>{parseFloat(allindprom4).toFixed(2)}</td>    
                                          <td>{parseFloat(allindprom5).toFixed(2)}</td>
                                        </tr>
                                        </tbody>
                                        {this.state.indianDisplay ? <tbody className="subBodyInner">{allindsubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                          <tr>
                                            <td>Foreign Promoters &nbsp;
                                                <i className={this.state.ForeignDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ ForeignDisplay: !this.state.ForeignDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(allforeignprom).toFixed(2)}</td>    
                                            <td>{parseFloat(allforeignprom1).toFixed(2)}</td>    
                                            <td>{parseFloat(allforeignprom2).toFixed(2)}</td>    
                                            <td>{parseFloat(allforeignprom3).toFixed(2)}</td>    
                                            <td>{parseFloat(allforeignprom4).toFixed(2)}</td>    
                                            <td>{parseFloat(allforeignprom5).toFixed(2)}</td>  
                                          </tr>
                                        </tbody>
                                        {this.state.ForeignDisplay ? <tbody className="subBodyInner">{allforeignsubgroup}</tbody>:'' }
                                        <tbody>
                                          <tr>
                                            <td colSpan="4">Institutions</td>
                                          </tr>
                                        </tbody>
                                        <tbody className="subBody">
                                          <tr>
                                            <td>DII &nbsp;
                                                <i className={this.state.DIIDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ DIIDisplay: !this.state.DIIDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(alldiiprom).toFixed(2)}</td>    
                                            <td>{parseFloat(alldiiprom1).toFixed(2)}</td>    
                                            <td>{parseFloat(alldiiprom2).toFixed(2)}</td>    
                                            <td>{parseFloat(alldiiprom3).toFixed(2)}</td>    
                                            <td>{parseFloat(alldiiprom4).toFixed(2)}</td>    
                                            <td>{parseFloat(alldiiprom5).toFixed(2)}</td>        
                                          </tr>
                                        </tbody>
                                        {this.state.DIIDisplay ? <tbody className="subBodyInner">{alldiisubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                          <tr>
                                            <td>FIIs &nbsp;
                                                <i className={this.state.FIIsDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ FIIsDisplay: !this.state.FIIsDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(allfiiprom).toFixed(2)}</td>    
                                            <td>{parseFloat(allfiiprom1).toFixed(2)}</td>    
                                            <td>{parseFloat(allfiiprom2).toFixed(2)}</td>    
                                            <td>{parseFloat(allfiiprom3).toFixed(2)}</td>    
                                            <td>{parseFloat(allfiiprom4).toFixed(2)}</td>    
                                            <td>{parseFloat(allfiiprom5).toFixed(2)}</td>       
                                          </tr>
                                        </tbody>
                                        {this.state.FIIsDisplay ? <tbody className="subBodyInner">{allfiisubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                          <tr>
                                            <td>Other Institutions  &nbsp;
                                                <i className={this.state.otherDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ otherDisplay: !this.state.otherDisplay })}></i>
                                            </td>
                                            <td>{parseFloat(allotherprom).toFixed(2)}</td>    
                                            <td>{parseFloat(allotherprom1).toFixed(2)}</td>    
                                            <td>{parseFloat(allotherprom2).toFixed(2)}</td>    
                                            <td>{parseFloat(allotherprom3).toFixed(2)}</td>    
                                            <td>{parseFloat(allotherprom4).toFixed(2)}</td>    
                                            <td>{parseFloat(allotherprom5).toFixed(2)}</td>       
                                          </tr>
                                        </tbody>
                                        {this.state.otherDisplay ? <tbody className="subBodyInner">{allotherinstsubgroup}</tbody>:'' }
                                        <tbody className="subBody">
                                        <tr>
                                          <td>Non-Institutions  &nbsp;
                                              <i className={this.state.nonDisplay ? "fa fa-minus-circle" :"fa fa-plus-circle" } aria-hidden="true" onClick={() => this.setState({ nonDisplay: !this.state.nonDisplay })}></i>
                                          </td>
                                          <td>{parseFloat(allnoninstprom).toFixed(2)}</td>    
                                          <td>{parseFloat(allnoninstprom1).toFixed(2)}</td>    
                                          <td>{parseFloat(allnoninstprom2).toFixed(2)}</td>    
                                          <td>{parseFloat(allnoninstprom3).toFixed(2)}</td>    
                                          <td>{parseFloat(allnoninstprom4).toFixed(2)}</td>    
                                          <td>{parseFloat(allnoninstprom5).toFixed(2)}</td>  
                                        </tr>                                   
                                      </tbody>
                                      {this.state.nonDisplay ? <tbody className="subBodyInner">{allnoninstsubgroup}</tbody>:'' }
                                    </table>
                                  </div>
                                </div>
                              </div>

                              <div role="tabpanel" className="tab-pane fade" id="Section03">
                                <div className="mainTable">
                                  <div className="table-responsive">
                                    <table className="table table-striped">
                                      <thead>
                                        <tr>
                          
                                          <th>Particulars</th>
                                          <th>No. of Shares</th>
                                          <th>% of Shares</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {publicshareholding.map((value, index) => (
                                        <tr key={index}>
                                          {Object.keys(publicshareholdingobject).map(key =>
                                            <td key={key.toString()}>{value[key]}</td>
                                          )}
                                        </tr>
                                        ))}  
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div role="tabpanel" className="tab-pane fade" id="Section04">
                                <div className="mainTable">
                                  <div className="table-responsive">
                                    <table className="table table-striped">
                                      <thead>
                                        <tr>
                          
                                          <th>Particulars</th>
                                          <th>No. of Shares</th>
                                          <th>% of Shares</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {Promotershareholding.map((value, index) => (
                                        <tr key={index}>
                                          {Object.keys(Promotershareholdingobject).map(key =>
                                            <td key={key.toString()}>{value[key]}</td>
                                          )}
                                        </tr>
                                        ))}  
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="pieChar">
                          <Doughnut
                              data={data}
                              options={{
                                responsive: true,
                                maintainAspectRatio: true,
                              }}
                            />
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

export default Shareholding;