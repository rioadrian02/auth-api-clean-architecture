import UpdateFullname from '../../Domains/users/UpdateFullname.js';

class UpdateFullnameUseCase{
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async execute(useCasePayload, useCaseParams) {
        const { id } = useCaseParams;

        const updateFullname = new UpdateFullname(useCasePayload);

        const user = await this._userRepository.updateFullnameById(id, updateFullname.fullname);

        return user;
    }
}

export default UpdateFullnameUseCase;