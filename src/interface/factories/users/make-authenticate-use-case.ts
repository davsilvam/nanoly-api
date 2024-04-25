import { AuthenticateUseCase } from '../../../application/use-cases/user/authenticate'
import { BcryptEncrypter } from '../../../infra/cryptography/bcrypt-encrypter'
import { PrismaUsersRepository } from '../../../infra/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const bcryptEncrypter = new BcryptEncrypter()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository, bcryptEncrypter)

  return authenticateUseCase
}
