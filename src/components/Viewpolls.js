import React, { Component } from 'react';

class Viewpolls extends Component {
    constructor() {
        super();
        this.state = {
          search: ''
        };
      }
    
      updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
      }
    
      render() {
        let filteredPolls = this.props.polls.filter(
          (poll) => {
            return poll.title.indexOf(this.state.search) !== -1;
          }
        );
  
      return (
          <div className="container-fluid mt-5">
          <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                <div className="content mr-auto ml-auto">
                  <h1>Search and Vote in Polls</h1>
                  <input type="text" class="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                  <p>&nbsp;</p>
                  { filteredPolls.map((poll, key) => {
                    return(
                      <div class="coupon" key={key} >
                        <div className="card-header">
                        <h3>{poll.title}</h3>
                        <br/>
                        <p>{poll.option1}: {poll.vote1}</p>
                        <p>{poll.option2}: {poll.vote2}</p>
                        <br/>
                        <small>Creator: {poll.creator}</small>
                        </div>
                        <ul id="postList" className="list-group list-group-flush">
                          <li key={key} className="list-group-item py-2">   
                            <button
                              type="submit"
                              className="btn btn-info"
                              name={poll.id}
                              onSubmit={(event) => {
                                this.props.votePoll(event.target.name, 1)
                              }}>
                              Vote
                            </button>
                          </li>
                        
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </main>
            </div>
          </div>
        );
      }
}

export default Viewpolls;