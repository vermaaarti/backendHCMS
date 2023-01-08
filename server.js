const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const cookieCredentialsMiddleware=require('./middleware/cookieCredentialsMid')



const server = express();


server.use(cookieParser());

mongoose.Promise = global.Promise;

server.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));


server.use(cookieCredentialsMiddleware);

//to sent and recive data in json format
server.use(express.json());


mongoose.set('strictQuery', true);


mongoose.connect(process.env.DB_URI,{
});
mongoose.connection.once('open',(err)=>{
    if(!(err))
   {
       server.listen(9000,(err)=>{
    console.log('server is up running and db connected');
})
   }
    else
    console.log('db connected')
});




// const routes=require('./routes');
const SignUpRoute=require('./authRoute/signUpRoute');
const logInRoute=require('./authRoute/logInRoute');
const AuthOtpRoute=require('./authRoute/AuthOtp');

const hospitalRoutes=require('./hospitalData/HospitalDataRoute');
const EquipmentSearchRoute=require('./categoryRoute/CategorySearch');

const categoryRoutes=require("./categoryRoute/CategoryRoutes");

const requestRoutes=require("./Notifications/requestRoute")

server.use('/' ,hospitalRoutes);
server.use('/',EquipmentSearchRoute);
server.use('/',SignUpRoute);
server.use('/',AuthOtpRoute);
server.use('/',logInRoute);
server.use('/',categoryRoutes);
server.use('/',requestRoutes);