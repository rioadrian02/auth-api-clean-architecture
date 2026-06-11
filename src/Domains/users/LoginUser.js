class LoginUser {
    constructor({ username, password }) {
        this._verifyPayload({ username, password });

        this.username = username;
        this.password = password;
    }

    _verifyPayload({ username, password }) {
        if(!username || !password) {
            throw new Error('LOGIN_USER.MISSING_REQUIRED_PROPERTY');
        }

        if(typeof username !== 'string' || typeof password !== 'string') {
            throw new Error('LOGIN_USER.WRONG_DATA_TYPE');
        }
    }
}

export default LoginUser;