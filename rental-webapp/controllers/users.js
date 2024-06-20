const conn = require('../db');
const md5 = require('md5');

exports.getUser = function (req, res) {
    try{
        conn.query("SELECT * FROM system_users where id = " + req.params.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.json({ results: result });
                }else{
                    return res.json({ message:"No user with this id has been found." });
                }
            }
        });
        /*const [row] = conn.execute("SELECT * FROM system_users where id = " + req.params.id);
        if(row.length > 0){ return res.json({results:row}); }else{
            return res.json({ message:"No user with this id has been found." });
        }*/
    }catch(err){
        return res.json(err);
    }
};
exports.createUser = async(req, res, next) => {
    console.log('create-user');
    let msg = ''; console.log(req.body.enabled_n);
    if(!req.body.enabled_n){ req.body.enabled_n=0; }else{ req.body.enabled_n=1;}
    try{
        conn.query("SELECT user FROM system_users WHERE user=?", [req.body.user_n], function(err, result, fields){
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    msg = 'Username already in use';
                }else{
                    conn.query("insert into system_users (fullname,user,password,active,email,phone,related_to) values (?,?,?,?,?,?,NULL)",[
                        req.body.fullname_n,
                        req.body.user_n,
                        md5(req.body.pass_n),
                        req.body.enabled_n,
                        req.body.email_n,
                        req.body.phone_n
                    ], function(err, result1, fields){
                        if (err) { console.log(`not successful! ${err}`); }
                        else{
                            if (result1.affectedRows === 1) { msg = "The user has been successfully inserted."; }
                            exports.getUsers(req, res, next);
                        }
                    });
                }
            }
        });
    }catch(err){
        next(err);
    }
};
exports.deleteUser = async(req, res, next) => {
    try{
        conn.query("delete from system_users where id = ?", [req.params.id], function(err, result, fields){
            if (err) { console.log(`not successful! ${err}`); }
            else{
                exports.getUsers(req, res, next);
            }
        });
    }catch(err){
        next(err);
    }
};
exports.updateUser = async(req, res, next) => {
    try{
        conn.query("update system_users set fullname=?, user=?, password=?, active=?, email=?, phone=?, related_to=NULL where id=?", [
            req.body.fullname_n,
            req.body.user_n,
            md5(req.body.pass_n),
            req.body.enabled_n,
            req.body.email_n,
            req.body.phone_n,
            req.body.id_n
        ], function(err, result, fields){
            if (err) { console.log(`not successful! ${err}`); }
            else{
                exports.getUsers(req, res, next);
            }
        });
    }catch(err){
        next(err);
    }
};
exports.getUsers = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM system_users", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    return res.render('pages/users',{ records: JSON.parse(JSON.stringify(result)) });
                }else{
                    return res.json({ message: "No users found" });
                }
            }
        });
        /*
        const [row] = await conn.execute("SELECT * FROM system_users");
        if(row.length > 0){
            return res.render('pages/users',{ records: JSON.parse(JSON.stringify(row)) });
        }
        res.json({ message:"No users found" });
        */
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