const AuthMiddleware = require('../middleware/AuthMiddleware');
const { Organ, Blood, Equipment, Medicine } = require('../schema/categorySchema');
const {Hospital} = require('../schema/hospitalSchema');
const router = require("express").Router();

router.route("/addcategory/:category").post(AuthMiddleware, (req, res) => {

    const Arr = { "organ": Organ, "blood": Blood, "equipment": Equipment, "medicine": Medicine };

    const newCategory = new Arr[req.params.category](req.body);
    console.log(`${req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)}s`);

    newCategory.save().then((response) => {

        Hospital.findOneAndUpdate({ _id: req.body.hospitalId }, {
            $push : { [`${req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)}s`] : response._id }

        }).then(() => {   res.json({ message: "Success" })  }) .catch((err) => {

            console.log(err)
            res.status(404).json({ message: "error" })

        })
            .catch((err) => {
                console.log(err)
                res.status(404).json({message: "error" })
            })
    });

});


    router.route("/getcategory/:category").get((req, res) => {

        const Arr = { "organ": Organ, "blood": Blood, "equipment": Equipment, "medicine": Medicine };


        Arr[req.params.category].find({}).then((response) => { res.json({ response, message: "Success" }) })
            .catch((err) => {
                console.log(err)
                res.status(404).json({
                    message: "error"
                })
            })
    });

    module.exports = router;