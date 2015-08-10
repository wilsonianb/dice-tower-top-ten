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

  describe('GET /lists/:id', () => {

    let list
    beforeEach(async() => {
      list = await database.Lists.create({
        name: 'Top Ten Dice Games',
        url: 'https://www.youtube.com/watch?v=PDQbqCF-FbY'
      })
    })

    it('.show should return requested list',done => {
      request.get(`/lists/${list.id}`)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.list.name).to.equal(list.name)
          expect(resp.body.list.url).to.equal(list.url)
          done()
        })
    })

    it('.show should return 404 for list not found',done => {
      request.get(`/lists/404`)
        .expect(404)
        .end((err, resp) => {
          expect(resp.body.error).to.equal('List not found')
          done()
        })
    })
  })

  describe('GET /lists/:id/rankings', () => {

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

    it('.show should return list rankings',done => {
      request.get(`/lists/${list.id}/rankings`)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body.rankings).to.be.instanceof(Array)
          expect(resp.body.rankings).to.have.length(1)
          expect(resp.body.rankings[0].rank).to.equal(ranking.rank)
          expect(resp.body.rankings[0].dude).to.equal(ranking.dude)
          expect(resp.body.rankings[0].url).to.equal(`${list.url}&t=${ranking.start_time}`)
          expect(resp.body.rankings[0].game.id).to.equal(game.id)
          expect(resp.body.rankings[0].game.name).to.equal(game.name)
          expect(resp.body.rankings[0].game.url).to.equal(game.url)
          done()
        })
    })

    it('.show should return 404 for list rankings not found',done => {
      request.get(`/lists/404/Rankings`)
        .expect(404)
        .end((err, resp) => {
          expect(resp.body.error).to.equal('List rankings not found')
          done()
        })
    })
  })
})