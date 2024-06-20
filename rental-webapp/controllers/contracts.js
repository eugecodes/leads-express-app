const conn = require('../db');

// Get Contract & Get Contracts & Get Associated Information
// Will be direct consults to the DB, because it's optimized for performance
// Create and Edit will be by the api, because security is higher this way

// A contract has associated:
// - Contacts
// - Communications
// - Invoices
// - Contracts
// - Notes

exports.getContract = function (req, res) {
    try{
        conn.query("SELECT * FROM contracts where id = " + req.body.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ results: result });
                }else{
                    return res.json({ message: "No contract with this id has been found." });
                }
            }
        });
    }catch(err){
        return res.json(err);
    }
}
exports.getContracts = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM contracts", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/contracts',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.json({ message:"No contracts found" });
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