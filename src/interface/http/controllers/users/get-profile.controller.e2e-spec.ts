import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('get profile controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      })

    const token = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@email.com',
        password: '123456',
      })

    const response = await request(app.server)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@email.com',
    })
  })
})
