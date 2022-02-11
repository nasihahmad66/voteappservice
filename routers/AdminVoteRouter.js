const CandidateController = require("../controller/CandidateController");
const VoteController = require("../controller/VoteController");

const router = require("express").Router();

router.get("/all",CandidateController.GetAllforAdmin)
router.get("/:id",CandidateController.GetByID)
router.post("/add", CandidateController.Add )
router.put("/edit/:id", CandidateController.Edit)
router.delete("/:id", CandidateController.Delete)
router.get("/pilihan/:id", VoteController.GetByPilihan)
router.get("/pilihan", VoteController.GetAll)

module.exports = router