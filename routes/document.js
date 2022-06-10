var express = require('express');
var router = express.Router();

const mysql = require("mysql2");

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.app.locals.con.connect(function(err){
        if(err){
            console.log(err);
        }

        // let sql = `INSERT INTO documents (user_id, title, preview, content) VALUES (1,"req.body.title","req.body.preview","req.body.content")`
        let getSql = `SELECT * FROM documents`

        req.app.locals.con.query(getSql, function(err, result){
            if(err){
                console.log(err);
            }
            console.log("result ",result);
            res.status(200).send(result);
        })
    })

  
});

router.get('/:id', function(req,res, next){
    req.app.locals.con.connect(function(err){
        if(err){
            console.log(err);
        }
        console.log("test ",req.params );
        let getSql = `SELECT * FROM documents where id=${req.params.id}`
        req.app.locals.con.query(getSql, function(err, result){
            if (err){
                console.log(err);
            }
            if(result.length === 0){
                console.log("hej");
                res.status(404).end()
                return
            }
            console.log(result);
            res.status(200).send(result);
        })
    })
})

router.post('/', function(req, res, next) {

    req.app.locals.con.connect(function(err){
        if(err){
            console.log(err);
        }

        let sql = `INSERT INTO documents (user_id, title, content) VALUES ("${req.body.user_id}""${req.body.title}","${req.body.content}")`
        req.app.locals.con.query(sql, function(err, result){
            if(err){
                console.log(err);
            }
            console.log("result ",result);
            res.status(200).send(result);
        })
    });
});

router.delete('/:id', function(req, res){
    req.app.locals.con.connect(function(err){
        if(err){
            console.log(err);
        }
        let sql = `DELETE FROM documents WHERE id="${req.params.id}"`
        req.app.locals.con.query(sql, function(err, result){
            if(err){
                console.log(err);
            }
            console.log(result);
            res.status(200).send(result);
        })
    })
})
router.post('/:id', function(req, res, next) {

    req.app.locals.con.connect(function(err){
        if(err){
            console.log(err);
        }

        let sql = `UPDATE documents SET title = "${req.body.title}", content = "${req.body.content}" WHERE id=${req.params.id}`
        req.app.locals.con.query(sql, function(err, result){
            if(err){
                console.log(err);
            }
            console.log("result ",result);
            res.status(200).send(result);
        })
    });
});

module.exports = router;
