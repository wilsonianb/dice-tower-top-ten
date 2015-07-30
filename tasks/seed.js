var Sails = require('sails')
import fs from 'fs'
import {parse} from 'csv'

module.exports = function (done) {

  Sails.lift({}, async () => {

    let parser = parse({columns:true}, async function(err,data) {
      for (let ranking of data) {
        try {
          let result
          result = await database.Games.findOrCreate({
            where: {
              name: ranking.game,
              url: ranking.game_url
            }
          })
          const game = result[0]
          result = await database.Lists.findOrCreate({
            where: {
              name: ranking.list,
              url: ranking.list_url
            }
          })
          const list = result[0]
          await database.Rankings.findOrCreate({
            where: {
              game_id: game.id,
              list_id: list.id,
              dude: ranking.dude==='' ? null : ranking.dude,
              rank: parseInt(ranking.rank),
              start_time: ranking.start_time
            }
          })
        } catch (err) {
          console.log(err)
        }
      }

      done()
    })

    let readable = fs.createReadStream(__dirname+'/../top_ten_lists.csv').pipe(parser);
  })
};