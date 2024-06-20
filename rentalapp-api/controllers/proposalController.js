const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createProposal = async(req,res,next) => {
    var sql = 'insert into proposals (proposal_date, proposal_lead, proposal, status, file_path, tags, html_content, related_to, img) values (?,?,?,?,?,?,?,?,?)';
    console.log(req.body.proposal_date +" "+ req.body.proposal_lead +" "+ req.body.proposal+" "+ req.body.status +" "+ req.body.file_path +" "+ req.body.tags);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.proposal_date, req.body.proposal_lead, req.body.proposal, req.body.status, req.body.file_path, req.body.tags, req.body.html_content, req.body.related_to, req.body.img]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The proposal has been successfully saved."}); }
    }catch(err){
        next(err);
    }
};
exports.updateProposal = async(req,res,next) => {
    var sql = 'UPDATE proposals SET proposal_date=?,proposal_lead=?,proposal=?,status=?, file_path=?, tags=? WHERE id='+req.body.id;
    console.log(req.body.proposal_date +" "+ req.body.proposal_lead +" "+ req.body.proposal+" "+ req.body.status +" "+ req.body.file_path +" "+ req.body.tags);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.proposal_date, req.body.proposal_lead, req.body.proposal, req.body.status, req.body.file_path, JSON.stringify(req.body.tags)]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The proposal has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getProposal = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "select * from proposals WHERE id=?", [req.params.id] );
        if(row.length > 0){  return res.json({ records:row[0] }); }
        res.json({ message:"No proposals found" });
    }catch(err){
        next(err);
    }
};
exports.getAllProposals = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("select * from proposals");
        if(row.length > 0){ return res.json({records:row}); }
        res.json({ message:"No proposals found" });
    }catch(err){
        next(err);
    }
};