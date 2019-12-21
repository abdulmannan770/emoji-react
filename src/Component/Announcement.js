import React, { Component } from 'react';
/*import { Link } from 'react-router-dom';*/
import axios from 'axios';
class Announcement extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      announcement:[],
	    }
  	}
  	//UNSAFE_componentWillMount () {
    componentDidMount() {
	    var  fincode = this.props.fincode;
      this.getAnnouncement(fincode);
    }
	    /*************Get Balancesheet*******************/
    getAnnouncement = async (fincode) => {
      await axios.get(`http://172.104.5.85:3000/announcement/`+fincode, {
	        headers: new Headers({"Content-Type": "application/json"}),
	    }).then(responseText => {
	        var data = responseText.data;
          //console.log(data);
	        if(data.Table.length>0){
	          this.setState({
               announcement:data.Table,      
	          })
	        }
	    });
	}
	render(){
		const {announcement} = this.state;    
		return(
			       <div className="announcement">
              <div className="mainContainer">
                <div className="announcementIn">
                  <h2 className="mainHead">ANNOUNCEMENTS <span></span></h2>
                  {announcement.map((value, index) => (
                    index=='1' ?
                    <div key={index} className="announceBack">
                      <h2 className="announceHead">{value.Heading}</h2>
                      <span className="announceDate">{value.Newsdate} | Source : BSE</span>
                      <p className="announceParagraph">{value.Details}</p>
                    </div>
                    :index=='0' ||index=='2' ?
                    <div key={index} className="compile">
                      <h2 className="announceHead">{value.Heading}</h2>
                      <span className="announceDate">{value.Newsdate} | Source : BSE</span>
                      <p className="announceParagraph">{value.Details}</p>
                    </div>
                    :null
                  ))}
                </div>
              </div>
            </div>
       	)
	}
}

export default Announcement;