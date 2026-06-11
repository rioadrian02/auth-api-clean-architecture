import RegisterUser from "../../Domains/users/RegisterUser.js";

class AddUserUseCase {
    constructor({ userRepository, passwordHash }) {
        this._userRepository = userRepository;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload) {
        // validasi data menggunakan Domain
        const registerUser = new RegisterUser(useCasePayload);

        // cek apaka username sudah dipakai
        await this._userRepository.verifyAvailableUsername(registerUser.username);

        // hash password
        const hashedPassword = await this._passwordHash.hash(registerUser.password);

        // simpan ke database
        const registeredUser = await this._userRepository.addUser({
            username: registerUser.username,
            password: hashedPassword,
            fullname: registerUser.fullname
        });

        return registeredUser;
    }
}

export default AddUserUseCase;