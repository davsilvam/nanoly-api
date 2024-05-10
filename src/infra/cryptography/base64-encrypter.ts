/* eslint-disable node/prefer-global/buffer */
import type { Encrypter } from '@/application/use-cases/user/cryptography/encrypter'

export class Base64Encrypter implements Encrypter {
  public async hash(data: string): Promise<string> {
    return Buffer.from(data, 'base64').toString()
  }

  public async compare(data: string, encryptedData: string): Promise<boolean> {
    return Buffer.from(data, 'base64').toString() === encryptedData
  }
}
