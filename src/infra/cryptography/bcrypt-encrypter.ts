import bcrypt from 'bcrypt'

import type { Encrypter } from '../../application/use-cases/user/cryptography/encrypter'

export class BcryptEncrypter implements Encrypter {
  private SALT_ROUNDS = 6

  public async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.SALT_ROUNDS)
  }

  public async compare(data: string, encryptedData: string): Promise<boolean> {
    return bcrypt.compare(data, encryptedData)
  }
}
