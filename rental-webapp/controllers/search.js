const conn = require('../db');

exports.getSearchResults = async(req, res, next, tables, date_from, date_to, search_term) => {
    //console.log('getsearchresults ' + JSON.stringify(req.body));
    //console.log('tables ' + tables);
    //console.log('date_from ' + date_from + ' date_to ' + date_to);
    var queries = [], query_from = '', query_to = ''; //search_term = '1';
    //let fields_q = [];
    for(var i=0;i<tables.length;i++){
        //console.log('table ' + tables[i]);
        try{            
            const table = tables[i];
            conn.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '"+table+"' AND table_schema = 'rentalapp'", function(err, result){
                if (err) { console.log(`not successful! ${err}`); }
                else{
                    if(result.length > 0){
                        var fields = [], clean_fields = [];
                        for(var f=0;f<result.length;f++){
                            fields.push(result[f].COLUMN_NAME+" like '%"+search_term+"%'");
                            clean_fields.push(result[f].COLUMN_NAME);
                        }
                        try{
                            conn.query("select * from "+table+" where "+fields.join(' or '), function(err, result){
                                if (err) { console.log(`not successful! ${err}`); }
                                else{
                                    queries.push({table: table, fields: clean_fields, results: result});
                                    console.log(queries);
                                    if(queries.length==tables.length){ 
                                        res.render('pages/search', {records: queries}); 
                                    }
                                }
                            });
                        }catch(err){
                            console.log(err)
                        }
                    }
                }
            });
        }catch(err){
            console.log(err);
        } 
    }
};