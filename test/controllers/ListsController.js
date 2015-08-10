import 'sails-test-helper'

describe('ListsController', () => {

  before(async() => {
    await database.Lists.truncate({cascade: true})
  });

  afterEach(async() => {
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
})