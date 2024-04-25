import { BcryptEncrypter } from '../../../../infra/cryptography/bcrypt-encrypter'
import { PrismaUsersRepository } from '../../../../infra/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const bcryptEncrypter = new BcryptEncrypter()
  const registerUseCase = new RegisterUseCase(usersRepository, bcryptEncrypter)

  return registerUseCase
}
