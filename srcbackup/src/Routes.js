import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home';
import App from './App';
import Notfound from './notfound'

const Routes = () => (
	<Router>
		<div>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/app/:fincode' component={App} />
	        	<Route component={Notfound} />
        	</Switch>
		</div>
	</Router>
)
export default Routes;