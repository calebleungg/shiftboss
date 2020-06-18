import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import LandingPage from './components/LandingPage.component'

function App() {
  return (
    <Router>
			<Route path="/" exact component={LandingPage} />
		</Router>
  );
}

export default App;
