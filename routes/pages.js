const route = require('express').Router()
const landBank = require('../db/models').landBank
const passport = require('../passport')

route.get('/landdb', (req, res) =>{
//res.render('landdb')
    landBank.findAll()
        .then((land) =>{
         res.send(land);

        }).catch((err) => {
    res.status(400).json({ Error: "Missing fields for registration" });})

})

route.post('/landdb', (req, res) => {
    // if (!req.body.Land_name || !req.body.State || !req.body.Area || !req.body.Location || !req.body.Cost) {
    // return res.status(400).json({ Error: "Missing fields for registration" });
    // }
    console.log(req.body);
    landBank.create({
        LandName: req.body.LandName,
        state: req.body.state,
        Area: req.body.Area,
        Location: req.body.Location,
        Cost: req.body.Cost,
        Image : req.body.Image,
    }).then((land) => {
        console.log("Success");
        res.json(land);
    }).catch(() => {

    });
    // post marke dekhna ha uncomment krde ho gya
    //res.status(200);
    // Mene to kch kra bhi nahi kse chal gya>? ????? yar wahi isssue ha isme kabh bhi sequelise kuch bhi krdeta hai

    // }).then((land) => {
    //     res.j{son(land);
    //     console.log(land);
    //
    //     res.redirect('/users/signup')
    // }).catch(function (err) {
    //     return res.status(400).json({ message: "issues trying to connect to database" });
    // })

    // console.log(req.body);})
})

exports = module.exports = route

