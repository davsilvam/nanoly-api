import { Url } from './url'
import type { CreateUrlRequest } from '../../repositories/url/url-repository'

export class UrlMapper {
  static toEntity({ shortUrl, longUrl, userId }: CreateUrlRequest): Url {
    return new Url({
      shortUrl,
      longUrl,
      userId,
    })
  }
}
