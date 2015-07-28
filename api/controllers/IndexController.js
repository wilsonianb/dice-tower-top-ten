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
      lists: 'GET /lists',
      rankings: 'GET /lists/:game_id'
    });
  }
};

