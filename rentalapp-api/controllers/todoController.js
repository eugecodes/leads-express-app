const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createTodo = async(req,res,next) => {
    var sql = 'insert into `to-do` (details, status, date_for_completion) values (?,?,?)';
    console.log(req.body.details +" "+ req.body.status +" "+ req.body.date_for_completion);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.details, req.body.status, req.body.date_for_completion]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The to-do has been successfully created."}); }
    }catch(err){
        next(err);
    }
};
exports.updateTodo = async(req,res,next) => {
    var sql = 'update `to-do` set details=?,status=?,date_for_completion=? WHERE id=?';
    console.log(req.body.details +" "+ req.body.status +" "+ req.body.date_for_completion);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.details, req.body.status, req.body.date_for_completion, req.body.id]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The to-do has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getTodo = async(req,res,next) => { 
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "select * from `to-do` WHERE id=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No to-do found" });
    }catch(err){
        next(err);
    }
};
exports.getAllTodos = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("select * from `to-do`");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No to-do found" });
    }catch(err){
        next(err);
    }
};