/**
 * GamesController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `GamesController.index()`
   */
  index: async function (req, res) {

    const games = await database.Games.findAll()
    return res.json({
      games: games
    })
  },

  /**
   * `GamesController.showRankings)`
   */
  showRankings: async function (req, res) {
    try {
      const game_id = req.params.id
      let rankings = await database.Rankings.findAll({
        where: {
          game_id: game_id
        },
        include: [database.Lists]
      })
      if (!rankings.length) {
        return res.status(404).json({
          error: 'Game rankings not found'
        })
      }
      rankings = rankings.map(ranking => {
        return {
          url:  `${ranking.List.url}&t=${ranking.start_time}`,
          rank: ranking.rank,
          dude: ranking.dude,
          list: ranking.List
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
