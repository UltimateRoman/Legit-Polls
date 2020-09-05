import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Web3 from 'web3';
import Legitpolls from '../abis/Legitpolls.json';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Createpoll from './Createpoll';
import Viewpolls from './Viewpolls';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should use the MetaMask extension!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Legitpolls.networks[networkId]
    if(networkData) {
      const lps = web3.eth.Contract(Legitpolls.abi, networkData.address)
      this.setState({ lps })
      const pCount = await lps.methods.pCount().call()
      this.setState({ pCount })
      for (var i = 1; i <= pCount; i++) {
        const poll = await lps.methods.polls(i).call()
        this.setState({
          polls: [...this.state.polls, poll]
        })
      }
    this.setState({ loading: false})
    } else {
      window.alert('The forum contract could not be deployed to network')
    }
  }

  createPoll(title, option1, option2, detailsfile) {
    this.setState({ loading: true })
    this.state.lps.methods.createPoll(title, option1, option2, detailsfile).send({ from: this.state.account }).once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.pathname = '/polls'  
    })
  }

  votePoll(id, option) {
    this.setState({ loading: true })
    this.state.lps.methods.votePoll(id, option).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      lps: null,
      pCount: 0,
      polls: [],
      loading: true
    }
    this.createPoll = this.createPoll.bind(this)
    this.votePoll = this.votePoll.bind(this)
  }

  render() {
    return (
      <Router>   
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/create" render={props => (
          <React.Fragment>
            { this.state.loading
            ? <center><br/><br/><br/><br/><br/><br/><div class="loader"></div></center>
            : <Createpoll
              createPoll={this.createPoll}
            />
            }
          </React.Fragment>
        )} />
        <Route exact path="/polls" render={props => (
          <React.Fragment>
            { this.state.loading
            ? <center><br/><br/><br/><br/><br/><br/><div class="loader"></div></center>
            : <Viewpolls
              polls={this.state.polls}
              votePoll={this.votePoll}
            />
            }
          </React.Fragment>
        )} />
        <Footer />
      </Router>
    );
  }
}

export default App;
