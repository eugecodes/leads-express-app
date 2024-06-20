const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createLead = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(422).json({ errors: errors.array() }); }
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){
            return res.status(422).json({
                message: "Token invalid"
            });
        }
        console.log(req.body.event_start + " " + // DATETIME - Can be one day, one week, one month or some hours !@ The rental time is flexible with this
            req.body.event_end + " " + // DATETIME - Can be one day, one week, one month or some hours 
            req.body.status + " " + // Awaiting Answer, Sucessfully captured, In Process, On Hold, Finished, -- Lead Capture, Proposal, proposal sign, invoicing, invoice payment, Contract, Contract Sign
            JSON.stringify(req.body.event_contacts) + " " +
            req.body.type_of_event + " " +
            req.body.users_assigned + " " +
            req.body.users_to_be_notified + " " +
            req.body.tags + " " +
            req.body.event_details);
        const [rows] = await conn.execute('INSERT INTO leads (event_start,event_end,status,contacts,type_of_event,users_assigned,following,tags,details) VALUES(?,?,?,?,?,?,?,?,?)', 
        [
            req.body.event_start, // DATETIME - Can be one day, one week, one month or some hours !@ The rental time is flexible with this
            req.body.event_end, // DATETIME - Can be one day, one week, one month or some hours 
            req.body.status, // Awaiting Answer, Sucessfully captured, In Process, On Hold, Finished, -- Lead Capture, Proposal, proposal sign, invoicing, invoice payment, Contract, Contract Sign
            JSON.stringify(req.body.event_contacts),
            req.body.type_of_event,
            JSON.stringify(req.body.users_assigned),
            JSON.stringify(req.body.users_to_be_notified),
            JSON.stringify(req.body.tags),
            JSON.stringify(req.body.event_details)
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The lead has been successfully created.",
            });
        }

    }catch(err){
        next(err);
    }
};
exports.updateLeadDate = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(422).json({ errors: errors.array() }); }
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){
            return res.status(422).json({
                message: "Token invalid"
            });
        }
        console.log(req.body.event_start + " | " + req.body.event_end);
        const [rows] = await conn.execute("UPDATE leads SET event_start='?',event_end='?' WHERE id = " + req.body.event_id, 
        [
            req.body.event_start,
            req.body.event_end
        ]);
        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The lead has been successfully updated.",
            });
        }
    }catch(err){
        next(err);
    }
};
exports.updateLeadAssignedUsers = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(422).json({ errors: errors.array() }); }
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){return res.status(422).json({ message: "Please provide the token",});}
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){
            return res.status(422).json({
                message: "Token invalid"
            });
        }
        console.log(JSON.stringify(req.body.assigned_users));
        const [row] = await conn.execute('update leads set users_assigned=? WHERE id=?', [JSON.stringify(req.body.assigned_users), req.body.event_id]);
        if (row.affectedRows === 1) {return res.status(201).json({ message: "The lead has been successfully updated.",}); }
    }catch(err){
        next(err);
    }
};
exports.updateLeadUsersTobeNotified = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(422).json({ errors: errors.array() }); }
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){
            return res.status(422).json({ message: "Please provide the token" });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){
            return res.status(422).json({ message: "Token invalid" });
        }
        console.log(JSON.stringify(req.body.users_tobe_notified));
        const [rows] = await conn.execute("UPDATE leads SET following='"+JSON.stringify(req.body.users_tobe_notified)+"' WHERE id = " + req.body.event_id);
        if (rows.affectedRows === 1) {
            return res.status(201).json({ message: "The lead has been successfully updated." });
        }
    }catch(err){
        next(err);
    }
};
exports.updateLeadStatus = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(422).json({ errors: errors.array() }); }
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        console.log(JSON.stringify(req.body.event_status));
        const [rows] = await conn.execute("UPDATE leads SET status='"+req.body.event_status+"' WHERE id = " + req.body.event_id);
        if (rows.affectedRows === 1) {
            return res.status(201).json({ message: "The lead has been successfully updated." });
        }
    }catch(err){
        next(err);
    }
};
exports.updateLeadDetails = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(422).json({ errors: errors.array() }); }
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        console.log(JSON.stringify(req.body.event_details));
        const [rows] = await conn.execute("UPDATE leads SET details='"+JSON.stringify(req.body.event_details)+"' WHERE id = " + req.body.event_id);
        if (rows.affectedRows === 1) {
            return res.status(201).json({ message: "The lead has been successfully updated." });
        }
    }catch(err){
        next(err);
    }
};
exports.getLead = async (req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `leads` WHERE `id`=?", [req.params.event_id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No lead found" });
    }catch(err){
        next(err);
    }
};
exports.getAllLeads = async (req,res,next) => {

    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(
            "SELECT * FROM leads"
        );

        if(row.length > 0){
            return res.json({
                lead:row
            });
        }
        res.json({
            message:"No lead found"
        });
        
    }
    catch(err){
        next(err);
    }
};
exports.updateLead = async(req,res,next) => {
    const errors = validationResult(req);

    const lead_fields = ['event_start', 'event_end', 'status', 'contacts', 'type_of_event', 'users_assigned', 'following', 'tags', 'details'];
    var fields = '';
    var field_values = [];
    for(var i=0;i<lead_fields.length;i++){
        if(req.body[lead_fields[i]]){
            fields = fields + '="?",';
            field_values[i] = req.body[lead_fields[i]];
        }
    }
    fields = fields.substring(0, fields.length - 1);
    console.log(fields);
    console.log(field_values);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        if(
            !jwt.verify(theToken, 'the-super-strong-secret')
        ){
            return res.status(422).json({
                message: "Token invalid"
            });
        }


// 'UPDATE `leads` SET `event_start`="?",`event_end`="?",`status`="?",`contacts`="?",`type_of_event`="?",`users_assigned`="?",`following`="?",`tags`="?",`details`="?" WHERE `id`=?'
        const [rows] = await conn.execute('UPDATE leads SET '+fields+' WHERE id=?', 
        [
            field_values
            /*req.body.event_start, // DATETIME - Can be one day, one week, one month or some hours !@ The rental time is flexible with this
            req.body.event_end, // DATETIME - Can be one day, one week, one month or some hours 
            status, // Awaiting Answer, Sucessfully captured, In Process, On Hold, Finished, -- Lead Capture, Proposal, proposal sign, invoicing, invoice payment, Contract, Contract Sign
            req.body.event_contacts,
            req.body.type_of_event,
            req.body.users_assigned,
            req.body.users_to_be_notified,
            req.body.tags,
            req.body.event_details,
            req.body.event_id*/
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The lead has been successfully updated.",
            });
        }

    }catch(err){
        next(err);
    }
};