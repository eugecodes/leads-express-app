/*app.post('/leads', function (req, res){
    console.log(req.body);
    console.log(req.session.user);
    var result = '', records = ''; // Safe start
    var data = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        contact_hours: 'From ' + req.body.contact_hours1 + ' To ' + req.body.contact_hours2,
        active: 1
    };
    fetch(endpoint+'/add-contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Authorization': 'Bearer ' + req.session.user,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(result => {
        console.log(result);
        fetch(endpoint+'/get-all-contacts', {method: 'GET', headers: {'Authorization': 'Bearer ' + req.session.user, 'Content-Type': 'application/json'}}).then(resp => resp.json())
        .then(records => {
            console.log(records);
            res.render('pages/leads', {result: result, records: records.lead});
        });
    });
});
*/

/*fetch(endpoint+'/get-all-venues', {method: 'GET', headers: {'Authorization': 'Bearer ' + req.session.user, 'Content-Type': 'application/json'}}).then(resp => resp.json())
        .then(records => {
            res.render('pages/venues',  {result: result, records: records.lead});
        });*/

/*let events = []
    let alarms = []

    let start = moment().format('YYYY-M-D-H-m').split("-")
    let end = moment().add({'hours':2, "minutes":30}).format("YYYY-M-D-H-m").split("-")

    alarms.push({
    action: 'audio',
    trigger: {hours:2,minutes:30,before:true},
    repeat: 2,
    attachType:'VALUE=URI',
    attach: 'Glass'
    });

    let event = {
    productId:"myCalendarId",
    uid: "123"+"@ics.com",
    startOutputType:"local",
    start: start,
    end: end,
    title: "test here",
    alarms: alarms
    }
    events.push(event);
    console.log(ics.createEvents(events));*/

/*var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5accc6184c1e67",
      pass: "39e66e65b528ed"
    }
});*/

/*

SMTP

Host:
    smtp.mailtrap.io
Port:
    25 or 465 or 587 or 2525
Username:
    5accc6184c1e67
Password:
    39e66e65b528ed
Auth:
    PLAIN, LOGIN and CRAM-MD5
TLS:
    Optional (STARTTLS on all ports)

POP3

Host:
    pop3.mailtrap.io
Port:
    1100 or 9950
Username:
    5accc6184c1e67
Password:
    39e66e65b528ed
Auth:
    USER/PASS, PLAIN, LOGIN, APOP and CRAM-MD5
TLS:
    Optional (STARTTLS on all ports)
*/

/*

var event = {
    start: [tmp_start[0], tmp_start[1], tmp_start[2], tmp_start_t[0], tmp_start_t[1]],
    duration: { hours: '', minutes: '' },
    title: title,
    description: details,
    location: venue,
    url: venue,
    geo: { lat: '', lon: '' },
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Manatee Admin', email: 'admin@manatee.it' },
    attendees: [
      { name: 'Test System', email: '5accc6184c1e67@mailtrap.io', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
      { name: 'Test 2 System', email: '5accc6184c1e67@mailtrap.io', dir: 'https://sample.meeting/en/where', role: 'OPT-PARTICIPANT' }
    ]
  };

  */

  /*function sendIcsEvent(event){
  $.ajax({    
          url: '/download-ics',    
          method:"POST",    
          data: (event + ' '),  
          type:'json',  
          success:function(data)    
          {
            console.log('Record Inserted Successfully.');  
          }    
      });
}*/
/*$(document).ready(function(){
  $('#ics').on('click',function(){  
    console.log("entered here");            
          
    });
});*/

/*function (req, res){
    console.log('create-user');
    console.log(req.body);
    console.log(req.session.user);
    var result = '', records = ''; // Safe start
    var data = {
        fullname: req.body.fullname,
        user: req.body.user,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    };
    fetch(endpoint+'/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Authorization': 'Bearer ' + req.session.user,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(result => {
        getUsers(req, res, next);
    });
}*/