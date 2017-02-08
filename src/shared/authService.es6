// from https://auth0.com/docs/quickstart/spa/react/01-login
// and  https://auth0.com/docs/quickstart/spa/react/03-session-handling
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import { isTokenExpired } from './jwtHelper.es6'

export default class AuthService {
    constructor(clientId, domain) {
        // Configure Auth0
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
                redirectUrl: 'http://localhost:3000/',  // redirect after successful auth
                responseType: 'token',
                sso: false
            }
        })
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this))
        // binds login functions to keep this context
        this.login = this.login.bind(this)
    }

    _doAuthentication(authResult) {
        console.log("==== called _doAuthentication");
        // Saves the user token
        this.setToken(authResult.idToken)
        // navigate to the home route
        browserHistory.replace('/')
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show()
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        // return !!this.getToken()
        const token = this.getToken();
        return !!token && !isTokenExpired(token);
    }

    setToken(idToken) {
        // Saves user token to local storage
        console.log("==== setting token: ", idToken);
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from local storage
        localStorage.removeItem('id_token');
    }
}