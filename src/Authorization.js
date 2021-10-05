class Authorization {
    constructor(msal, signalLoggedComplete, signalLogoutComplete) {
        this.msal = msal;
        this.isLoggedIn = false;
        this.signalLoginComplete = signalLoggedComplete;
        this.signalLogoutComplete = signalLogoutComplete;
    }

    loginPopup() {
        return this.msal.loginPopup({
            scopes: []
        });
    }

    getUserDetails() {
        return new Promise((resolve, reject) => {
            let allAccounts = this.msal.getAllAccounts();

            if (allAccounts === null || typeof (allAccounts) === 'undefined') {
                reject('NO ACCOUNT');
            }
            else if (allAccounts.length > 1) {
                console.warn('multiple accounts', allAccounts);
                const foundUser = this.msal.getAccountByUsername('someusername');
                this.username = foundUser.username;
                this.name = foundUser.name;

                resolve();
            }
            else if (allAccounts.length === 1) {
                let account = allAccounts[0];
                console.log('found single account', JSON.stringify(allAccounts));
                this.username = account.username;
                this.name = account.name;

                resolve({
                    username: account.username,
                    name: account.name
                });
            }
            else {
                console.error('all account', JSON.stringify(allAccounts));
                reject('UNEXPECTED ERROR');
            }
        });
    }

    loginComplete() {
        this.isLoggedIn = true;
        this.signalLoginComplete();
    }

    logout() {
        this.msal.logout();
        this.isLoggedIn = false;
        this.signalLogoutComplete();
    }

    isUserLoggedIn() {
        return this.isLoggedIn && typeof (this.username) !== 'undefined';
    }
}

export default Authorization;