import React from 'react';
import './styles/__main.sass';
import Nav from "./components/nav";
import Home from "./views/home";
import Record from "./views/record";
import Score from "./views/score";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="App-content">
						<Route path="/" exact component={Home} />
						<Route path="/record/:id" exact component={Record} />
						<Route path="/records" exact component={Score} />
					</div>
					<Nav/>
				</div>
			</Router>
		);
	}
}
