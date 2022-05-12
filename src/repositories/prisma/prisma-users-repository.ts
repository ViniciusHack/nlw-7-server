
import { prisma } from "../../prisma";
import { UsersRepository, UsersRepositoryData } from "../users-repository";



export class PrismaUsersRepository implements UsersRepository {
  async create(data: UsersRepositoryData) {

    const userAlreadyExists = await this.findByEmail(data.email)

    if(userAlreadyExists) return;

    const user = await prisma.user.create({
      data: {
        ...data,
      }
    })
    return user;
  }
  
  async findByEmail(email: string) {
    const userExists = await prisma.user.findFirst({where: {
      email,
    }})
    
    return userExists;
  }
}