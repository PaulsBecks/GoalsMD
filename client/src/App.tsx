import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Goals from './pages/Goals'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'

import 'materialize-css/dist/css/materialize.css'
import './App.css'

import { fetchUser } from './store/apiCalls'

interface AppProps {
  fetchUser: () => any
  loggedIn: boolean
  auth: any
}

class App extends Component<AppProps> {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <div style={{ paddingTop: '65px' }}>
              <div>{this.props.loggedIn ? <Goals /> : <Home />}</div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(
  (state: any, ownProps: any) => {
    return {
      auth: state.auth,
      loggedIn: Object.keys(state.auth).length !== 0,
    }
  },
  { fetchUser }
)(App)
