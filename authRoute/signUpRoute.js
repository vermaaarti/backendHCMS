const router = require('express').Router();
const { sendCustomMail } = require('../helperFunctions/MailSenderFunction');
const { Hospital, tempHospital } = require('../schema/hospitalSchema');

router.route('/signup').post((req, res) => {

    const hospitals = req.body;

    const newTempHospital = new tempHospital({ email: hospitals.email, otp: parseInt(Math.random() * 999999) });

    Hospital.findOne({ email: hospitals.email }).then((doc, err) => {
        if (doc) {
            res.json({ isDuplicateHospital: true, isEmailSent: false });
        }
        else {
            newTempHospital.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ isDuplicateHospital: true, isEmailSent: false })
                }

                else {

                    sendCustomMail(result.email, `verifying sign Up mail </br> otp : ${result.otp}`)
                        .then(() => res.status(201).json({ isDuplicateHospital: false, isEmailSent: true })).
                        catch((err) => {
                            console.log(err);
                            res.status(400).json({ isDuplicateHospital: false, isEmailSent: false });
                        })

                }
            })
        }
    });

});

module.exports = router;
