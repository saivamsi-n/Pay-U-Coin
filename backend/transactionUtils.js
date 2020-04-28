var Transaction = require("./models/Transaction");


module.exports ={
    createTransaction: function(reqBody){
        console.log(reqBody)
        var transaction  = new Transaction({
            from: reqBody.fromAddress,
            to: reqBody.toAddress,
            comments: reqBody.comments,
            createdAt : new Date(),
            transactionType: reqBody.transactionType
        })
        transaction.save()
        .then(data =>{
            if(data){
                return true
            }
            else{
                return false
            }
        })
    }
}