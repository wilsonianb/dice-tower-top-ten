import assert from 'assert'
import 'sails-test-helper'

describe('Games', () => {

  before(async() => {
    await database.Games.truncate({cascade: true})
  });

  afterEach(async() => {
    await database.Games.truncate({cascade: true})
  });

  it('.create should insert a game', async() => {

    const name = 'Pandemic'
    const game = await database.Games.create({
      name: name,
      url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
    })
    assert.strictEqual(game.name, name)
  })

  it('.create should require a name',done => {

    database.Games.create({
      url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "name" violates not-null constraint')
      done()
    })
  })

  it('.create should require name to be unique',done => {

    database.Games.create({
      name: 'Pandemic',
      url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
    })
    .then(() => {
      return database.Games.create({
        name: 'Pandemic',
        url: 'https://boardgamegeek.com/boardgame/150658/pandemic-cure'
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

    database.Games.create({
      name: 'Pandemic',
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "url" violates not-null constraint')
      done()
    })
  })

  it('.create should require url to be unique',done => {

    database.Games.create({
      name: 'Pandemic',
      url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
    })
    .then(() => {
      return database.Games.create({
        name: 'Pandemic: The Cure',
        url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
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

