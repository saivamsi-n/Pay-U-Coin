var express = require('express');
var router = express.Router();
var Transaction = require("../models/Transaction");

router.post("/", function (req, res) {
    const reqBody = req.body;
    var condition = {};
    if(!reqBody.startDate && !reqBody.endDate){
        condition = {
            $or: [{ from: reqBody.publicKey },  { to: reqBody.publicKey }] 
        }
    }
    else{
        condition = {
            "createdAt": {
                // "$gte": new Date(reqBody.start.year, reqBody.start.month, reqBody.start.date),
                // "$lt": new Date(reqBody.end.year, reqBody.end.month, reqBody.end.date),
                "$gte" : new Date(reqBody.startDate),
              //  "lte":new Date(reqBody.endDate),
            },
            $or: [{ from: reqBody.publicKey },  { to: reqBody.publicKey }] ,
        }
    }
    Transaction.find(condition).then(function (transactionsData) {
        console.log(transactionsData)
        res.send({
            success: true,
            data: transactionsData
        })
    })
    .catch(err =>{
        console.log(err)
        res.send({
            success: false,
            data: {},
            message: "Error loading data from database."
        })
    })
})


module.exports = router;