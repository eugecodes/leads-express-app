const express = require('express')
const bootstrap = require('bootstrap')
const app = express()
const port = 3000

var mysql = require('mysql');
var bodyparser = require('body-parser');	
var session = require('express-session');

var User = require('/models/user');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'manatee_events'
  });

connection.connect();
/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
*/
/* SYSTEM USERS*/
app.post('/signup', (req, res) => {
    var fullname = req.body.fullname;
    var user = req.body.username;
    var pass = req.body.password;
    var active = 1; // later add to send an email asking for verification and to change password before activating the user

    var sql = "INSERT INTO `system_users`(fullname`, `user`, `password`, `active`) VALUES ('"+fullname+"','"+user+"','"+pass+"','"+active+"')";                           
    db.query(sql, function(err, results){      
        if(results.length){
            res.render('Successfull');
        }else{
            res.render('Error ' + err);
        }
    });
});
app.post('/login', (req, res) => {

});
app.post('/update_user', (req, res) => {
    var fullname = req.body.fullname;
    var user = req.body.username;
    var pass = req.body.password;
    var active = req.body.active; // later add to send an email asking for verification and to change password before activating the user

    var sql = "select id from `system_users` where fullname = '"+fullname+"' AND `user`=  '"+user+"';";                           
    db.query(sql, function(err, results){      
        if(results.length){
            var id = results.id;
            var sql_update = "UPDATE `system_users` SET fullname`='"+fullname+"',`user`='"+user+"',`password`='"+password+"',`active`='"+active+"' WHERE id = "+id;
            db.query(sql_update, function(err, results){
                if(results.length){
                    res.sender('Successfull');
                }else{
                    res.sender('Error ' + err);
                }
            });
        }else{
            res.render('Error ' + err);
        }        
    });
});
/* LEAD CAPTURE AND COMMUNICATION, CONTACT FORM */
app.get('/', (req, res) => res.send('create-lead | create-lead-dashboard | update-lead | get-lead-history | add-booking ' +
'| modify-booking | get-notifications | answer-lead | '));

app.post('/create-lead', (req, res) => {
    /*
    Save in DB

    ********************************************************************

    Contact form data from website

    -----------------|-----------------|
    Short Team lease | Long Term lease |     TABS
    -----------------|-----------------|

    Name / Surname

    ***Estimated Date / Time Start

    ***Estimated Date / Time End

    Venue (Autocomplete) / Department / House / Unit

    ***Event Type

    Budget

    Preferred contact option

    Phone | Email | Chat with our agent now (or AI Agent)
    |___> please complete phone & preferred time to contact you
              |______> please complete email & preferred time to contact you
                              |_____________> Sends to the AI bot or an agent.

    Urgency -- Need confirmation / set it right now

    -Send Request for Information- 

    ***************************************************************************

    Return:
        - "Thanks! Your request for information has been sent. We'll be contacting you as soon as possible, in your preferred time."
        (Nothing in case of the AI bot / Chat)
    */
});

// Create lead from the dashboard

app.post('/create-lead-dashboard', (req, res) => {
    /*
    Save in DB

    ********************************************************************

    Contact form data from website

    -----------------|-----------------|
    Short Team lease | Long Term lease |     TABS
    -----------------|-----------------|

    Name / Surname

    ***Estimated Date / Time Start

    ***Estimated Date / Time End

    Venue (Autocomplete) / Department / House / Unit

    ***Event Type

    Budget

    Preferred contact option

    Phone | Email | Chat (Skype, Hangouts Account, Other)
    |___> please complete phone & preferred time to contact you
              |______> please complete email & preferred time to contact you
                    |______> please complete chat account & preferred time to contact you

    Urgency -- Need confirmation / set it right now

    (Checkbox) Send email to the lead?

    -Save Lead- 

    ***************************************************************************

    Return / Or Send Email:
        - "Hello @Lead, We'll be contacting you as soon as possible with the desired information, in your preferred time."
        (Or custom enter below and show empty text field)

    */
});

//--- Capture Lead

app.post('/add-booking', function (req, res) {
  res.send('Book a Date for Visit');
});

app.get('/lead-history', function (req, res) {
    res.send('Get the Lead History and Current Status');
});

app.listen(port, () => console.log(`Example app listening on port port!`))