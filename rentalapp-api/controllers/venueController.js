const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createVenue = async(req,res,next) => {
    var sql = 'insert into venues (venue, description, status, image) values (?,?,?,?)';
    console.log(req.body.venue +" "+ JSON.stringify(req.body.description) +" "+ req.body.status+" "+ req.body.image);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.venue, req.body.description, req.body.status, req.body.image]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The venue has been successfully created."}); }
    }catch(err){
        next(err);
    }
};
exports.updateVenue = async(req,res,next) => {
    var sql = 'UPDATE venues SET venue = ?,description = ?, status = ?,image = ? WHERE id = '+req.body.id;
    console.log(req.body.venue +" "+ JSON.stringify(req.body.description) +" "+ req.body.status+" "+ req.body.image);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [
            req.body.venue, 
            req.body.description, 
            req.body.status, 
            req.body.image,
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The venue has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getVenue = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `venues` WHERE `id`=?", [req.params.id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No venue found" });
    }catch(err){
        next(err);
    }
};
exports.getAllVenues = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM venues");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No venues found" });
    }catch(err){
        next(err);
    }
};