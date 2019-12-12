// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var cors = require("cors")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Servidor rodando na porta ${HTTP_PORT}`)
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Online" })
});


//Lista todos os authores
app.get("/api/author", (req, res, next) => {

    var sql = "select * from author"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
//Lista books
app.get("/api/author/books", (req, res, next) => {
    var sql = "select * from author"
    var params = []
    db.all(sql, params, (err, rows) => {
        var resp = rows.map((author) => {

        return {
           book: author.book,
           id:author.id
            }
        }
    );
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": resp
        })
    });
});
//Lista names
app.get("/api/author/name", (req, res, next) => {
    var sql = "select * from author"
    var params = []
    db.all(sql, params, (err, rows) => {
        var resp = rows.map((author) => {

            return {
               name: author.name,
               id:author.id
                }
            }
        );
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": resp
        })
    });
});

//Retorna o author específico para aquele id, caso contrário, retorna uma mensagem de erro
app.get("/api/author/:id", (req, res, next) => {
    var sql = "select * from author where id = ?";
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row != null) {
            res.json({
                "message": "success",
                "data": row
            })
        } else {
            res.json({
                "message": "Não existe author para esse id"
            })
        }
    });
});

//Cria um author
app.post("/api/author", (req, res, next) => {
    var errors = []
    if (!req.body.price) {
        errors.push("preço não especificado");
    }
    if (!req.body.book) {
        errors.push("book não especificado");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        name: req.body.name,
        book: req.body.book,
        price: req.body.price
    }
    var sql = 'INSERT INTO author (name, book, price) VALUES (?,?,?)'
    var params = [data.name, data.book, data.price]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        data.id = this.lastID;
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

//Atualiza um author
app.patch("/api/author/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.book,
        password: req.body.price
    }

    db.run(
        `UPDATE author set
           name = COALESCE(?,name),
           book = COALESCE(?,book),
           price = COALESCE(?,price)
           WHERE id = ?`,
        [data.name, data.book, data.price, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
})

//Remove um author
app.delete("/api/author/:id", (req, res, next) => {
    db.run(
        'DELETE FROM author WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
})

// Insira outros endpoints aqui!


app.use(function (req, res) {
    res.status(404).json({"message": "url não encontrada"});
});
