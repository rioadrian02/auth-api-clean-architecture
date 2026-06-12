class DetailUserUseCase {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async execute(data) {
        const { id } = data;

        return await this._userRepository.getUserById(id);
    }
}

export default DetailUserUseCase;