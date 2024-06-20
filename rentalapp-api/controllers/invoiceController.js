const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createInvoice = async(req,res,next) => {
    var sql = 'insert into invoices (title, document_path, status, payment_status, payment_date, destinatary, due, amount) values (?,?,?,?,?,?,?,?)';
    console.log(req.body.title +" "+ req.body.doc_path +" "+ req.body.status +" "+ req.body.payment_status+" "+ req.body.payment_date+" "+ req.body.destinatary +" "+ req.body.due +" "+ req.body.amount);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.title, 
            req.body.doc_path,
            req.body.status, 
            req.body.payment_status, 
            req.body.payment_date,
            req.body.destinatary, 
            req.body.due, 
            req.body.amount
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The invoice has been successfully saved & sent."}); }
    }catch(err){
        next(err);
    }
};
exports.updateInvoice = async(req,res,next) => {
    var sql = 'update invoices set title=?, document_path=?, status=?, payment_status=?, payment_date=?, destinatary=?, due=?, amount=? WHERE id='+req.body.id;
    console.log(req.body.title +" "+ req.body.doc_path +" "+ req.body.status + " " + req.body.payment_status+" "+ req.body.payment_date+" "+ req.body.destinatary +" "+ req.body.due +" "+ req.body.amount+" "+ req.body.id);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.title, req.body.doc_path, req.body.status, req.body.payment_status, req.body.payment_date, req.body.destinatary, req.body.due, req.body.amount]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The invoice has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getInvoice = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `invoices` WHERE `id`=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No invoice found" });
    }catch(err){
        next(err);
    }
};
exports.getAllInvoices = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM invoices");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No invoices found" });
    }catch(err){
        next(err);
    }
};