class UpdateFullname{
    constructor({ fullname }) {
        this._verifyFullname(fullname);

        this.fullname = fullname;
    }

    _verifyFullname(fullname) {
        if(!fullname) {
            throw new Error('UPDATE_FULLNAME.MISSING_REQUIRED_PROPERTY');
        }

        if(typeof fullname !== 'string') {
            throw new Error('UPDATE_FULLNAME.WRONG_DATA_TYPE');
        }
    }
}

export default UpdateFullname;