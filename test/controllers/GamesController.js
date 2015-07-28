import 'sails-test-helper'

describe('GamesController', () => {

  before(async() => {
    await database.Games.truncate({cascade: true})
  });

  afterEach(async() => {
    await database.Games.truncate({cascade: true})
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
})
