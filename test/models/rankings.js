import assert from 'assert'
import 'sails-test-helper'

describe('Rankings', () => {

  let game, list

  before(async() => {
    await database.Rankings.truncate({cascade: true})
    await database.Lists.truncate({cascade: true})
    await database.Games.truncate({cascade: true})

    game = await database.Games.create({
      name: 'Pandemic',
      url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
    })
    list = await database.Lists.create({
      name: 'Top Ten Co-op Games',
      url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
    })
  });

  afterEach(async () => {
    await database.Rankings.truncate({cascade: true})
    await database.Lists.truncate({cascade: true})
    await database.Games.truncate({cascade: true})    
  });

  it('.create should insert a ranking', async() => {

    const ranking = await database.Rankings.create({
      game_id: game.id,
      list_id: list.id,
      rank: 1,
      start_time: '2m50s'
    })
    assert.strictEqual(ranking.game_id, game.id)
    assert.strictEqual(ranking.list_id, list.id)
  })

  it('.create should require a game_id',done => {

    database.Rankings.create({
      list_id: 1,
      rank: 1,
      start_time: '2m50s'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "game_id" violates not-null constraint')
      done()
    })
  })

  it('.create should require a list_id',done => {

    database.Rankings.create({
      game_id: 1,
      rank: 1,
      start_time: '2m50s'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "list_id" violates not-null constraint')
      done()
    })
  })

  it('.create should require a rank',done => {

    database.Rankings.create({
      game_id: 1,
      list_id: 1,
      start_time: '2m50s'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "rank" violates not-null constraint')
      done()
    })
  })

  it('.create should require a start_time',done => {

    database.Rankings.create({
      game_id: 1,
      list_id: 1,
      rank: 1
    })
    .catch(err => {
      assert.strictEqual(err.message, 'null value in column "start_time" violates not-null constraint')
      done()
    })
  })

  it('.create should reject invalid dudes',done => {

    database.Rankings.create({
      game_id: 1,
      list_id: 1,
      dude: 'John',
      rank: 1,
      start_time: '2m50s'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'Validation error: Validation isIn failed')
      done()
    })
  })

  it('.create should require a valid rank',done => {

    database.Rankings.create({
      game_id: 1,
      list_id: 1,
      rank: 11,
      start_time: '2m50s'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'Validation error: Validation max failed')
      done()
    })
  })

  it('.create should require a valid start_time',done => {

    database.Rankings.create({
      game_id: 1,
      list_id: 1,
      rank: 1,
      start_time: '2 minutes'
    })
    .catch(err => {
      assert.strictEqual(err.message, 'Validation error: Validation is failed')
      done()
    })
  })

})
