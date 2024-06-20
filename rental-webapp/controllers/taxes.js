const { json } = require('body-parser');
const conn = require('../db');

exports.getTaxes = async(req,res,next) => {
    try{
        conn.query("SELECT * FROM taxes", function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                if(result.length > 0){
                    res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(result)), message: "" }); 
                }else{
                    res.render('pages/taxes',{ records: [], message:"No existent taxes found at the moment." });
                }
            }
        });
    }catch(err){
        next(err);
    }
};

exports.createTax = async(req, res, next) => {
    try {
        conn.query("insert into taxes (percentage, description, status, related_to) values (?,?,?,?)", [req.body.percentage, req.body.description, 1, 'NULL'], function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                conn.query("SELECT * FROM taxes", function (err, result, fields) {
                    if (err) { console.log(`not successful! ${err}`); } 
                    else {
                        if(result.length > 0){
                            res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(result)), message: "" }); 
                        }
                    }
                });
            }
            //res.render('pages/taxes', { records: [], message: "" });
        });
    }catch(err){
        next(err);
    }
};

exports.disableTax = async(req,res,next) => {
    try {
        conn.query("update taxes set status = 0 where id = " + req.params.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                conn.query("SELECT * FROM taxes", function (err, result, fields) {
                    if (err) { console.log(`not successful! ${err}`); } 
                    else {
                        if(result.length > 0){
                            //res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(result)), message: "" }); 
                            //res.redirect('pages/taxes');
                            //return { message: "Tax disabled" };
                            res.redirect('/taxes');
                        }
                    }
                });
            }
        });
    }catch(err){
        next(err);
    }

};

exports.enableTax = async(req,res,next) => {
    try {
        conn.query("update taxes set status = 1 where id = " + req.params.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                conn.query("SELECT * FROM taxes", function (err, result, fields) {
                    if (err) { console.log(`not successful! ${err}`); } 
                    else {
                        if(result.length > 0){
                            //return { message: "Tax enabled" };
                            res.redirect('/taxes');
                            //res.redirect('pages/taxes');
                            //, { records: JSON.parse(JSON.stringify(result)), message: "" }); 
                        }
                    }
                });
            }
            return { message: "Tax not found" };
        });
    }catch(err){
        next(err);
    }
};

exports.removeTax = async(req,res,next) => {
    try {
        conn.query("delete from taxes where id = " + req.params.id, function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
			else {
                conn.query("SELECT * FROM taxes", function (err, result, fields) {
                    if (err) { console.log(`not successful! ${err}`); } 
                    else {
                        if(result.length > 0){
                            res.redirect('/taxes');
                            //res.render('pages/taxes',{ records: JSON.parse(JSON.stringify(result)), message: "" }); 
                        }
                    }
                });
            }
            //res.render('pages/taxes',{ records: [], message: "" });
        });
    }catch(err){
        next(err);
    }
};

exports.updateTax = async(req,res,next) => {
    try {
        conn.query("update taxes set percentage = ?, description = ? where id = " + req.body.id, [req.body.percentage, req.body.description], function (err, result, fields) {
            if (err) { console.log(`not successful! ${err}`); } 
            else{
                res.redirect('/taxes');
                //res.render('pages/taxes',{ records: [], message: "" });   
            }
        });
    }catch(err){
        console.log(err);
    }
};