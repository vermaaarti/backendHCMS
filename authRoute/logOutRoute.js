const router = require('express').Router();

router.route('/').post((req,res)=>{
    console.log(req.cookies)
    res.clearCookie('',{path:'/'}).json({isHospitalLoggedOut:true});
})



module.exports=router;