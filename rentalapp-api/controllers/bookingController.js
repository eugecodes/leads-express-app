const conn = require('../db').promise();
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.createBooking = async(req,res,next) => {
    var sql = 'insert into calendar (type, datetime_from, datetime_to, title, does_not_repeat, place_of_meeting, related_to, participants, status, details) values (?,?,?,?,?,?,?,?,?,?)';
    console.log(req.body.booking_type +" "+ req.body.when_booking_start +" "+ req.body.when_booking_end+" "+ req.body.title +" "+ req.body.repeats +" "+ req.body.place_of_meeting+" "+req.body.related_to+" "+req.body.participants+" "+ req.body.status+" "+ req.body.booking_details);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, [req.body.booking_type, req.body.when_booking_start, req.body.when_booking_end, req.body.title, req.body.repeats, req.body.place_of_meeting, req.body.related_to, req.body.participants, req.body.status, req.body.booking_details]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The bookings or event has been successfully saved."}); }
    }catch(err){
        next(err);
    }
};
exports.updateBooking = async(req,res,next) => {
    var sql = "UPDATE calendar SET type = ?, datetime_from = ?, datetime_to = ?, title = ?, does_not_repeat = ?, place_of_meeting = ?, related_to = ?, participants = ?, status = ?, details = ? WHERE id=" + req.body.id;
    console.log(req.body.booking_type +" "+ req.body.when_booking_start +" "+ req.body.when_booking_end+" "+ req.body.title +" "+ req.body.repeats +" "+ req.body.place_of_meeting+" "+ req.body.participants+" "+ req.body.status+" "+ req.body.booking_details);
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute(sql, 
        [
            req.body.booking_type, 
            req.body.when_booking_start, 
            req.body.when_booking_end, 
            req.body.title, 
            req.body.repeats, 
            req.body.place_of_meeting, 
            req.body.related_to, 
            req.body.participants, 
            req.body.status, 
            req.body.booking_details,
        ]);
        if (row.affectedRows === 1) { return res.status(201).json({ message: "The note has been successfully updated."}); }
    }catch(err){
        next(err);
    }
};
exports.getBooking = async(req,res,next) => {
    try{
        
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({ message: "Please provide the token" }); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute( "SELECT * FROM `calendar` WHERE `id`=?", [req.params.booking_id] );
        if(row.length > 0){  return res.json({ lead:row[0] }); }
        res.json({ message:"No booking found" });
    }catch(err){
        next(err);
    }
};
exports.getAllBookings = async(req,res,next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){ return res.status(422).json({message: "Please provide the token"}); }
        const theToken = req.headers.authorization.split(' ')[1];
        if(!jwt.verify(theToken, 'the-super-strong-secret')){ return res.status(422).json({ message: "Token invalid" }); }
        const [row] = await conn.execute("SELECT * FROM calendar");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No bookings found" });
    }catch(err){
        next(err);
    }
};