const conn = require('../db');
const nodemailer = require('nodemailer');
exports.getMessages = function (req, res) {
    try{
        conn.query("SELECT * FROM messages", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/messages',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.render('pages/messages',{ message:"No messages have been found." });
                }
            }
        });
    }catch(err){
        return res.json(err);
    }
};
exports.send = function (req, res) {
    try{
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a7bd20ab10032d",
              pass: "91042b3f32d67a"
            }
          });
        let mailOptions = {
            from: 'web-rentalapp@testing.test',
            to: 'emilsa@manatee.it',
            subject: 'Testing Communications Module',
            text: 'Testing',
        };
        // send invoice, contract, proposal, message, invite
        console.log(req.body);
        if(req.params.id){
            // invoice, contract, proposal
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
                  console.log("Email sent successfully");
                }
              });
        }else{
            // message, invite
            transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
            });
        }
        conn.query("SELECT * FROM messages", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/messages',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.render('pages/messages',{ message:"No messages have been found." });
                }
            }
        });
    }catch(err){
        return res.json(err);
    }
};
