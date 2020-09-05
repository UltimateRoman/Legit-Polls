import React from 'react';
import Create from './Create'
import Participate from './Participate'
import {Link} from 'react-router-dom'
import './App.css';

function Home() {
  return (      
      <div className="container">
      
      <NavBar />
      <div class="row">
        <div class="column">
          <Link to="/create">
            <Create />
          </Link>
        </div>
        <div class="column">
          <Link to="/polls">
            <Participate />
          </Link>
        </div>
      </div>       
      </div>
    
  );
}

export default Home;
