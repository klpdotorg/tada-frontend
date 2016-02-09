import React from 'react';
import { render } from 'react-dom';
import { browserHistory, History, Router, Route, Link } from 'react-router';
import auth from './Auth';

const Login = React.createClass({
   mixins: [ History ],

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true })

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.history.replaceState(null, location.state.nextPathname)
        } else {
          this.history.replaceState(null, '/')
        }
      })
    },

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="tada@klp.org.in" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: tada)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      )
    }
})

module.exports = Login;