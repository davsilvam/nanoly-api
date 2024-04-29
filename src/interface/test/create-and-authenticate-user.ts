import request from 'supertest'

import { app } from '@/app'

export async function createAndAuthenticateUser() {
  const registerResponse = await request(app.server)
    .post('/users')
    .send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

  const authenticationResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johndoe@email.com',
      password: '123456',
    })

  return {
    userId: registerResponse.body.user_id,
    token: authenticationResponse.body.token,
  }
}
