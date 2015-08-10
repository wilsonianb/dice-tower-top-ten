import 'sails-test-helper'

describe('GamesController', () => {

  before(async() => {
    await database.Rankings.truncate({cascade: true})
    await database.Games.truncate({cascade: true})
    await database.Lists.truncate({cascade: true})
  });

  afterEach(async() => {
    await database.Rankings.truncate({cascade: true})
    await database.Games.truncate({cascade: true})
    await database.Lists.truncate({cascade: true})
  });

  describe('GET /games', () => {

    const game = 'Pandemic'
    beforeEach(async() => {
      await database.Games.create({
        name: game,
        url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
      })
    })

    it('.index should return games',done => {
      request.get('/games')
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.games).to.be.instanceof(Array)
          expect(resp.body.games).to.have.length(1)
          expect(resp.body.games[0].name).to.equal(game)
          done()
        })
    })
  })

  describe('GET /games/:id', () => {

    let game
    beforeEach(async() => {
      game = await database.Games.create({
        name: 'Pandemic',
        url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
      })
    })

    it('.show should return requested game',done => {
      request.get(`/games/${game.id}`)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.game.name).to.equal(game.name)
          expect(resp.body.game.url).to.equal(game.url)
          done()
        })
    })

    it('.show should return 404 for game not found',done => {
      request.get(`/games/404`)
        .expect(404)
        .end((err, resp) => {
          expect(resp.body.error).to.equal('Game not found')
          done()
        })
    })
  })

  describe('GET /games/:id/rankings', () => {

    let game, list, ranking

    beforeEach(async() => {
      game = await database.Games.create({
        name: 'Pandemic',
        url: 'https://boardgamegeek.com/boardgame/30549/pandemic'
      })
      list = await database.Lists.create({
        name: 'Top Ten Co-op Games',
        url: 'https://www.youtube.com/watch?v=RoO8HPfpIN8'
      })
      ranking = await database.Rankings.create({
        game_id: game.id,
        list_id: list.id,
        rank: 1,
        start_time: '2m50s'
      })
    });

    it('.show should return game rankings',done => {
      request.get(`/games/${game.id}/rankings`)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.rankings).to.be.instanceof(Array)
          expect(resp.body.rankings).to.have.length(1)
          expect(resp.body.rankings[0].rank).to.equal(ranking.rank)
          expect(resp.body.rankings[0].dude).to.equal(ranking.dude)
          expect(resp.body.rankings[0].url).to.equal(`${list.url}&t=${ranking.start_time}`)
          expect(resp.body.rankings[0].list.id).to.equal(list.id)
          expect(resp.body.rankings[0].list.name).to.equal(list.name)
          expect(resp.body.rankings[0].list.url).to.equal(list.url)
          done()
        })
    })

    it('.show should return 404 for game rankings not found',done => {
      request.get(`/games/404/Rankings`)
        .expect(404)
        .end((err, resp) => {
          expect(resp.body.error).to.equal('Game rankings not found')
          done()
        })
    })
  })
})
