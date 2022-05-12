import { User } from "@prisma/client";

export interface UsersRepositoryData {
  name: string;
  email: string;
  imageURL: string;
  uid: string;
}

export interface UsersRepository {
  create: (data: UsersRepositoryData) => void;
  findByEmail: (email: string) => Promise<User | null >;
}