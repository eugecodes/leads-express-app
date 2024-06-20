const conn = require('../db');

// Get System Users

exports.getBooking = async(req, res, next) => {
    try{
        conn.query("select * from calendar where id = " + req.params.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/bookings', { records: JSON.parse(JSON.stringify(result)), message: "" });
                }else{
                    return res.render('pages/bookings', { records: [], message:"No booking with this id has been found." });
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.updateBooking =  async(req, res, next) => {
    var txt_type = req.body.type;
    var startdatetime = req.body.datetimepicker_eventstart;
    var enddatetime = req.body.datetimepicker_eventend;
    var title = req.body.description;
    var repeat = req.body.repeats;
    var venue = req.body.venue;
    var details = req.body.details;
    console.log(req.body);

    try{
        conn.query("insert into calendar (type, datetime_from, datetime_to, title, does_not_repeat, place_of_meeting, status, details) values (?, ?, ?, ?, ?, ?, ?, ?)",[ txt_type,startdatetime, enddatetime, title, repeat, venue, 1, details], function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
        });
    }catch(err){
        next(err);
    }
    res.redirect('/bookings');
};

exports.getBookings = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM calendar", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/bookings',{ records: JSON.parse(JSON.stringify(result)), message: "" });
                }else{
                    return res.render('pages/bookings',{ records: [], message:"No bookings found" });
                }
            }
        });
    }catch(err){
        next(err);
    }
};

/*exports.getLeads = function () {
    try{
        console.log("row");
        var [row] = conn.execute("SELECT * FROM leads");
        console.log(row);
        if(row.length > 0){ 
            return { results: row }; 
        }else{
            return { message:"There's no leads yet." };
        }      
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getLeadContacts = async (req, res, next) => {
    try{
        const [row] = await conn.execute("SELECT * FROM leads_contacts where related_to like '%lead: "+req.body.id+"%'");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No contacts have been found for this lead." });
    }catch(err){
        next(err);
    }
}

exports.getLeadBookings = async (req, res, next) => {
    try{
        const [row] = await conn.execute("SELECT * FROM calendar where related_to like '%lead: "+req.body.id+"%'");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No bookings have been found for this lead." });
    }catch(err){
        next(err);
    }
}

exports.getLeadInvoices = async (req, res, next) => {
    try{
        const [row] = await conn.execute("SELECT * FROM invoices where related_to like '%lead: "+req.body.id+"%'");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No invoices have been found for this lead." });
    }catch(err){
        next(err);
    }
}

exports.getLeadContracts = async (req, res, next) => {
    try{
        const [row] = await conn.execute("SELECT * FROM contracts where related_to like '%lead: "+req.body.id+"%'");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No contracts have been found for this lead." });
    }catch(err){
        next(err);
    }
}

exports.getLeadMessages = async (req, res, next) => {
    try{
        const [row] = await conn.execute("SELECT * FROM messages where related_to like '%lead: "+req.body.id+"%'");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No messages have been found for this lead." });
    }catch(err){
        next(err);
    }
}

exports.getLeadMessages = async (req, res, next) => {
    try{
        const [row] = await conn.execute("SELECT * FROM notes where related_to like '%lead: "+req.body.id+"%'");
        if(row.length > 0){ return res.json({lead:row}); }
        res.json({ message:"No messages have been found for this lead." });
    }catch(err){
        next(err);
    }
}
*/