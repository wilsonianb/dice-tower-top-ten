/**
 * ListsController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `ListsController.index()`
   */
  index: async function (req, res) {

    const lists = await database.Lists.findAll()
    return res.json({
      lists: lists
    })
  },

  /**
   * `ListsController.indexByGame()`
   */
  indexByGame: async function (req, res) {

    const game_id = req.params.game_id
    let lists = await database.Lists.findAll({
      include: [{
        model: database.Rankings,
        where: {
          game_id: game_id
        }
      }]
    })
    lists = lists.map(list => {
      return {
        name: list.name,
        rankings: list.Rankings.map(ranking => {
          return {
            url:  `${list.url}&t=${ranking.start_time}`,
            rank: ranking.rank,
            dude: ranking.dude
          }
        })
      }
    })
    return res.json({
      lists: lists
    })
  }
};

