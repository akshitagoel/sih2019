const route = require('express').Router();
const landBank = require('../db/models').landBank;
const imageBank = require('../db/models').imageBank
const request = require('request');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

function findland(id){
    return new Promise((resolve,reject) => {
        let filtered = {};
       if (id)
       {console.log(id)
           landBank.findAll({
               where: {
                  id: id,
               },
               attributes:["state","Location","LandName","Cost","Area","Image"]
           }).then((lands) => {
                   //console.log(lands)
                   filtered["success"] = true;
                   filtered["code"] = 200;
                   filtered["message"] = "Lands for the corressponding filter fetched successfully";
                   filtered["data"] = [];
                   Object.keys(lands).forEach((key) => {
                        //console.log(key, lands[key]["dataValues"]);
                       filtered["data"].push(lands[key]["dataValues"]);
                   });
                   console.log(filtered);
                   //resolve (filtered);
               }).catch((err) => console.log("Error: No land found for this id"))


           imageBank.findAll( {
               where: {
                    id: id,
                },
               attributes :["imageUrl"]
            }).then((images) => {
               console.log(images)
               Object.keys(images).forEach((key) => {
                   //console.log(key, images[key]["DataValues"]);
                   filtered["image"].push(images[key]["dataValues"]);
               });
               //console.log(filtered);
               //resolve (filtered);
           }).catch((err) => console.log("Error: No image found for this land id"))
            }

       resolve(filtered)

    })
}
route.post('/land', (req,res) => {
    const id= req.body.id;
    console.log(id)
    findland(id)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => console.log("not working"));
});
exports = module.exports = route;
