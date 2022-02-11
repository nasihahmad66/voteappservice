const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const voteSchema = new Schema({
    Pemilih : {
        type : String,
        required : true
    },
    Pilihan : {
        type : String,
        required : true
    },
    Alasan : {
        type : String,
        required : false
    }
})
const Vote = mongoose.model('vote', voteSchema);
module.exports = Vote;