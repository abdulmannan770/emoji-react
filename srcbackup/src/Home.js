import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class Home extends Component{
  constructor(){
      super()
      this.state = {
        results: [],
        display: {
          display: 'none'
        }
      }
      this.onChangeHadler = this.onChangeHadler.bind(this);
  }
  onClickSearchHadler(FINCODE){   
      window.location.href="/app/"+FINCODE;
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
    render(){
      return(
          <div>
            
            <div>
            <div id="wrapper">






              <div className="serchDiv">
                <div className="container">
                  <p className="mainLogo">
                    <img src="img/logo.png" alt="logo" />
                  </p>

                  <form>
                    <div className="searchDiv">
                    <input type="text" name="search" placeholder="Search Stock" value={this.state.search} onChange={this.onChangeHadler} autoComplete="off" />
                      <ul className="companyList" style={this.state.display}>
                      {
                        this.state.results.map(company => (
                          <li onClick={() => this.onClickSearchHadler(company.FINCODE)}>
                             {company.compname}
                          </li>
                        ))
                      }
                      </ul>
             
                    </div>
                  </form>




                  <div className="recentPost">
                    <div className="recent">
                      <ul>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="recentIn">
                            <span>
                              <img src="img/logo.png" alt="logo" />
                            </span>
                            <h2>Stock Broker....</h2>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>    
            </div>

          </div>

          </div>
        );
    }
}


export default Home;
