var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE author (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE,
            book text ,
            price INTERGER,
            CONSTRAINT name_unique UNIQUE (name)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO author (name, book, price) VALUES (?,?,?)'
                db.run(insert, ["Paulo Scalercio","React", 1200])
                db.run(insert, ["Marcos","Design",800])
                db.run(insert, ["Daniel","java",150])
                db.run(insert, ["Nico","Aprenda Alemão",9999])
            }
        });
    }
});


module.exports = db
