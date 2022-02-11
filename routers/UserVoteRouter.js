const CandidateController = require("../controller/CandidateController");
const VoteController = require("../controller/VoteController");

const router = require("express").Router();

router.get("/all",CandidateController.GetAll)
router.post("/vote", VoteController.VoteToCandidate )

module.exports = router