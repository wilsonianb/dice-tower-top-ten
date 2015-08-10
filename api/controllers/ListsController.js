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
  }
};

