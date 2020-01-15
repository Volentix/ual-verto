const { VolentixUser, VolentixAuthenticator } = require('./index')

test('Sanity Check', () => {
  expect(true).toBe(true)
})

test('Make sure were exporting things', () => {
  expect(VolentixUser).toBeDefined()
  expect(VolentixAuthenticator).toBeDefined()
});