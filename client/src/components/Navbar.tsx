import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import M from 'materialize-css'
import {
  GoogleLoginButton,
  GithubLoginButton,
  BitbucketLoginButton,
} from 'react-social-login-buttons'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

type PropsType = RouteComponentProps & {
  readonly auth: Object
}

class Navbar extends React.Component<PropsType> {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      M.Modal.init(elems, {})
    })
  }

  logout() {
    window.location.href = '/api/logout'
  }

  render() {
    const loggedIn = Object.keys(this.props.auth).length !== 0
    return (
      <div>
        <nav>
          <div className="nav-wrapper container" style={{ zIndex: 10 }}>
            <Link to="/" className="brand-logo center">
              GoalMD
            </Link>

            {!loggedIn && (
              <ul id="nav-mobile" className="right">
                <li>
                  <button data-target="modal1" className="btn modal-trigger">
                    Login
                  </button>
                </li>
              </ul>
            )}
            {loggedIn && (
              <ul id="nav-mobile" className="right">
                <li style={{ marginLeft: '1vw' }}>
                  <button className="btn" onClick={() => this.logout()}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div className="row">
          <div className="col s12 m8 l6">
            <div id="modal1" className="modal login">
              <div className="modal-content">
                <GoogleLoginButton
                  onClick={() => {
                    window.location.href = '/auth/google'
                  }}
                />
                <GithubLoginButton
                  onClick={() => {
                    window.location.href = '/auth/github'
                  }}
                />
                <BitbucketLoginButton
                  onClick={() => {
                    window.location.href = '/auth/bitbucket'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    auth: state.auth,
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))
