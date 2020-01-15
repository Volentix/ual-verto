const { Volentix } = require('./volentix')

test('Sanity Check', () => {
  expect(true).toBe(true)
})

test('Make sure were exporting things', () => {
  expect(Volentix).toBeDefined()
});