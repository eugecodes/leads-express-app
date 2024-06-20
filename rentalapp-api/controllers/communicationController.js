const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createMessage = async(req,res,next) => {
    var sql = 'insert into messages (message_date, message_subject, message_body, status, event_id, `from`, `to`, related_to) values (?,?,?,?,?,?,?,?)';
    console.log(req.body.message_date +" "+ req.body.message_subject +" "+ req.body.message_body+" "+ req.body.status +" "+ req.body.event_id +" "+ req.body.from+" "+ req.body.to+" "+ req.body.related_to);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.message_date, 
            req.body.message_subject, 
            req.body.message_body, 
            req.body.status, 
            req.body.event_id, 
            req.body.from,
            req.body.to,
            req.body.related_to
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The message has been successfully saved & sent."}); }
    }catch(err){
        next(err);
    }
};
exports.getMessage = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `messages` WHERE `id`=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No message found" });
    }catch(err){
        next(err);
    }
};
exports.getAllMessages = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM messages");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No messages found" });
    }catch(err){
        next(err);
    }
};