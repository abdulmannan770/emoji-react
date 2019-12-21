import React, { Component } from 'react';
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
        boardmeetlength:'',
        dividendlength:'',
        bonuslength:'',
        rigthslength:'',
	    }
  	}
  	componentDidMount() {
      var  fincode = this.props.fincode;
      this.getBoardMeeting(fincode);
      this.getDividend(fincode);
      this.getBonus(fincode);
      this.getRigths(fincode);
    }
	    /*************Get stockbulkdeals*******************/
    getBoardMeeting = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/boardmeeting/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
          this.setState({
               boardmeetlength:data.Table.length,
          })
	        if(data.Table.length>0){
	          this.setState({
               boardmeeting:data.Table,
	             boardmeetingobject:data.Table[0],
	          })
	        }
	    }).catch(function (error) {});
	 }
      /*************Get stockblockdeals*******************/
   getDividend = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/dividend/`+fincode, {
	          headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
	        //console.log(data);
          this.setState({
               dividendlength:data.Table.length,
          })
	        if(data.Table.length>0){
	          this.setState({
               dividend:data.Table,
	             dividendobject:data.Table[0],
	          })
	        }
	    }).catch(function (error) {});
    }
      /*************Get stockblockdeals*******************/
    getBonus = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/bonus/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          //console.log(data);
          this.setState({
               bonuslength:data.Table.length,
          })
          if(data.Table.length>0){
            this.setState({
               bonus:data.Table,
            })
          }
      }).catch(function (error) {});
    }
      /*************Get stockblockdeals*******************/
    getRigths = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/rigths/`+fincode, {
            headers: new Headers({"Content-Type": "application/json"}),
      }).then(responseText => {
          var data = responseText.data;
          //console.log(data);          
          this.setState({
               rigthslength:data.Table.length,
          })
          if(data.Table.length>0){
            this.setState({
               rigths:data.Table,
            })
          }
      }).catch(function (error) {});
	}
	render(){
		const {error,boardmeeting,boardmeetingobject,dividend,dividendobject,bonus,rigths,boardmeetinglength,dividendlength,bonuslength,rigthslength} = this.state; 
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
                            <div className="mainTable board">
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
                                  {dividendlength>0 ?
                                    boardmeeting.map((value, index) => (
                                      <tr key={value.SRNO}>
                                        {Object.keys(boardmeetingobject).map(key =>
                                          key.toString()=='Source Date' || key.toString()=='Board Meeting Date' || key.toString()=='Details'?
                                            <td key={key.toString()}>{value[key]}</td>
                                          :null
                                        )}
                                      </tr>
                                    ))
                                  :<tr><td>Record Not Found!</td></tr>}

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
                                  {dividendlength>0 ?
                                      dividend.map((value, index) => (
                                        <tr key={value.SRNO}>
                                          {Object.keys(dividendobject).map(key =>
                                            key.toString()=='Dividend Date' || key.toString()=='Record Date' || key.toString()=='Dividend %' || key.toString()=='Interim / Final / Dividend'?
                                              <td key={key.toString()}>{value[key]}</td>
                                            :null
                                          )}
                                        </tr>
                                      ))
                                  :<tr><td>Record Not Found!</td></tr>}                                   
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
                                  {bonuslength>0 ?
                                      bonus.map((value, index) => (
                                        <tr key={index}>
                                          <td>{value.ex_date}</td>
                                          <td>{value.recrd_date}</td>
                                          <td>{value.premprice}</td>
                                          <td>{value.OFFERPRICE}</td>
                                          <td>{value.Details}</td>
                                        </tr>
                                      ))
                                  :<tr><td>Record Not Found!</td></tr>}
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
                                  {rigthslength>0 ?
                                    rigths.map((value, index) => (
                                      <tr key={index}>
                                        <td>{value.ex_date}</td>
                                        <td>{value.recrd_date}</td>
                                        <td>{value.premprice}</td>
                                        <td>{value.OFFERPRICE}</td>
                                        <td>{value.Details}</td>
                                      </tr>
                                    ))
                                  :<tr><td>Record Not Found!</td></tr>}
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