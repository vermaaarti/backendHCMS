const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Hospital ,tempHospital} =require('../schema/hospitalSchema');


router.route('/signup/authotp').post((req,res)=>{
    const hospitalSideData=req.body;
    
    tempHospital.findOne({otp:hospitalSideData.otp}).then((doc,err)=>{
        if(doc && doc.email==hospitalSideData.email){  

            const newHospital= new Hospital({ hospitalId : doc._id, name:hospitalSideData.name,email:hospitalSideData.email});

        bcrypt.hash(hospitalSideData.password, 12, function (err, hashPassword){
            if(err){
                console.log(err);
                res.status(500).json({isHospitalSignedUp:false,isResendOtp:true,isOtpWrong:true});
            }
            
            else{   

                newHospital.password=hashPassword;
                //anonmoyous  async fun for saving hospital data
                (async()=>{
                try{
                    const res1=await newHospital.save();
                    res.status(201).json({isHospitalSignedUp:true,isResendOtp:false,isOtpWrong:false})  
                }
                catch(err){ 
                    console.log(err);
                    res.status(500).json({isHospitalSignedUp:false,isResendOtp:true,isOtpWrong:true}); 
                }
                })();
            }
        }); 

    }
    else{
        console.log(doc);
        res.status(400).json({isHospitalSignedUp:false,isResendOtp:true,isOtpWrong:true});
    }

    })

 
})


 module.exports=router;