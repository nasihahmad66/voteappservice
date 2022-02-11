const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const candidateSchema = new Schema({
    NamaKandidat : {
        type : String,
        required : true
    },
    Kelas : {
        type : String,
        required : true
    },
    Visi : {
        type : String,
        required : true
    },
    Misi : {
        type : String,
        required : true
    },
    Foto : {
        type : String,
        required : true
    },
    Pemilih : {
        type :Number
    }
})
const Candidate = mongoose.model('candidate', candidateSchema);
module.exports = Candidate;