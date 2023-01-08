const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const { Hospital } = require('../schema/hospitalSchema');

router.route('/login').post((req,res)=>{
   
    
    const logHospital=req.body;
    
            Hospital.findOne({email:logHospital.email}).then((doc,err)=>{
                if(err)
                    res.status(400).json({isHospitalLoggedIn:false,isCorrectPassword:false,isNetworkError:true});
                else if(doc)
                {
                    const tokenData={doc,date: new Date() };
                  
                    bcrypt.compare(logHospital.password, doc.password, (error, result)=> {
                        if(result){
                            const token= jwt.sign(tokenData, process.env.SECRECT);
                            res.cookie("auth",token ,{maxAge:1000*60*600}).json
                            ({  isHospitalLoggedIn:true,isCorrectPassword:true,isCorrectHospital:true});
                        }
                        else
                            res.status(400).json({isHospitalLoggedIn:false,isCorrectPassword:false});
                   
                    })
                } 
                else
                res.status(400).json({isHospitalLoggedIn:false,isCorrectPassword:false,isCorrectHospital:false})
                
        }).catch((erro)=>{
                console.log(erro)
                res.status(400).json({isHospitalLoggedIn:false,isNetworkError:true})
            })
   
})



module.exports=router;
