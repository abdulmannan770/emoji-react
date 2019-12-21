import React, { Component } from 'react';
import styles from './index.less';
import headerJson from './header.json';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            linkActive: '',
            renderData: {
                email: '',
                password: ''
            }
        }
    }

    onActiveHandler = (event) => {
        const { name = '' } = event.target;
        this.setState({
            linkActive: name
        })
    }

    onChnageHandler = (event) => {
        const { name = '', value = '' } = event.target;
        this.setState({
            [name]: value
        })
    }

    onSubmitHanlder = () => {

    }
    componentDidMount() {

    }

    render() {
        const { linkActive = '', email = '', password = '' } = this.state;
        console.log("this.state", this.state);
        return (
            <div className={styles.header_wrapper}>
                <nav className={`navbar navbar-inverse ${styles.navbar_wrapper}`} >
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">WebSiteName</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                {headerJson.map(data => {
                                    const { displayLabel = '' } = data;
                                    return <li className={linkActive.includes(displayLabel) ? "active" : ''}><a href="#" name={displayLabel} onClick={this.onActiveHandler}>{displayLabel}</a></li>
                                })}
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav >
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.onSubmitHanlder}>
                            <div class="form-group">
                                <label for="email">Email address:</label>
                                <input type="email" name="email" class="form-control" id="email" onChange={this.onChnageHandler} value={email} />
                            </div>
                            <div class="form-group">
                                <label for="pwd">Password:</label>
                                <input type="password" name="password" class="form-control" id="pwd" onChange={this.onChnageHandler} value={password} />
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" /> Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Header;