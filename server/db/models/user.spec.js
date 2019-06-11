/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let audra

      beforeEach(async () => {
        audra = await User.create({
          firstName: 'Audra',
          lastName: 'Kenney',
          email: 'audrakkenney@gmail.com',
          password: 'happy',
          address: '123 Main St'
        })
      })

      it('returns true if the password is correct', () => {
        expect(audra.correctPassword('happy')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(audra.correctPassword('happiest')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
