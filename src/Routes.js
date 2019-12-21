import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home';
import App from './App';
import Demo from './Demo';
import Test from './Test';
import Notfound from './notfound'

const Routes = () => (
	<Router>
		<div>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/app/:fincode' component={App} />
				<Route path='/Demo/:fincode' component={Demo} />
				<Route path='/Test/:fincode' component={Test} />
	        	<Route component={Notfound} />
        	</Switch>
		</div>
	</Router>
)
export default Routes;