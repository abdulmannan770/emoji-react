import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Header extends Component {
	constructor(){
	    super()
	    this.state = {
	      results: [],
	      display: {
	      	display: 'none'
	      }
	    }
	}
 	onChangeHadler(e){
 		let successArry = this.state.display;
	    if (e.target.value && e.target.value.length > 1) {
	       axios.get("http://172.104.5.85:3000/searchcompany/"+e.target.value, {
	          headers: new Headers({
	            "Content-Type": "application/json", // <-- Specifying the Content-Type
	          }),
	        }).then(responseText => {
	            var data = responseText.data;
	            this.setState({
	               results: data
	            })
	        }).catch(function (error) {});	    		    
			successArry = {
				display: 'block'
			}
			this.setState({
				display: successArry
			})
		}else{
			successArry = {
				display: 'none'
			}
			this.setState({
				display: successArry
			})
		}
  	}
  	onClickSearchHadler(FINCODE){   
	    window.location.href="./"+FINCODE;
	}
	render(){
		var serachlist =this.state.results.map((value, index) => (
	        <li key={value.FINCODE}><Link to={`/app/${value.FINCODE}`}>{value.compname}</Link></li>
      	));
		return	<header>
				    <div id="header" className="clearfix">
				      	<div id="headerIn" className="clearfix">
					        <h1 id="headerLogo">
					          <Link to="index.html" className="op">
					            <img src="/img/logo.png" alt=""/>
					          </Link>
					        </h1>
					        <div id="headerLinks">
					          <div className="headerSearch">
					            <form>
					            	<div className="searchDiv mt00">
						              <i className="fa fa-search"></i>
						              <input type="text" name="query" id="query" placeholder="Search Stock" value={this.state.query}  onChange={this.onChangeHadler.bind(this)} autoComplete="off"/>
				                      <ul className="downshift-dropdown companyList" style={this.state.display}>
				                        {serachlist}
				                      </ul>
				                    </div>
					            </form>
					          </div>					          
					          <p className="navbarToggle visibleTS" data-target=".navbarCollapse"><img src="" alt=""/></p>
					        </div>
					    </div>
					    <nav id="gNavi">
					        <ul className="clearfix">
					          <li><Link to="#">Screener</Link></li>
					          <li><Link to="#">Portfolio</Link></li>
					          <li><Link to="#">About Us</Link></li>
					          <li><Link to="#">Contact Us</Link></li>
					          <li><Link to="#">Username</Link></li>
					          <li className="userImg">
					            <a href="#" className="navbarToggle" data-target=".userDrop">
					              <img src="/img/img_user.png" alt="User" />
					            </a>
					            <div className="userDrop" style={{display: 'none'}}>
					              <Link to="#">My Profile</Link>
					              <Link to="#">My Account</Link>
					              <Link to="#">Logout</Link>
					            </div>				            
					          </li>
					        </ul>
					    </nav>
					</div>
				</header>
	}
}

export default Header;