/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `IndexController.index()`
   */
  index: function (req, res) {

    return res.json({
      games: 'GET /games',
      game_rankings: 'GET /games/:id/rankings',
      lists: 'GET /lists'
    });
  }
};

