const conn = require('../db');
// Get System Users

exports.getVenue = function (req, res) {
    try{
        conn.query("SELECT * FROM venues where id = " + req.params.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ results: result });
                }else{
                    return res.json({ message:"No venue with this id has been found." });
                }
            }
        });  
    }catch(err){
        return res.json(err);
    }
}
exports.getVenues = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM venues", function (err, result) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/venues',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.json({ message: "No venues found" });
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.getVenuesNotes = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM venues", function (err, result) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/venues',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.json({ message: "No venues found" });
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.getVenuesLeads = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM venues", function (err, result) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/venues',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.json({ message: "No venues found" });
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.getVenuesBookings = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM bookings where related_to like '%venue%'", function (err, result) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    var data = [];
                    for(var i=0;i<result.length;i++){
                        var related_to_obj = JSON.parse(result[i].related_to);
                        var venues = related_to_obj['venue'];
                        venues.array.forEach(element => {
                            if(element == req.params.id){
                                data.push(result[i]);
                            }
                        });
                    }
                    return res.render('pages/venues',{ records: JSON.parse(JSON.stringify(data)) });
                }else{
                    return res.json({ message: "No bookings for this venue found" });
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.updateVenue = async(req, res, next, data) => {
    try {
        conn.query("update venues set venue=?, description=?, image=? where id=?", [data.venue, data.description, data.image, req.body.venue_id],function(err, result){
            if (err) { console.log(`not successful! ${err}`); }
            else {
                if(result.changedRows){
                    exports.getVenues(req, res);
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.removeVenue = async(req, next) => {
    console.log('entró aqui');
    try {
        conn.query("delete from venues where id = " + req.params.id, function(err, result) {
            if (err) { console.log(`not successful! ${err}`); }
            else { 
                if(result.length > 0){
                    exports.getVenues(req, res);
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.enableOrDisableVenue = async(req, res, next) => {
    try {
        conn.query("update venues set status=" + req.params.status + " where id=" + req.params.id, function(err, result) {
            if (err) { console.log(`not successful! ${err}`); }
            else {
                if(result.changedRows){
                    exports.getVenues(req, res);
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