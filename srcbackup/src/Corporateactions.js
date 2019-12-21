import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Corporateactions extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      error: null,
	      boardmeeting:[],
        boardmeetingobject:[],
        dividend:[],
        dividendobject:[],
        bonus:[],
        rigths:[],
	    }
  	}
  	UNSAFE_componentWillMount () {
	    var  fincode = this.props.fincode
	    /*************Get stockbulkdeals*******************/
	    axios.get(`http://172.104.5.85:3000/boardmeeting/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        if(data.Table.length>0){
	          this.setState({
               boardmeeting:data.Table,
	             boardmeetingobject:data.Table[0],
	          })
	        }
	    }).catch(function (error) {});
	    /*************Get stockblockdeals*******************/
	    axios.get(`http://172.104.5.85:3000/dividend/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
	        if(data.Table.length>0){
	          this.setState({
               dividend:data.Table,
	             dividendobject:data.Table[0],
	          })
	        }
	    }).catch(function (error) {});
      /*************Get stockblockdeals*******************/
      axios.get(`http://172.104.5.85:3000/bonus/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          //console.log(data);
          if(data.Table.length>0){
            this.setState({
               bonus:data.Table,
            })
          }
      }).catch(function (error) {});
      /*************Get stockblockdeals*******************/
      axios.get(`http://172.104.5.85:3000/rigths/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          //console.log(data);
          if(data.Table.length>0){
            this.setState({
               rigths:data.Table,
            })
          }
      }).catch(function (error) {});
	}
	render(){
		const {error,boardmeeting,boardmeetingobject,dividend,dividendobject,bonus,rigths} = this.state; 
		return(
			            <div className="corporate">
              <div className="mainContainer">
                <div className="corpoIn">
                  <h2 className="mainHead">CORPORATE ACTIONS <span></span></h2>
                  <div className="corporateTab">
                    <div className="mainTab">
                      <div className="tab" role="tabpanel">
                        <ul className="nav nav-tabs nav-justified" role="tablist">
                          <li role="presentation" className="active">
                            <a href="#Section1" aria-controls="home" role="tab" data-toggle="tab">Board Meeting</a>
                          </li>
                          <li role="presentation">
                            <a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab">Dividend</a>
                          </li>
                          <li role="presentation">
                            <a href="#Section3" aria-controls="messages" role="tab" data-toggle="tab">Bonus</a>
                          </li>
                          <li role="presentation">
                            <a href="#Section4" aria-controls="messages" role="tab" data-toggle="tab">Rights</a>
                          </li>
                        </ul>
                        <div className="tab-content tabs">
                          <div role="tabpanel" className="tab-pane show in active" id="Section1">
                            <div className="mainTable">
                              <div className="table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Source Date</th>
                                      <th>Board Meeting Date</th>
                                      <th>Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {boardmeeting.map((value, index) => (
                                      <tr key={value.SRNO}>
                                        {Object.keys(boardmeetingobject).map(key =>
                                          key.toString()=='Source Date' || key.toString()=='Board Meeting Date' || key.toString()=='Details'?
                                            <td key={key.toString()}>{value[key]}</td>
                                          :null
                                        )}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div role="tabpanel" className="tab-pane fade" id="Section2">
                            <div className="mainTable">
                              <div className="table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Ex Date</th>
                                      <th>Record Date</th>
                                      <th>Dividend %</th>
                                      <th>Purpose</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dividend.map((value, index) => (
                                      <tr key={value.SRNO}>
                                        {Object.keys(dividendobject).map(key =>
                                          key.toString()=='Dividend Date' || key.toString()=='Record Date' || key.toString()=='Dividend %' || key.toString()=='Interim / Final / Dividend'?
                                            <td key={key.toString()}>{value[key]}</td>
                                          :null
                                        )}
                                      </tr>
                                    ))}                                    
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div role="tabpanel" className="tab-pane fade" id="Section3">
                            <div className="mainTable">
                              <div className="table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Ex Date</th>
                                      <th>Record Date</th>
                                      <th>Premium price</th>
                                      <th>Offer price</th>
                                      <th>Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {bonus.map((value, index) => (
                                    <tr key={index}>
                                      <td>{value.ex_date}</td>
                                      <td>{value.recrd_date}</td>
                                      <td>{value.premprice}</td>
                                      <td>{value.OFFERPRICE}</td>
                                      <td>{value.Details}</td>
                                    </tr>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>



                          <div role="tabpanel" className="tab-pane fade" id="Section4">
                            <div className="mainTable">
                              <div className="table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Ex Date</th>
                                      <th>Record Date</th>
                                      <th>Premium price</th>
                                      <th>Offer price</th>
                                      <th>Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {rigths.map((value, index) => (
                                    <tr key={index}>
                                      <td>{value.ex_date}</td>
                                      <td>{value.recrd_date}</td>
                                      <td>{value.premprice}</td>
                                      <td>{value.OFFERPRICE}</td>
                                      <td>{value.Details}</td>
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
                </div>
              </div>
            </div>
       	)
	}
}
export default Corporateactions;