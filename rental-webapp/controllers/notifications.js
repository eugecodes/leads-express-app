const conn = require('../db');
const util = require('../public/js/util.js');
const fs = require('fs'), path = require('path');
const { forEach } = require('lodash');
// Get Notifications
// Will be direct consults to the DB, because it's optimized for performance

exports.getNotifications = async(req,res,next) => {
    conn.query("select * from notifications where date = '"+util.todaysdate()+"'", function (err, result, fields) {
        if (err) { console.log(`not successful! ${err}`); } else {
            //If successful, inform as such
            //console.log(`Query was successful, ${result}`);
            conn.query("select * from calendar", function(err, result){
                if(err){ console.log(`not successful! ${err}`); }else{
                    if(result.length > 0){
                        var events = [];
                        result.forEach(function(record){
                            var from = record.datetime_from.toISOString(), to = record.datetime_to.toISOString();
                            var status = 'Active'; if(record.status==0||record.status=='0'){ status='Cancelled';}
                            events.push({
                                "id": record.id,
                                "title": record.title,
                                "type": record.type,
                                "datetime_from": from.split('T')[0],
                                "datetime_to": to.split('T')[0],
                                "starttime": from.split('T')[1].split(':')[0]+':'+from.split('T')[1].split(':')[1],
                                "endtime": to.split('T')[1].split(':')[0]+':'+to.split('T')[1].split(':')[1],
                                "color": record.color,
                                "url": record.url,
                                "repeats": record.does_not_repeat,
                                "venue": record.place_of_meeting,
                                "related": record.related_to,
                                "participants": record.participants,
                                "status": status,
                                "details": record.details
                            });
                        });
                        var temppath = path.resolve(__dirname, '../public/events.json');
                        fs.writeFile(temppath, JSON.stringify({"monthly": events},null,4), function (err) {
                            if (err) throw err;
                            console.log('Events Updated!');
                        });
                    }
                }
            });
            if(result.length > 0){
                return res.render('pages/index',{ records: JSON.parse(JSON.stringify(result)) });
            }else{
                res.render('pages/index',{ records: {message: "No notifications found"} });
            }
        }
    });
};