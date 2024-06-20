const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createContact = async(req,res,next) => {
    var sql = 'insert into leads_contacts (fullname, email, phone, address, contact_hours, active) values (?,?,?,?,?,?)';
    console.log(req.body.fullname +" "+ req.body.email +" "+ req.body.phone+" "+ req.body.address +" "+ req.body.contact_hours +" "+ req.body.active);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.fullname, req.body.email, req.body.phone, req.body.address, JSON.stringify(req.body.contact_hours), req.body.active]);
        console.log(row);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The Contact has been successfully saved."}); }
    }catch(err){
        next(err);
    }
};
exports.updateContact = async(req,res,next) => {
    var sql = "UPDATE leads_contacts SET fullname = ?,email = ?,phone = ?,address = ?, contact_hours = ?, active = ? WHERE id = "+req.body.id;
    console.log(req.body.fullname +" "+ req.body.email +" "+ req.body.phone+" "+ req.body.address +" "+ JSON.stringify(req.body.contact_hours) +" "+ req.body.active);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.fullname, req.body.email, req.body.phone, req.body.address, JSON.stringify(req.body.contact_hours),JSON.stringify(req.body.active)]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The Contact has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getContact = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "select * from leads_contacts WHERE id=?", [req.params.event_id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No contacts found" });
    }catch(err){
        next(err);
    }
};
exports.getAllContacts = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("select * from leads_contacts");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No contacts found" });
    }catch(err){
        next(err);
    }
};