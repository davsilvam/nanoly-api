import { describe, expect, it } from 'vitest'

import { User } from './user.entity'

describe('user Entity', () => {
  it('should be able to create a user entity', () => {
    const user = new User({
      name: 'name',
      email: 'email',
      passwordHash: 'password-hash',
    })

    expect(user).toBeInstanceOf(User)
  })

  it('should be not able to create a user entity with no name', () => {
    expect(() => {
      return new User({
        name: '',
        email: 'email',
        passwordHash: 'password-hash',
      })
    }).toThrow()
  })

  it('should be not able to create a user entity with no email', () => {
    expect(() => {
      return new User({
        name: 'name',
        email: '',
        passwordHash: 'password-hash',
      })
    }).toThrow()
  })

  it('should be not able to create a user entity with no passwordHash', () => {
    expect(() => {
      return new User({
        name: 'name',
        email: 'email',
        passwordHash: '',
      })
    }).toThrow()
  })
})
