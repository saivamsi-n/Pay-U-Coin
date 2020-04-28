var Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction;
var web3js = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/7ff6bbdd7191468d9a36f2e33f4070d6"))

var myAddress = '0xa46A26f9A867349F065Bf672D7E736a505cd5446';
var privateKey = Buffer.from('2984F0BB63ACF2E3F763897E3604F981B9F9452DA95A0A65CEF2963AC9B8563A', 'hex')
var toAddress = '0x983B2a32a234Fe6117395bc14e031380E44F16Ad';

//contract abi is the array that you can get from the ethereum wallet or etherscan
let contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "standard",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var contractAddress = "0x7CbAc47F61bd6f07dC735aC2f0CA8d137E76c310";
//creating contract object
var contract = new web3js.eth.Contract(contractABI, contractAddress);

var count;
// get transaction count, later will used as nonce
web3js.eth.getTransactionCount(myAddress).then(function (v) {
    console.log("Count: " + v);
    count = v;
    // let decimals = web3js.utils.toBN(18);
    // let amount = web3js.utils.toBN(100);
    // var value =amount.times(web3js.utils.toBN(10).pow(decimals));
    //creating raw tranaction
    var rawTransaction = { 
        "from": myAddress,
        "gasPrice": web3js.utils.toHex(20 * 1e9),
        "gasLimit": web3js.utils.toHex(210000),
        "to": contractAddress, "value": "0x0", 
        "data": contract.methods.transfer(toAddress, 10).encodeABI(), 
        "nonce": web3js.utils.toHex(count) 
    }
    console.log(rawTransaction);
    //creating tranaction via ethereumjs-tx
    var transaction = new Tx(rawTransaction,{'chain':'rinkeby'});
    //signing transaction with private key
    transaction.sign(privateKey);
    //sending transacton via web3js module
    // web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
    //     .on('transactionHash', console.log);

    // contract.methods.balanceOf(myAddress).call()
    //     .then(function (balance) { console.log(balance) });
    web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (error, txHash) => {
        // console.log(chalk.green("sendSignedTransaction error, txHash"), error, txHash);

        if (error) {
          console.log(error);
        }
        // else 
        console.log("tx hash",txHash);
      })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(chalk.green('confirmation'), confirmationNumber);
        })
        .on('error', (error)=>{
            console.log(error)
        });

})