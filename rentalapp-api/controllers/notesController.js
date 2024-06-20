const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createNote = async(req,res,next) => {
    var sql = 'insert into notes (archive_after, set_remainder, details, status) values (?,?,?,?)';
    console.log(req.body.archive_after +" "+ JSON.stringify(req.body.set_reminder) +" "+ req.body.details+" "+ req.body.status);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.archive_after, JSON.stringify(req.body.set_reminder), req.body.details, req.body.status]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The note has been successfully created."}); }
    }catch(err){
        next(err);
    }
};
exports.updateNote = async(req,res,next) => {
    var sql = 'UPDATE notes SET archive_after = ?,set_remainder = ?, details = ?,status = ? WHERE id = '+req.body.id;
    console.log(req.body.archive_after +" "+ req.body.set_reminder +" "+ req.body.details+" "+ req.body.status);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.archive_after, 
            JSON.stringify(req.body.set_reminder), 
            req.body.details, 
            req.body.status,
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The note has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getNote = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `notes` WHERE `id`=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No note found" });
    }catch(err){
        next(err);
    }
};
exports.getAllNotes = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM notes");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No notes found" });
    }catch(err){
        next(err);
    }
};