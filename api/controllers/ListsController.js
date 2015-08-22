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
   * `ListsController.show()`
   */
  show: async function (req, res) {
    try {
      const list = await database.Lists.findOne({
        where: {
          id: req.params.id
        }
      })
      if (list) {
        return res.json({
          list: list
        })
      } else {
        return res.status(404).json({
          error: 'List not found'
        })
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  },

  /**
   * `ListsController.showRankings()`
   */
  showRankings: async function (req, res) {
    try {
      const list_id = req.params.id
      let rankings = await database.Rankings.findAll({
        where: {
          list_id: list_id
        },
        include: [
          database.Games,
          database.Lists
        ]
      })
      if (!rankings.length) {
        return res.status(404).json({
          error: 'List rankings not found'
        })
      }
      rankings = rankings.map(ranking => {
        return {
          url:  `${ranking.List.url}&t=${ranking.start_time}`,
          rank: ranking.rank,
          dude: ranking.dude,
          game: ranking.Game
        }
      })
      return res.json({
        rankings: rankings
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }
};

