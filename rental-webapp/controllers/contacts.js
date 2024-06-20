const conn = require('../db');

// Get LeadContact Associated Information
// Will be direct consults to the DB, because it's optimized for performance
// Create and Edit will be by the api, because security is higher this way

// A contact has associated:
// - Notes
// - Bookings
// - Appointments
// - Communications

exports.getAttendees = async(attendees_ids, event_id) =>{
    console.log("attendees "+attendees_ids);
    attendees_ids = attendees_ids.toString();
    attendees_ids = attendees_ids.split(',').map(function(item) {return ' id='+item;}).join(' or');
    var attendees_res = [];
    console.log(attendees_ids);
    conn.query("select fullname, email from contacts where "+attendees_ids, function (err, result, fields) {
        console.log('here2');
        if (err) { console.log(`not successful! ${err}`); }
        if(result.length > 0){
            console.log('first ' + result);
            conn.query("select participant_role, participant_status from calendar where id=?", event_id, function(err, result2, fields){
                if (err) { console.log(`not successful! ${err}`); }
                if(result2.length > 0){
                    var roles = result2.participant_role.split(','), status = result2.participant_status.split(',');
                    for(var i=0;i<result.length;i++){
                        attendees_res.push({
                            name: result.fullname,
                            email: result.email,
                            rsvp: true,
                            partstat: status[i],
                            role: roles[i]
                        });
                    }
                    return attendees_res;
                }
            });
        }
    });
};

exports.updateContact  = async (req, res, next) => {
    try{
        var contactid = Number(req.body.contactid);
        var fullname = req.body.fullname;
        var email = req.body.email;
        var phone = req.body.phone;
        var address = req.body.address;
        var contact_hours = "From: " + req.body.contact_from +  " To: " + req.body.contact_to;
        var phone = req.body.phone;
        var address = req.body.address;

        if (contactid > 0) {
            conn.query("UPDATE `contacts` SET `fullname`=?,`phone`=?,`email`=?,`address`=?,`contact_hours`=? WHERE id = ?", [fullname, phone, email, address, contact_hours, contactid] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); } 
                return res.status(201).json({"message": "updated", "contactid": contactid});
            });
        } else {
            //create
            conn.query("INSERT INTO `contacts`(`fullname`, `phone`, `email`, `address`, `contact_hours`, `active`) VALUES (?, ?, ?,  ?, ?, 1)", [fullname, phone, email,  address, contact_hours] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); } 
                contactid = result.insertId;
                return res.status(201).json({"message": "done", "contactid": contactid});
            });
        }
        return 0;

    }catch(err){
        next(err);
    }
};

exports.deleteContact  = async (req, res, next) => {
    try {
        var contactid = Number(req.body.contactid);

        if (contactid > 0) {
            conn.query("DELETE FROM `contacts` WHERE id = ? ", [contactid] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); }
                return res.status(201).json({"message": "contact deleted", "contactid": contactid});
            });
        }
        return 0;

    }catch(err){
        next(err);
    }
};

/*
exports.getContactNotes = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM notes where related_to like '%contact: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No notes have been found for this contact." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getContactBookings = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM calendar where related_to like '%contact: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No appointments have been found for this contact." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getContactMessages = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM messages where related_to like '%contact: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No messages have been found for this contact." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}
*/