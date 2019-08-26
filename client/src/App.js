import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import TopBar from './components/TopBar';
import LivePage from './components/LivePage';
import LandingPage from './components/LandingPage';
import AnomalyPage from './components/AnomalyPage';
import HistoryPage from './components/HistoryPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  
  render() {
    return (
      <Router>
        <TopBar></TopBar>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/live" component={LivePage}/>
        <Route path="/anomalies" component={AnomalyPage}/>
        <Route path="/historical" component={HistoryPage}/>
      </Router>
    );
  }
}

export default App;
