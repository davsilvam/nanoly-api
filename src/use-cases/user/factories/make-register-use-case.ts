import { PrismaUsersRepository } from '../../../repositories/user/prisma-users-repository'
import { BcryptEncrypter } from '../../../utils/bcrypt-encrypter'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const bcryptEncrypter = new BcryptEncrypter()
  const registerUseCase = new RegisterUseCase(usersRepository, bcryptEncrypter)

  return registerUseCase
}
