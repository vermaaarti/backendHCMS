const { sendCustomMail } = require('../helperFunctions/MailSenderFunction');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const { Hospital } = require('../schema/hospitalSchema');
const Request = require('../schema/RequestSchema');
const router = require("express").Router();

router.route("/makerequest").post((req, res) => {


    const newRequest = new Request (req.body);
 
     newRequest.save().then((response) => {

        sendCustomMail(response.to, `you have a request form a hospital
                        conatct : +91${response.contact} email : ${response.from}`).
         then(() => {   res.json({ isError:false , message: "resource successfully requested" })  }) .catch((err) => {

            console.log(err)
            res.status(404).json({  isError:true , message: err.message })

        })
            .catch((err) => {
                console.log(err)
                res.status(404).json({isError:true ,message: "error" })
            })
    });

});


    router.route("/getRequest").get((req, res) => {

        const Arr = { "organ": Organ, "blood": Blood, "equipment": Equipment, "medicine": Medicine };


        Arr[req.params.Request].find({}).then((response) => { res.json({ response, message: "Success" }) })
            .catch((err) => {
                console.log(err)
                res.status(404).json({
                    message: "error"
                })
            })
    });

    module.exports = router;