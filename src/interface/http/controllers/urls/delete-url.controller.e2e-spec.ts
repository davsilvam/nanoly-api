import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/interface/test/create-and-authenticate-user'

describe('delete url controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a url', async () => {
    const { userId, token } = await createAndAuthenticateUser()

    const shortenUrlResponse = await request(app.server)
      .post('/urls')
      .set('Authorization', `Bearer ${token}`)
      .send({
        long_url: 'https://google.com',
        short_url: 'google',
        user_id: userId,
      })

    const response = await request(app.server)
      .delete(`/urls/${shortenUrlResponse.body.url_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(204)
  })
})
