import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import TopBar from './components/TopBar';
import LivePage from './components/LivePage';
import LoginPage from './components/LoginPage';
import AnomalyPage from './components/AnomalyPage';
import HistoryPage from './components/HistoryPage';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends React.Component {
  
  render() {
    return (
      <Router>
        

        <Route path="/" render={() => localStorage.getItem("token") ? <TopBar auth={true}/> : <TopBar auth={false}/>}/>
        <Route exact path="/" render={() => localStorage.getItem("token") ? <Redirect to="/live"/> : <Redirect to="/login"/>}/>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/live" component={LivePage}/>
        <PrivateRoute path="/anomalies" component={AnomalyPage}/>
        <PrivateRoute path="/historical" component={HistoryPage}/>
      </Router>
    );
  }
}

export default App;
