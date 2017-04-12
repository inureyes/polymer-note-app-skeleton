var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

class rest_api {
  run(req) {
    db.serialize(function () {
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='note'", function(error, row) {
      		if (row !== undefined) {
      			console.log("Table exists. skipping creation");
      		}	else {
      			console.log("Creating table")
      			db.run("CREATE TABLE note (id INTEGER PRIMARY KEY AUTOINCREMENT, created TIMESTAMP DEFAULT (DATETIME('now')), content TEXT)", function(error) {
              if (error != null) {
        				if (error.message.indexOf("already exists") != -1) {
        					console.log(error);
        				}
              }
      			});
      		}
      	});
      var stmt = db.prepare('INSERT INTO note (content) VALUES (?)')
      stmt.run(req.body.content)
      stmt.finalize()
      db.each('SELECT rowid AS id, created, content FROM note', function (err, row) {
        console.log(row.id + ': ' + row.created + ': ' + row.content)
      })
    })
    return true
  }
}
module.exports = rest_api;
