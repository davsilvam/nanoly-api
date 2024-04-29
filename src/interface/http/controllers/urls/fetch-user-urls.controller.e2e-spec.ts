import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/interface/test/create-and-authenticate-user'

describe('fetch user urls controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch user urls', async () => {
    const { userId, token } = await createAndAuthenticateUser()

    await request(app.server)
      .post('/urls')
      .send({
        long_url: 'https://google.com',
        short_url: 'google',
        user_id: userId,
      })

    const response = await request(app.server)
      .get('/users/profile/urls')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject([
      {
        id: expect.any(String),
        long_url: 'https://google.com',
        short_url: 'google',
        clicks_count: 0,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        user_id: userId,
      },
    ])
  })
})
