const Vote = require("../models/VoteModel")

module.exports = {
    GetAll : async (req, res)=>{
        Vote.find({}).sort({_id:-1}).then(result=>res.send({success:true,data: result,count:result.length}))
    },
    GetByPilihan : (req,res) => {
        Vote.find({Pilihan : req.params.id})
        .then(data => res.send({suuccess:true,data,count:data.length}))
    },
    VoteToCandidate : async (req, res)=>{
        Vote.create(req.body).then(result=>res.send({success:true,data: result}))
    }
}

