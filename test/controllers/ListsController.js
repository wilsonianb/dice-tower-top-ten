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
})