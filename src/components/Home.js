import React from 'react';
import Create from './Create'
import Participate from './Participate'
import {Link} from 'react-router-dom'
import './App.css'

function Home() {
  return (  
    <React.Fragment>    
      <div className="container">
      <div class="row">
        <div class="column">
        <Link to="/create">
          <center><Create /></center>
        </Link>
        </div>
        <div class="column">
        <Link to="/polls">
          <center><Participate /></center>
        </Link>
        </div>
      </div>       
      </div>
    </React.Fragment>
  );
}

export default Home;