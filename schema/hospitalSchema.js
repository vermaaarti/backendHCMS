const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true, minlength: 3, default: 'name'
        }
        ,
        email: {
            required: [true, 'e-mail address required'],
            unique: [true, 'existing email addresss '],
            type: String,
            lowercase: true
        },
        contact:{
             type : String
        },
        password: {
            type: String,
            unique: true,
            required: [true, 'hased password required']

        },
        imgUrl: {
            type: String, default: 'imgUrl'
        },

        address: {
            city: {
                type: String, default: 'city'
            },
            pincode: {
                type: String, default: 'pincode'
            },
            Area: {
                type: String, default: 'village'

            },
            landmark: {
                type: String, default: 'landmark'
            }
        },

        Equipments: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment',
            required: true

        }],
        Medicines: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true

        }],
        Organs: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organ',
            required: true

        }],
        Bloods: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blood',
            required: true

        }]

    }
);

const tempHospitalSchema = new mongoose.Schema(
    {

        email: {
            required: [true, 'e-mail address required'],
            unique: [true, 'existing email addresss '],
            type: String,
            lowercase: true
        },
        
        otp:{
                type : Number
        },
        createdAt: { type: Date, expires: '3m', default: Date.now }
    });


const Hospital = mongoose.model('Hospital', HospitalSchema);
const tempHospital = mongoose.model('tempHospital', tempHospitalSchema);

module.exports = {Hospital,tempHospital};