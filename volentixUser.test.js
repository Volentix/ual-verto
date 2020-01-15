const { VolentixUser } = require('./volentixUser')

test('Sanity Check', () => {
  expect(true).toBe(true)
})

test('Make sure were exporting things', () => {
  expect(VolentixUser).toBeDefined()
});