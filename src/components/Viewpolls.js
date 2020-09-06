import React, { Component } from 'react';

class Viewpolls extends Component {
    constructor() {
        super();
        this.state = {
          search: '',
          selectedOption: 1
        };
        this.onValueChange = this.onValueChange.bind(this);
      }
    
      updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
      }

      onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });
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
                          {console.log(poll)}
                        <h3>{poll.title}</h3>
                        <br/>
                        <a href={`https://ipfs.infura.io/ipfs/${poll.detailsfile}`} target="_blank">File</a>
                        <br/>
                        <small>Creator: {poll.creator}</small>
                        </div>
                        <form>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              value="1"
                              checked={this.state.selectedOption === "1"}
                              onChange={this.onValueChange}
                            />
                            {poll.option1} : {poll.votes1.toString()} votes
                          </label>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              value="2"
                              checked={this.state.selectedOption === "2"}
                              onChange={this.onValueChange}
                            />
                            {poll.option2} : {poll.votes2.toString()} votes
                          </label>
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div>
                          Selected option is : {this.state.selectedOption}
                        </div>
                        <center>
                        <button
                              type="submit"
                              className="btn btn-info"
                              name={poll.id}                                
                              onClick={(event) => {
                                this.props.votePoll(event.target.name, this.state.selectedOption)
                              }}>
                              Vote
                        </button>
                        </center>
                      </form>
                        <ul id="postList" className="list-group list-group-flush">
                          <li key={key} className="list-group-item py-2">   
                            
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