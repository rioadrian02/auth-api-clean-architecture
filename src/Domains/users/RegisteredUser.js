class RegisteredUser {
    constructor({ id, username, fullname }) {
        this._verifyPayload({ id, username, fullname });

        this.id = id;
        this.username = username;
        this.fullname = fullname;
    }

    _verifyPayload({ id, username, fullname }) {
        if(!id || !username || !fullname) {
            throw new Error('REGISTERED_USER.MISSING_REQUIRED_PROPERTY');
        }

        if(typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
            throw new Error('REGISTERED_USER.WRONG_DATA_TYPE');
        }
    }
}

export default RegisteredUser;