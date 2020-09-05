import React, { Component } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001,protocol: 'https' })

class Createpoll extends Component {

    constructor(props) {
        super(props);
        this.state = {
          buffer: null,
          fhash: ''
        };
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
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      console.log("Submitting file to ipfs...")
                      ipfs.add(this.state.buffer, (error, result) => {
                        console.log('IPFS result', result)
                        const fhash = result[0].hash
                        this.setState({ fhash })
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
                    <h1>Create your Poll</h1>
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
                        placeholder="Enter Option 2" />
                        <br/>
                    <span>Choose suitable file</span><input type='file' onChange={this.captureFile}/>
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