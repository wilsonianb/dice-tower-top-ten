import assert from 'assert'
import 'sails-test-helper'

describe('Lists', () => {

  before(async() => {
    await database.Lists.truncate({cascade: true})
  });

  afterEach(async() => {
    await database.Lists.truncate({cascade: true})
  });

  it('.create should insert a list', async() => {

    const name = 'Top Ten Dice Games'
    const list = await database.Lists.create({
      name: name,
      url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
    })
    assert.strictEqual(list.name, name)
  })

  it('.create should require a name',done => {

    database.Lists.create({
      url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "name" violates not-null constraint')
      done()
    })
  })

  it('.create should require name to be unique',done => {

    database.Lists.create({
      name: 'Top Ten Dice Games',
      url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
    })
    .then(() => {
      return database.Lists.create({
        name: 'Top Ten Dice Games',
        url: 'https://www.youtube.com/watch?v=ziL905aXGnE'
      })
    })
    .then(game => {
      expect(game).to.not.exist;
      done()
    })
    .catch(err => {
      assert.strictEqual(err.message, 'Validation error')
      done()
    })
  })

  it('.create should require a url',done => {

    database.Lists.create({
      name: 'Top Ten Dice Games',
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "url" violates not-null constraint')
      done()
    })
  })

  it('.create should require url to be unique',done => {

    database.Lists.create({
      name: 'Top Ten Dice Games',
      url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
    })
    .then(() => {
      return database.Lists.create({
        name: 'Top Ten Cooperative Games',
        url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
      })
    })
    .then(game => {
      expect(game).to.not.exist;
      done()
    })
    .catch(err => {
      assert.strictEqual(err.message, 'Validation error')
      done()
    })
  })
})

