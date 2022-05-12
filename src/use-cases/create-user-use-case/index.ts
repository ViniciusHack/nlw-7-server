import { UsersRepository } from "../../repositories/users-repository";


interface CreateUserUseCaseRequest {
  name: string;
  imageURL: string;
  email: string;
  uid: string;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: UsersRepository
  )
  {}

  async execute({ name, imageURL, email, uid }: CreateUserUseCaseRequest) {
    const result = await this.userRepository.create({ name, imageURL, email, uid });

    return result;
  }
}
