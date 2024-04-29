import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/interface/test/create-and-authenticate-user'

describe('shorten url controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to shorten a url', async () => {
    const { userId } = await createAndAuthenticateUser()

    const response = await request(app.server)
      .post('/urls')
      .send({
        long_url: 'https://google.com',
        short_url: 'google',
        user_id: userId,
      })

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      url_id: expect.any(String),
    })
  })
})
