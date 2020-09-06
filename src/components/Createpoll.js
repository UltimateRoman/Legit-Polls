import React, { Component } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001,protocol: 'https' })

class Createpoll extends Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          buffer: null,
          fhash: 'yh'
        };
    }
    
    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
        }
    }

    render() {  
      return (
          <div className="container-fluid mt-5">
          <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                    <form onSubmit={async(event) => {
                      event.preventDefault()
                      console.log("Submitting file to ipfs...")
                      await ipfs.add(this.state.buffer, (error, result) => {
                        console.log("IPFS: ",result)
                        if (this._isMounted) {
                          this.setState({
                            fhash: result[0].hash,
                          })
                        }
                        console.log(this.state.fhash)
                        if(error) {
                          console.error(error)
                          return
                        }
                      })
                      const title = this.ptitle.value
                      const option1 = this.poption1.value
                      const option2 = this.poption2.value
                      const detailsfile = this.state.fhash
                      this.props.createPoll(title, option1, option2, detailsfile)
                    }}>
                    <center>
                    <h1 style={{color: "royalblue"}}>Create your Poll</h1>
                    <div class="form-container">
                      <input
                        id="ptitle"
                        type="text"
                        ref={(input) => { this.ptitle = input }}
                        className="form-control"
                        placeholder="Enter Poll Title"
                        required />
                        <br/>
                    <input
                        id="poption1"
                        type="text"
                        ref={(input) => { this.poption1 = input }}
                        className="form-control"
                        placeholder="Enter Option 1"
                        required />
                        <br/>
                    <input
                        id="poption2"
                        type="text"
                        ref={(input) => { this.poption2 = input }}
                        className="form-control"
                        placeholder="Enter Option 2" 
                        required />
                        <br/>
                    <span>Upload a relevant document</span><input type='file' onChange={this.captureFile} required/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-outline-info">Create Poll</button>
                    </center>
                  </form>
                </div>
              </main>
            </div>
          </div>
        );
      }
}

export default Createpoll;