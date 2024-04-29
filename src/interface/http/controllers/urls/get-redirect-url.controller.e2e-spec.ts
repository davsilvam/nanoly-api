import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/interface/test/create-and-authenticate-user'

describe('get redirect url controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a redirect url', async () => {
    const { userId } = await createAndAuthenticateUser()

    await request(app.server)
      .post('/urls')
      .send({
        long_url: 'https://google.com',
        short_url: 'google',
        user_id: userId,
      })

    const response = await request(app.server)
      .get('/urls/google/redirect')
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      redirect_url: 'https://google.com',
    })
  })
})
