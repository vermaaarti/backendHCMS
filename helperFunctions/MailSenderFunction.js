const nodemailer=require('nodemailer');


const message = {
    from:process.env.MAIL_From,
    to:'',
    subject:'verify your hospital',
    text:""
}



const sendCustomMail = async(to,msg)=>{
    message.to=to;
    message.text=msg;

    try {
   nodemailer.createTransport({
            service:process.env.MAIL_SERVICE,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            },
            port:process.env.MAIL_PORT,
            
            host:process.env.MAIL_HOST

        }).sendMail(message,err=>{
            if (err) {
                console.error(err.message);
            } else {
                console.log('message sent');
                return true;
            }
        })
    } catch (e) {
        console.error(e);
    }
    
}

//sendCostumMail('deveshswarnkar007@gmail.com',"hello");

module.exports={sendCustomMail};