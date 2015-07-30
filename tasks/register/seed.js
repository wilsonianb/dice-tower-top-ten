require('babel/register')

module.exports = function (grunt) {
  grunt.registerTask('seed', function() {
    var done = this.async()

    require(__dirname+'/../seed')(done)
  })
};