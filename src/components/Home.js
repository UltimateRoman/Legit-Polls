import React from 'react';
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Create from './components/Create'
import Poll from './Poll'
import Participate from './components/Participate'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import cr from './ChooseOption';

function App() {
  return (
    <Router>
      
      <div className="container">
      
      <NavBar />
      <div class="row">
        <div class="column">
          <Create />
        </div>
        <div class="column">
          <Participate />
            
        </div>
        </div>
        <Route path="/poll" exact component={Poll} />
        <Route path="/cr" exact component={cr} />
       
        <Footer />
      </div>
      
    </Router>
    
  );
}

export default App;
