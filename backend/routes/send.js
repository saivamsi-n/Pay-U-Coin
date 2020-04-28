var express = require('express');
var router = express.Router();
var config = require('../cryptoConfig.json')
var Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction;
var web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider))
var User = require("../models/User");
var transactionDbUtils = require("../transactionUtils");

router.get("/balance/:account", async (req, res) => {
    var contract = new web3.eth.Contract(config.contractABI, config.tokenContract);

    try{
    await contract.methods.balanceOf(req.params.account).call(async (error, balance) => {
        console.log(balance)
        res.send({
            success: true,
            data: balance
        })
    })
    }
    catch(err){
        console.log(err)
        res.send({
            success:false,
            data:err
        })
    }
})

router.post('/getTokens', (req, res) => {
    var reqBody = {
        fromAddress: config.tokenAccount,
        toAddress: req.body.toAddress,
        tokens: req.body.tokens
    }
    sendTokens(reqBody, function (err, output) {
        if (err) {
            res.send({
                success: false,
                message: err
            })
            return;
        }
        // var logStatus = transactionDbUtils.createTransaction(reqBody);
        // console.log("Log Status",logStatus)
        res.send({
            success: true,
            message: "Successfully sent tokens"
        })
    });
})

router.post('/send', (req, res) => {
    sendTokens(req.body, function (err, output) {
        console.log(err,output)
        if (err) {
            console.log("eror occured")
            res.send({
                success: false,
                message: err
            })
            return;
        }
        var logStatus = transactionDbUtils.createTransaction(req.body);
        res.send({
            success: true,
            message: "Successfully sent tokens"
        })
    });
});

var sendTokens = function (reqData, callback) {
    console.log(reqData)
    try {
        web3.eth.getTransactionCount(reqData.fromAddress).then((transactionCount) => {
            console.log("Transaction Count: ", transactionCount);
            var contract = new web3.eth.Contract(config.contractABI, config.tokenContract);
            console.log(reqData)
            User.findOne({
                publicKey: reqData.fromAddress
            })
                .then(user => {
                    if (user.privateKey && user.privateKey != "") {
                        var rawTx = {
                            "from": reqData.fromAddress,
                            "gasPrice": web3.utils.toHex(20 * 1e9),
                            "gasLimit": web3.utils.toHex(210000),
                            "to": config.tokenContract, "value": "0x0",
                            "data": contract.methods.transfer(reqData.toAddress, reqData.tokens).encodeABI(),
                            "nonce": web3.utils.toHex(transactionCount)
                        }
                        sendTxn(user.privateKey, rawTx, callback);
                    }
                    else {
                        callback("Transaction not permitted, contact support team!", null)
                    }
                })

        })
    }
    catch (err) {
        console.log("web3 err", err.message);
        callback(err.message, null);
    }
};

function sendTxn(privateKey, rawTx, callback) {
    // var privateKeyBuffer = Buffer.from(config.privateKey, 'hex');
    var privateKeyBuffer = Buffer.from(privateKey, 'hex');
    var transaction = new Tx(rawTx, { 'chain': 'rinkeby' });
    transaction.sign(privateKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), async (err, txHash) => {
        if (err) {
            console.log("txn err", err);
            callback(err, null);
        } else {
            console.log("txn result", txHash);
            callback(null, txHash)
        }
    }).catch((err) => {
        callback(err, null);
    });
}




module.exports = router;
