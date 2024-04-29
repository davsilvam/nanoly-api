import request from 'supertest'

import { app } from '@/app'

export async function createAndAuthenticateUser() {
  await request(app.server)
    .post('/users')
    .send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

  const response = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johndoe@email.com',
      password: '123456',
    })

  return {
    token: response.body.token,
  }
}
