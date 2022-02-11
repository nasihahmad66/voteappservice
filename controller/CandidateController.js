const req = require("express/lib/request");
const Candidate = require("../models/CandidateModel");
const Vote = require("../models/VoteModel");
module.exports = {
    GetAll : async (req, res)=>{
        Candidate.find({}).then(result=>{
            return res.send({success: true, data : result, total: result.length})
        })
    },
    GetAllforAdmin : async (req, res)=>{
        let HasilAkhir = []
        Candidate.find({}).then(result=>{
            Vote.aggregate([
                {$group: {'_id':'$Pilihan',"pemilih":{$sum:1}}}
            ]).then((voteResult)=>{
                let totalPemilih = 0
                result.forEach((res,key) => {
                    voteResult.forEach(vr => {
                        if (res._id == vr._id) {
                            result[key]["Pemilih"] = vr.pemilih
                        }
                    });
                    totalPemilih += result[key]["Pemilih"]
                });

                res.send({success: true, data:result, total: result.length, totalPemilih})
            })
        })
    },
    GetByID : (req,res) => {
        Candidate.findById({_id : req.params.id})
        .then(data => res.send(data))
    },
    Add : async (req, res)=>{
        Candidate.create(req.body).then(result=>res.send({success:true,data: result}))
    },
    Edit : async (req,res) => {
        Candidate.findByIdAndUpdate({_id : req.params.id}, { $set:
            req.body
        }).then(result=>res.send({success:true,data: result}))
    },
    Delete : async (req,res) => {
        const id = req.params.id
        Candidate.findByIdAndRemove(id).then(result=>{
            res.send({success:true, data : result})
        })
    }
}