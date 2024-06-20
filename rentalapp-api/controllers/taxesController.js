const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createTax = async(req,res,next) => {
    var sql = 'insert into taxes (percentage, description, status) values (?,?,?)';
    console.log(req.body.percentage +" "+ JSON.stringify(req.body.description) +" "+ req.body.status);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.percentage, JSON.stringify(req.body.description), req.body.status]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The tax has been successfully created."}); }
    }catch(err){
        next(err);
    }
};
exports.updateTax = async(req,res,next) => {
    var sql = 'UPDATE venues SET percentage = ?,description = ?, status = ? WHERE id = '+req.body.id;
    console.log(req.body.archive_after +" "+ req.body.set_reminder +" "+ req.body.details+" "+ req.body.status);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.percentage, 
            JSON.stringify(req.body.description),
            req.body.status,
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The tax has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getTax = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `taxes` WHERE `id`=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No tax found" });
    }catch(err){
        next(err);
    }
};
exports.getAllTaxes = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM taxes");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No taxes found" });
    }catch(err){
        next(err);
    }
};