import bcrypt from 'bcrypt';

class BcryptPasswordHash {
    constructor(saltRound = 10) {
        this._saltRound = saltRound;
    }

    async hash(password) {
        return bcrypt.hash(password, this._saltRound);
    }

    async comparePassword (password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

export default BcryptPasswordHash;