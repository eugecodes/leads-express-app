const conn = require('../db');

exports.getProposals = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM proposals", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    conn.query("select id, short_description from leads", function(err2, result2, fields) {
                        if(err) { console.log(`not successful! ${err2}`); }else{
                            return res.render('pages/proposals',{ 
                                records: JSON.parse(JSON.stringify(result)), 
                                message: "", 
                                leads: JSON.parse(JSON.stringify(result2)) 
                            });
                        }
                    });
                }else{
                    return res.render('pages/proposals',{ records: [], leads: [], message: "No existent proposals found at the moment." });
                }
            }
        });
    }catch(err){
        next(err);
    }
};

exports.removeProposal = async(req, res, next) => {
    try {
        conn.query('delete from proposals where id = '+req.params.id, function(err, result) {
            if(err){ console.log(`not successfull ${err}`); }else{
                module.exports.getProposals(req, res);
            }
        });
    } catch(err){
        next(err);
    }
};

exports.cloneProposal = async(req,res,next) => {
    try {
        console.log(req.body);
        conn.query("select * from proposals where id = "+req.body.tobecloned_id, function (err, result, fields) {
            if (err) { console.log(`not successfull ${err}`); }
            else {
                if(result.length > 0){
                    var data = [
                        result[0].proposal_date,
                        result[0].proposal_lead,
                        req.body.proposal_title,
                        result[0].status,
                        result[0].file_path,
                        result[0].tags,
                        result[0].html_content,
                        result[0].related_to,
                        result[0].img
                    ];
                    try {
                        var sql = 'insert into proposals (proposal_date, proposal_lead, proposal, status, file_path, tags, html_content, related_to, img) values (?,?,?,?,?,?,?,?,?)';
                        conn.execute(sql, data);
                        res.redirect('/proposals');
                        module.exports.getProposals(req, res);
                    }catch(err){
                        next(err);
                    }
                }
            }
        });
    }catch(err){
        next(err);
    }
};
/*
exports.createTax = async(req,res,next) => {
    try {
        var sql = "insert into taxes (percentage, description, status, related_to) values (?,?,?,?)";
        var [row] = await conn.execute(sql, [req.body.percentage, req.body.description, 1, 'NULL']);
        [row] = await conn.execute("SELECT * FROM taxes");
        if(row.length > 0){ return res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(row)), message: "" }); }
    }catch(err){
        next(err);
    }
};

exports.disableTax = async(req,res,next) => {
    try {
        var sql = "update taxes set status = 0 where id = " + req.params.id;
        var [row] = await conn.execute(sql);
        [row] = await conn.execute("SELECT * FROM taxes");
        if(row.length > 0){ return res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(row)), message: "" }); }
    }catch(err){
        next(err);
    }
};

exports.enableTax = async(req,res,next) => {
    try {
        var sql = "update taxes set status = 1 where id = " + req.params.id;
        var [row] = await conn.execute(sql);
        [row] = await conn.execute("SELECT * FROM taxes");
        if(row.length > 0){ return res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(row)), message: "" }); }
    }catch(err){
        next(err);
    }
};

exports.removeTax = async(req,res,next) => {
    try {
        var sql = "delete from taxes where id = " + req.params.id;
        var [row] = await conn.execute(sql);
        [row] = await conn.execute("SELECT * FROM taxes");
        if(row.length > 0){ return res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(row)), message: "" }); }
    }catch(err){
        next(err);
    }
};

exports.updateTax = async(req,res,next) => {
    try {
        var sql = "update taxes set percentage = ?, description = ? where id = " + req.body.id;
        var [row] = await conn.execute(sql, [req.body.percentage, req.body.description]);
        [row] = await conn.execute("SELECT * FROM taxes");
        if(row.length > 0){ return res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(row)), message: "" }); }
    }catch(err){
        next(err);
    }
};
*/