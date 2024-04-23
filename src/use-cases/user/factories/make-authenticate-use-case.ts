import { PrismaUsersRepository } from '../../../repositories/user/prisma-users-repository'
import { BcryptEncrypter } from '../../../utils/bcrypt-encrypter'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const bcryptEncrypter = new BcryptEncrypter()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository, bcryptEncrypter)

  return authenticateUseCase
}
