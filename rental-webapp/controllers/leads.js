const conn = require('../db');

// Get Lead & Get Leads & Get Lead Associated Information
// Will be direct consults to the DB, because it's optimized for performance
// Create and Edit will be by the api, because security is higher this way

// A lead has associated:
// - Contacts
// - Bookings
// - Appointments
// - Communications
// - Invoices
// - Contracts
// - Notes

exports.getLeadDetails = async(req,res,next) => {
    var lead_id = Number(req.body.leadid);

    var [r1, r2, r3] = await Promise.all([
        new Promise(resolve => {
            conn.query("select calendar.id, calendar.title, calendar.type, calendar.datetime_from, calendar.datetime_to, calendar.details from calendar_leads left join calendar on calendar.id = calendar_leads.calendarid where calendar_leads.leadid = ? ", [lead_id], function (err, result, fields) {
                if (err) {console.log(`not successful! ${err}`); conn.release();
                }
                console.log("calendar");
                console.log(result);
                resolve(result);
                return result;
            });
        }),
        new Promise(resolve => {
            conn.query("select messages.id, messages.message_date, messages.message_subject, messages.message_body, messages.from, messages.to, messages.status from lead_messages left join messages on messages.id = lead_messages.messageid where lead_messages.leadid = ? ", [lead_id], function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); conn.release(); }
                console.log("message");
                console.log(result);
                resolve(result);
                return result;
            });
        }),
        new Promise(resolve => {
            conn.query("select notes.id, notes.archive_after, notes.details, notes.created, notes.status from lead_notes left join notes on notes.id = lead_notes.noteid where lead_notes.leadid = ? ", [lead_id], function (err, result, fields) {
                if (err) {console.log(`not successful! ${err}`); conn.release(); }
                console.log("notes");
                console.log(result);            
                resolve(result);
                return result;
            });
        })
    ]);

    return res.json({ 
        booking: r1, 
        messages: r2, 
        notes: r3 
    });
};

exports.getLeads = async(req,res,next) => {
    var leads = [];
    var contacts = [];
    var users = [];
    var sql = `
    SELECT leads.id, leads.date_captured, leads.event_start, leads.event_end, status, leads.type_of_event, leads.tags, leads.details
    , vcontacts.contactsobj as contactids
    , vusers_assigned.usersobj as assigneduserids
    , vusers_follow.usersobj as followeruserids
    FROM leads 
    LEFT JOIN ( select lead_contacts.leadid, 
               CONCAT('[', GROUP_CONCAT(json_object('contactid', contacts.id)),']') as contactsobj 
               from lead_contacts 
               left join contacts on contacts.id = lead_contacts.contactid 
               group by lead_contacts.leadid) vcontacts on vcontacts.leadid = leads.id 
    LEFT JOIN ( select lead_users.leadid, 
               CONCAT('[', GROUP_CONCAT(json_object('userid', system_users.id)),']') as usersobj 
               from lead_users 
               left join system_users on system_users.id = lead_users.userid 
               where lead_users.type = 'ASSIGNED'
               group by lead_users.leadid) vusers_assigned on vusers_assigned.leadid = leads.id 
    LEFT JOIN ( select lead_users.leadid, 
               CONCAT('[', GROUP_CONCAT(json_object('userid', system_users.id)),']') as usersobj 
               from lead_users 
               left join system_users on system_users.id = lead_users.userid 
               where lead_users.type = 'FOLLOW'
               group by lead_users.leadid) vusers_follow on vusers_follow.leadid = leads.id;
    `;

    try{
        conn.query(sql, function (err, result, fields) {
            if (err) {
                console.log(`not successful! ${err}`);
            } else {
                if(result.length > 0){
                    leads = result;
                    conn.query("SELECT * FROM contacts ", function (err2, result2, fields2) {
                        if(result2.length > 0){
                            contacts = result2;
                            conn.query("SELECT * FROM system_users ", function (err3, result3, fields3) {
                                users = result3;
                                return res.render('pages/leads',{ 
                                    records: JSON.parse(JSON.stringify(leads)), 
                                    contacts: JSON.parse(JSON.stringify(contacts)),
                                    users: JSON.parse(JSON.stringify(users)) 
                                });
                            });
                        }
                    });
                }
            }
        });    
    }catch(err){
        next(err);
    }
    
};

