const route = require('express').Router();
const landBank = require('../db/models').landBank;
const request = require('request');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

function filter(stateFetched,areaParam, costParam) {
    return new Promise((resolve,reject) => {
        let filtered = {};
        if (stateFetched) {
        if (areaParam){
            console.log(areaParam)
            const areaarray =areaParam.split(',');
            const x= areaarray[0];
            const y=areaarray[1];
            console.log(x,y)
            if (costParam){
                landBank.findAll({
                    where: {
                        state: stateFetched,
                         Area: {
                             [Op.between]: [x,y]
                         },

                         //Area:areaParam,
                        Cost: costParam,
                    },
                    attributes:["id","LandName","state","Cost","Location","Image"]
                }).then((lands) => {
                        console.log(lands)
                        filtered["success"] = true;
                        filtered["code"] = 200;
                        filtered["message"] = "Lands for the corressponding filter fetched successfully";
                        filtered["data"] = [];
                        Object.keys(lands).forEach((key) => {
                            // console.log(key, lands[key]["dataValues"]);
                            filtered["data"].push(lands[key]["dataValues"]);
                        });

                        console.log(filtered);
                        resolve (filtered);
                    }
                ).catch((err) => console.log("Error: No land found for this area and cost"))
            }
            else {
                landBank.findAll({
                    where: {
                        state: stateFetched,
                        Area: {
                            [Op.between]: [x,y]
                        },
                        attributes:["id","LandName","state","Cost","Location","Image"]
                    }
                }).then((lands) => {
                    //console.log("hjguftftftuuu")
                        //console.log(lands)
                        filtered["success"] = true;
                        filtered["code"] = 200;
                        filtered["message"] = "Lands for the corressponding filter fetched successfully";
                        filtered["data"] = [];
                        Object.keys(lands).forEach((key) => {
                           // console.log('******************************************')
                           // console.log(key, lands[key]["dataValues"]);
                            filtered["data"].push(lands[key]["dataValues"]);
                        });
                        // console.log('******in recent function****');

                        console.log(filtered);
                        resolve (filtered);
                    }
                ).catch((err) => console.log("Error: No land for this area found"))
            }
        }
        else if(costParam){
            landBank.findAll({
                where: {
                state: stateFetched,
                    Cost: costParam,
                },
                attributes:["id","LandName","state","Cost","Location","Image"]
        })
            .then((lands) => {
                    //console.log(lands)
                filtered["success"] = true;
                    filtered["code"] = 200;
                    filtered["message"] = "all Lands for the corressponding state fetched successfully";
                    filtered["data"] = [];
                    Object.keys(lands).forEach((key) => {
                        //console.log(key, lands[key]["dataValues"]);
                        filtered["data"].push(lands[key]["dataValues"]);
                    });
                console.log(filtered);
                resolve (filtered);
                }
            ).catch((err) => console.log("Error: No such land found for such cost"))
    }
    else{
            landBank.findAll({
                where: {
                    state: stateFetched,
                },
                attributes:["id","LandName","state","Cost","Location","Image"]
            }).then((lands) => {
                    //console.log(lands)
                    filtered["success"] = true;
                    filtered["code"] = 200;
                    filtered["message"] = "all Lands for the corressponding state fetched successfully";
                    filtered["data"] = [];
                    Object.keys(lands).forEach((key) => {
                       console.log(key, lands[key]["dataValues"]);
                         filtered["data"].push(lands[key]["dataValues"]);
                     });
                     console.log(filtered);

                     resolve(filtered);
                 }
             ).catch((err) => console.log("Error: No such land found for such cost"))
         }
     }})


}
route.post('/filter', (req,res) => {
    const stateFetched = req.body.state;
    const areaParam = req.body.Area;
    const CostParam = req.body.Cost;
   // console.log(x,y)
filter(stateFetched,areaParam, CostParam)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => console.log("not working"));


    });



// route.get('/filter',((req,res) =>{
//     console.log("hi")
// }))

exports = module.exports = route;
