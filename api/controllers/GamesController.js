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
  }
};
