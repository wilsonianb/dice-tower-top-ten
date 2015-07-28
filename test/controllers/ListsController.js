import 'sails-test-helper'

describe('ListsController', () => {

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

  describe('GET /lists', () => {

    const list = 'Top Ten Dice Games'
    beforeEach(async() => {
      await database.Lists.create({
        name: list,
        url: 'https://www.youtube.com/watch?v=PDQbqCF-FbY'
      })
    })

    it('.index should return lists',done => {
      request.get('/lists')
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.lists).to.be.instanceof(Array)
          expect(resp.body.lists).to.have.length(1)
          expect(resp.body.lists[0].name).to.equal(list)
          done()
        })
    })
  })

  describe('GET /lists/:game_id', () => {

    let game, list, ranking

    beforeEach(async() => {
      await database.Rankings.truncate({cascade: true})
      await database.Games.truncate({cascade: true})
      await database.Lists.truncate({cascade: true})

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

    it('.show should return game lists and rankings',done => {
      request.get(`/lists/${game.id}`)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.lists).to.be.instanceof(Array)
          expect(resp.body.lists).to.have.length(1)
          expect(resp.body.lists[0].name).to.equal(list.name)
          expect(resp.body.lists[0].rankings).to.be.instanceof(Array)
          expect(resp.body.lists[0].rankings).to.have.length(1)
          expect(resp.body.lists[0].rankings[0].rank).to.equal(ranking.rank)
          expect(resp.body.lists[0].rankings[0].url).to.equal(`${list.url}&t=${ranking.start_time}`)
          done()
        })
    })
  })
})