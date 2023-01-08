const jwt = require('jsonwebtoken');
const { Hospital } = require('../schema/hospitalSchema');



const AuthMiddleware = (req, res, next) => {
    if (typeof (req.cookies) == 'undefined')
        res.status(302).json({ isHospitalAdded: false, isHospitalLoggedIn: false });

    else {
        jwt.verify(req.cookies.auth, process.env.SECRECT, (err, data) => {

            if (typeof (data) == 'undefined' || err) {
                console.log(err);
                res.status(302).json({ HospitalAdded: false, isHospitalLoggedIn: false });

            }

            else {
                Hospital.findOne({ email: data.doc.email }, (err, doc) => {
                    if (doc.email == data.doc.email) {
                        req.id = doc._id;
                        next();
                    }

                    else
                        res.status(302).json({ isHospitalAdded: false, HospitalLoggedIn: false });
                })

            }


        })


    }
}

module.exports = AuthMiddleware;