const AuthMiddleware = require('../middleware/AuthMiddleware');
const { Organ , Blood ,Equipment,Medicine } = require('../schema/categorySchema');
const router = require("express").Router();


router.route("/searchhospital/:category/:query").get(AuthMiddleware,(req, res) => {

    const Arr={"organ":Organ,"blood":Blood, "equipment" :Equipment, "medicine": Medicine}
  
       Arr[req.params.category].find({name : req.params.query}).populate('hospitalId').then((response) => {
            if (response) {
                res.json({ response,  isError : false, message: "Success" });
            }
            else {
                res.status(400).json({
                    isError : true,
                    message: "error",
                });
            }
        }).catch(err => res.status(404).json({
            isError : true,
            message: "error",
        }))
     
});



module.exports = router;