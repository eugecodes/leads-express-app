const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
//const {validationResult} = require('express-validator');
require('../util/safety.js');

exports.createContract = async(req,res,next) => {
    var sql = 'insert into contracts (title, `date`, status, destinatary, amount, document_path, signed_date, related_to, content_html) values (?,?,?,?,?,?,?,?,?)';
    console.log(safety(req.body));
    //console.log(req.body.title +" "+ req.body.date +" "+ JSON.stringify(req.body.status) +" "+ req.body.destinatary+" "+ req.body.amount +" "+ req.body.doc_path +" "+ req.body.signed_date);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.title, 
            req.body.date, 
            JSON.stringify(req.body.status), 
            req.body.destinatary, 
            req.body.amount, 
            req.body.doc_path, 
            req.body.signed_date,
            req.body.related_to,
            req.body.content_html
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The contract has been successfully saved."}); }
    }catch(err){
        next(err);
    }
};
exports.updateContract = async(req,res,next) => {
    var sql = 'update contracts set title=?,date=?,status=?, destinatary=?, amount=?, document_path=?, signed_date=?, related_to=?, content_html=? WHERE id = '+req.body.id;
    console.log(req.body.title +" "+ req.body.date +" "+ req.body.status+" "+ req.body.destinatary+" "+ req.body.amount +" "+ req.body.doc_path +" "+ req.body.signed_date+" "+ req.body.id);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.title, 
            req.body.date, 
            JSON.stringify(req.body.status), 
            req.body.destinatary, 
            req.body.amount, 
            req.body.doc_path, 
            req.body.signed_date,
            req.body.related_to,
            req.body.content_html
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The contract has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getContract = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `contracts` WHERE `id`=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No contract found" });
    }catch(err){
        next(err);
    }
};
exports.getAllContracts = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM contracts");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No contracts found" });
    }catch(err){
        next(err);
    }
};