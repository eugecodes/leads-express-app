const conn = require('../db');

exports.getInvoices = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM invoices", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    conn.query("select id, percentage, description from taxes where status=1", function(err, result1, fields){
                        if (err) { console.log(`not successful! ${err}`); }
                        else{
                            if(result1.length > 0){
                                return res.render('pages/invoices',{ records: JSON.parse(JSON.stringify(result)), message: "", taxes: JSON.parse(JSON.stringify(result1)) });
                            }
                        }
                    });
                }else{
                    return res.render('pages/invoices',{ records: [], message:"No existent invoices found at the moment." });
                }
            }
        });
    }catch(err){
        next(err);
    }
};

exports.updateInvoiceTemplate = async(req, res, next) => {
    try{
        conn.query("update invoices set html_content = ? where id = ?", [req.body.file.content, req.body.template_id], function(err, result, fields){
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                exports.getInvoices(req, res, next);
            }
        });
    }catch(err){
        next(err);
    }
};

exports.createInvoice = async(req,res,next) => {
    var payment_status = 0;
    if(req.body.inv_status=='Paid'){ payment_status = 1; }
    conn.query("insert into invoices (title,document_path,payment_status,payment_date,destinatary,due,amount,html_content,related_to,status,img) values (?,?,?,?,?,?,?,?,?,?,?)",[
        req.body.invoice_title, req.body.file.path+req.body.file.name, payment_status, req.body.payment_date_n, 
        req.body.email_destinatary, req.body.due, req.body.inv_amount, req.body.htmlcontent, '', req.body.inv_status, req.body.img 
    ], function(err,result,fields){
        if (err) { console.log(`not successful! ${err}`); } 
		else {
            exports.getInvoices(req,res,next);
        }
    });
};

/*
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