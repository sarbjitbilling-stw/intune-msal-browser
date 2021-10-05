import React, {Component} from 'react';
import Authorisation from './Authorization';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            username: null,
            name: null
        };

        this.maybeLoggedIn = this.maybeLoggedIn.bind(this);
        this.testLoggedIn = this.testLoggedIn.bind(this);
        this.maybeLoggedOut = this.maybeLoggedOut.bind(this);

        this.authorisation = new Authorisation(props.msal, this.maybeLoggedIn, this.maybeLoggedOut);
    }

    maybeLoggedIn() {
        this.retry = 0;

        this.testLoggedIn();
    }

    //
    // makes recursive calls.
    //
    testLoggedIn() {
        if (this.authorisation.isUserLoggedIn()) {
            console.log('testLoggedIn, user logged in');
            this.setState({isLoggedIn: true});
            this.setState({userDetails: true});

        }
        else {
            console.log('testLoggedIn, user not yes logged in, delay and retest');
            this.retry++;
            if (this.retry <= 10) {
                setTimeout(this.testLoggedIn, 1000);
            }
            else {
                console.log('testLoggedIn, failed to login after several attempts');
            }
        }
    }

    handleLogin() {
        this.authorisation.loginPopup()
            .then(() => {
                this.authorisation.getUserDetails()
                    .then((result) => {
                        this.authorisation.loginComplete();
                        this.setState({
                            username: result.username,
                            name: result.name
                        });
                    })
                    .catch((error) => {
                        console.warn('get user details failed', error)
                    });

            });
    }

    handleLogout() {
        this.authorisation.logout();
    }

    maybeLoggedOut() {
    }

    render() {
        return (
            <div>
                {!this.state.isLoggedIn &&
                <button onClick={() => {
                    this.handleLogin()
                }}>login</button>
                }

                <br/>

                {this.state.isLoggedIn &&
                <button onClick={() => {
                    this.handleLogout()
                }}>logout</button>
                }

                <br/>

                {this.state.isLoggedIn && (
                    <div>
                        logged in
                        <br/>
                        username: {this.state.username}
                        <br/>
                        name: {this.state.name}
                    </div>
                )}

                <br/>

                {!this.state.isLoggedIn &&
                <div>not logged in</div>
                }
            </div>
        );
    }
}

export default App;