var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

class rest_api {
  run() {
    db.serialize(function () {
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='note'", function(error, row) {
      		if (row !== undefined) {
      			console.log("table exists. skipping creation");
      		}	else {
      			console.log("creating table")
      			db.run("CREATE TABLE note (content TEXT)", function(error) {
      				if (error.message.indexOf("already exists") != -1) {
      					console.log(error);
      				}
      			});
      		}
      	});
      var stmt = db.prepare('INSERT INTO note VALUES (?)')

      for (var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i)
      }

      stmt.finalize()

      db.each('SELECT rowid AS id, content FROM note', function (err, row) {
        console.log(row.id + ': ' + row.info)
      })

    })
    db.close()
  }
}
module.exports = rest_api;
