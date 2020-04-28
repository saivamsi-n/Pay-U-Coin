const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
   
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    createdAt : { 
        type : Date,
        default: Date.now ,
        required: true
    },
    transactionType:{
        type: String,
        required: true
    },
});

const Transaction = mongoose.model('transactions', TransactionSchema);

module.exports = Transaction;

