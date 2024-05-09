import { RegisterUseCase } from '@/application/use-cases/user/register'
import { BcryptEncrypter } from '@/infra/cryptography/bcrypt-encrypter'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const bcryptEncrypter = new BcryptEncrypter()
  const registerUseCase = new RegisterUseCase(usersRepository, bcryptEncrypter)

  return registerUseCase
}
