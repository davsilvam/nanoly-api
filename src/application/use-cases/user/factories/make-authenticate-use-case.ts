import { BcryptEncrypter } from '../../../../infra/cryptography/bcrypt-encrypter'
import { PrismaUsersRepository } from '../../../../infra/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const bcryptEncrypter = new BcryptEncrypter()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository, bcryptEncrypter)

  return authenticateUseCase
}