exports.updateLead = async(req,res,next) => {
    try{
        var contact_hours_from = req.body.contact_hours_from;
        var contact_hours_to  = req.body.contact_hours_to; 
        var tags = req.body.tags;
        var details = req.body.details;
        var status = req.body.statusid;
        var typeofevent = req.body.txttypeofevent;

        var leadid = Number(req.body.leadid);

        if(leadid > 0){
            //update
            conn.query("UPDATE leads SET event_start=?, event_end=?,status=?,type_of_event=?,details=?,tags=? WHERE id=?",[contact_hours_from, contact_hours_to, status, typeofevent, details, tags, leadid], function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); } 
                leadid = result.insertId;
                return res.status(201).json({"leadid": leadid});        
            });
        }else{
            //create
            var sql = `
            INSERT INTO leads (event_start, event_end, status, type_of_event, details, tags) VALUES('${contact_hours_from}','${contact_hours_to}','${status}','${typeofevent}','${details}','${tags}');
            `;
            conn.query(sql, function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); } 
                leadid = result.insertId;
                return res.status(201).json({"leadid": leadid});        
            });
        }
        return leadid;

    }catch(err){
        next(err);
    }
};

exports.addLeadContact = async(req,res,next) => {
    try{
        var leadid = Number(req.body.leadid);
        var contactid = Number(req.body.contactid);

        if (leadid > 0) {
            //create
            conn.query("INSERT INTO lead_contacts (leadid, contactid) VALUES (?, ?);", [leadid, contactid] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); } 
                leadid = result.insertId;
                return res.status(201).json({"message": "done"});
            });
        }
        return leadid;

    }catch(err){
        next(err);
    }
};

exports.deleteLeadContact = async(req,res,next) => {
    try{
        var leadid = Number(req.body.leadid);
        var contactid = Number(req.body.contactid);

        if (leadid > 0) {
            //create
            conn.query("DELETE FROM lead_contacts WHERE leadid = ? AND contactid = ?;", [leadid, contactid] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); }
                return res.status(201).json({"message": "done"});
            });
        }
        return leadid;

    }catch(err){
        next(err);
    }
};

exports.addLeadUser = async(req,res,next) => {
    try{
        var leadid = Number(req.body.leadid);
        var userid = Number(req.body.userid);
        var type = req.body.type;

        if (leadid > 0 && userid > 0) {
            //create
            conn.query("INSERT INTO lead_users (leadid, userid, type) VALUES (?, ?, ?);", [leadid, userid, type] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); } 
                leadid = result.insertId;
                return res.status(201).json({"message": "done"});
            });
        }
        return leadid;

    }catch(err){
        next(err);
    }
};

exports.deleteLeadUser = async(req,res,next) => {
    try{
        var leadid = Number(req.body.leadid);
        var userid = Number(req.body.userid);
        var type = req.body.type;

        if (leadid > 0 && userid > 0) {
            //create
            conn.query("DELETE FROM lead_users WHERE leadid = ? AND userid = ? AND type = ?", [leadid, userid, type] , function (err, result, fields) {
                if (err) { console.log(`not successful! ${err}`); }
                return res.status(201).json({"message": "done"});
            });
        }
        return leadid;

    }catch(err){
        next(err);
    }
};


exports.deleteLead =  function (req, res) {
    var lead_id = req.body.lead_id;
    conn.query("DELETE FROM leads WHERE id = "+lead_id, function (err, result, fields) {
        if (err) { console.log(`not successful! ${err}`); } 
        else {
            return "deleted";
        }
    });
    return "deleted";
};


/*exports.getLeadContacts = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM leads_contacts where related_to like '%lead: "+req.body.id+"%'", function (err, result, fields) {
            if (err) {console.log(`not successful! ${err}`);
            } else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No contacts have been found for this lead." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getLeadBookings = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM calendar where related_to like '%lead: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No bookings have been found for this lead." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getLeadInvoices = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM invoices where related_to like '%lead: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No invoices have been found for this lead." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getLeadContracts = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM contracts where related_to like '%lead: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No contracts have been found for this lead." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getLeadMessages = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM messages where related_to like '%lead: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No messages have been found for this lead." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getLeadNotes = async (req, res, next) => {
    try{
        conn.query("SELECT * FROM notes where related_to like '%lead: "+req.body.id+"%'", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ lead: result });
                }else{
                    return res.json({ message:"No notes have been found for this lead." });
                }
            }
        });
    }catch(err){
        next(err);
    }
}
*/