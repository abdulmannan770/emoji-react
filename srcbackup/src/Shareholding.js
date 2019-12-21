import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        name: 'React',
        data: {
          datasets: [{
            data: [10, 20, 30,40],
            backgroundColor: [ '#ff6384','#36a2eb', '#cc65fe', '#ffce56']
          }],
          labels: ['Promoters','FIIs','Mutual Funds','Non-Institutions']
        }
	    }

  	}
  	UNSAFE_componentWillMount () {
	    var  fincode = this.props.fincode
	    /*************Get shareholding*******************/
	    axios.get(`http://172.104.5.85:3000/shareholding/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table1.length>0){
	          this.setState({
               percentofshare:data.Table1,      
               percentofshareobject:data.Table1[0],      
               noofshareobject:data.Table2[0],      
               noofshareholdersobject:data.Table3[0],      
               noofshare:data.Table2,      
               noofshareholders:data.Table3,      
	          })
	        }
	    }).catch(function (error) {});
      /*************Get all periods shareholding*******************/
      axios.get(`http://172.104.5.85:3000/allperiodshareholding/`+fincode, {
          headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          if(data.Table1.length>0){
            this.setState({
               allperiodshareholding:data.Table1,      
               allperiodshareholdingobject:data.Table1[0],
            })
          }
      }).catch(function (error) {});
      /*************Get Public shareholding*******************/
      axios.get(`http://172.104.5.85:3000/publicshareholding/`+fincode, {
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
      /*************Get PROMOTER shareholding*******************/
      axios.get(`http://172.104.5.85:3000/Promotershareholding/`+fincode, {
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
	render(){
		const {error,percentofshare,noofshare,noofshareholders,percentofshareobject,noofshareobject,noofshareholdersobject,allperiodshareholding,allperiodshareholdingobject,publicshareholding,publicshareholdingobject,Promotershareholding,Promotershareholdingobject} = this.state;    
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
                                       {percentofshare.map((value, index) => (
                                        value.Particulars!=='Year End'?
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
                                      ))}                                        
                                      </tbody>
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
                                      {allperiodshareholding.map((value, index) => (
                                        value.Particulars!=='Year End'?
                                        <tr key={index}>
                                          {Object.keys(allperiodshareholdingobject).map(key =>
                                              key.toString()!=='BOLD' ?
                                                <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
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
                              data={this.state.data}
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