import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/interface/test/create-and-authenticate-user'

describe('find url by id controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a url by id', async () => {
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
      .get(`/urls/${shortenUrlResponse.body.url_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      id: shortenUrlResponse.body.url_id,
      long_url: 'https://google.com',
      short_url: 'google',
      clicks_count: 0,
      updated_at: expect.any(String),
      created_at: expect.any(String),
      user_id: userId,
    })
  })
})
