const AuthMiddleware = require('../middleware/AuthMiddleware');
const { Hospital } = require("../schema/hospitalSchema");

const router = require("express").Router();

router.route("/gethospital").get(AuthMiddleware, (req, res) => {


    Hospital.findOne({ _id: req.id }).populate("Medicines").populate("Organs").populate("Equipments").populate("Bloods").then((response) => {
        if (response) {
            res.json({ isError: false, response, message: "Success" });
        }
        else {
            res.status(404).json({
                isError: true,
                message: "error",
            });
        }
    }).catch(err => res.status(404).json({
        isError: true,
        message: "error",
    }))
});

router.route("searchhospital/:query").get( AuthMiddleware, (req, res) => {

    const blooddata = req.params.query;


    Hospital.find({ _id: req.params.id }).then((response) => {
        if (response) {
            res.json({ response, isError: false, message: "Success" });
        }
        else {
            res.status(400).json({
                isError: true,
                message: "error",
            });
        }
    }).catch(err => res.status(404).json({
        isError: true,
        message: "error",
    }))

});

router.route("/updatehospital").post(AuthMiddleware, (req, res) => {


    Hospital.findOneAndUpdate({ _id: req.id },req.body).then((response) => { res.json({ isError: false, message: "Success" }) })
        .catch((err) => {
            console.log(err)
            res.status(404).json({
                isError: true,
                message: "error"
            })
        })
});

module.exports = router;