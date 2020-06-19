import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import WeekCreate from './components/WeekCreate.component'
import LandingPage from './components/LandingPage.component'
import EmployeesPage from './components/EmployeesPage.component'
import Manager from './components/Manager.compoent'

function App() {
  return (
    <Router>
			<Route path="/" exact component={LandingPage} />
			<Route path="/create-week" exact component={WeekCreate} />
			<Route path="/employees" exact component={EmployeesPage} />
			<Route path="/week/:date" exact component={Manager} />
		</Router>
  );
}

export default App;
