var express = require('express');
var router = express.Router();
var config = require('../cryptoConfig.json')
var Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction;
var web3js = new Web3(new Web3.providers.HttpProvider(config.httpProvider))


// send txs
router.post('/sendTokens',  async(req, res, next) =>{
	console.log("dadadadadadadaad")
	var reqData = req.body;
	//make db call
	var privateKey = Buffer.from('2984F0BB63ACF2E3F763897E3604F981B9F9452DA95A0A65CEF2963AC9B8563A', 'hex')


	//creating contract object
	var contract = new web3js.eth.Contract(config.contractABI, config.tokenContract);
	console.log("xcvbnmnbvcxzxcvbnmcx")
	// get transaction count, later will used as nonce
	reqData = {
		"fromAddress":"0xa46A26f9A867349F065Bf672D7E736a505cd5446",
		"toAddress": "0x983B2a32a234Fe6117395bc14e031380E44F16Ad",
		"tokens": 3
	}
	var fromAddress = "0xa46A26f9A867349F065Bf672D7E736a505cd5446";
	var transactionCount = await web3js.eth.getTransactionCount(fromAddress);
	console.log("Transaction Count: " + transactionCount);
	
	var rawTransaction = {
		"from": reqData.fromAddress,
		"gasPrice": web3js.utils.toHex(20 * 1e9),
		"gasLimit": web3js.utils.toHex(210000),
		"to": config.tokenContract, "value": "0x0",
		"data": contract.methods.transfer(reqData.toAddress, reqData.tokens).encodeABI(),
		"nonce": web3js.utils.toHex(transactionCount)
	}
	console.log(rawTransaction);
	//creating tranaction via ethereumjs-tx
	var transaction =  new Tx(rawTransaction, { 'chain': 'rinkeby' });
	//signing transaction with private key
	 transaction.sign(privateKey);
	 console.log("after sign")

	//sending transacton via web3js module
	await web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), async (error, txHash) => {
		// if error send false
		if (error) {
			console.log(error);
			return res.send({
				success: false,
				message:error,
				data: {}
			})
		}
		// else 
		console.log("tx hash", txHash);
		return res.send({
			success: true,
			message: "Successfully send tokens!",
			data: {}
		})
	})
		.on('confirmation', (confirmationNumber, receipt) => {
			console.log(chalk.green('confirmation'), confirmationNumber);
		})
		.on('error', (error) => {
			console.log(error,"dadadad")
		});
});

module.exports = router;
