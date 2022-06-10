var express = require('express');
var router = express.Router();
let CryptoJS = require("crypto-js");

/* GET users listing. */
router.post('/', function(req, res, next) {
  // console.log(req.body);
  req.app.locals.con.connect(function(err){
    if(err){
        console.log(err);
    }
    // let cryptPass =  CryptoJS.AES.encrypt("admin","nyckel").toString(); 
    // let saveUser= {userName:"admin", email:"admin@mail.com", pw:cryptPass};

    // let sql = `INSERT INTO user (username, email, pw) VALUES ("${saveUser.userName}","${saveUser.email}","${saveUser.pw}")`
    let getSql = `SELECT * FROM user WHERE username ="${req.body.username}"`

    req.app.locals.con.query(getSql, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("result ",result);
        if(result.username === null){
          res.status(401).send({message:"Wrong username or password"})
          return
        }
        
        userPw = CryptoJS.AES.decrypt(result[0].pw, "nyckel").toString(CryptoJS.enc.Utf8);
        if(req.body.pw === userPw){
          res.send(result);
        }
    })
})
});

module.exports = router;
