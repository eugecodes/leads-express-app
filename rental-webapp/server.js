var express = require('express'),
    app = express(),
    session = require('express-session'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    multer  = require('multer'),
    _ = require('lodash'),
    path = require('path'),
    md5 = require('md5'),
    moment = require('moment');
app.use(
bodyParser.json(),
bodyParser.urlencoded({extended: true}),
session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const { response } = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const { writeFileSync } = require('fs')
const ics = require('ics');
const api = { 
    dev: "http://localhost:3000", 
    test: "http://rentalapp-api.herokuapp.com", 
    prod:""
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  }), upload = multer({ storage: storage });
const endpoint = api.dev;

/* Modularization because it's becoming too big! getLead,  */
/* , addNotification, disableNotification, removeNotification */
const {getLeads, getLeadDetails, updateLead, addLeadContact, deleteLeadContact, addLeadUser, deleteLeadUser, deleteLead} = require('./controllers/leads.js');
const {getAttendees, updateContact, deleteContact} = require('./controllers/contacts.js');
const {getNotifications} = require('./controllers/notifications.js');
const {getContracts} = require('./controllers/contracts.js');
const {getUsers, updateUser, createUser, deleteUser} = require('./controllers/users.js');
const {getVenues, enableOrDisableVenue, removeVenue, updateVenue} = require('./controllers/venues.js');
const {getBooking, getBookings, updateBooking} = require('./controllers/bookings.js');
const {getTaxes, createTax, disableTax, enableTax, removeTax, updateTax} = require('./controllers/taxes.js');
const {getInvoices, createInvoice, updateInvoiceTemplate} = require('./controllers/invoices.js');
const {getProposals, cloneProposal, removeProposal} = require('./controllers/proposals.js')
const {getMessages, send} = require('./controllers/messages.js');
const {getSearchResults} = require('./controllers/search.js');

/* Users Authentication */
var auth = function(req, res, next) {
    if (req.session && req.session.user && req.session.admin)
      return next();
    else
        res.redirect('/login');
};
// Login endpoint
app.get('/login', function (req, res) {
    res.render('pages/login');
});
// Real Login
app.post('/login', function (req, res) {
    console.log(req.body);
    fetch(endpoint + '/login', {
        method: 'POST',
        body: JSON.stringify({user: req.body.username, password: req.body.password}),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => {
        console.log(data);
        if(!data.token) {
            res.render('pages/login', {error: 'login failed'});
        }else{
            req.session.user = data.token;
            req.session.admin = true;
            res.redirect('/');
        }
    });
});
// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy(); // Redirect to Login
    //res.send("logout success!");
    res.redirect('/login');
});
// Check if login works
app.get('/check-login', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
app.get('/check-api', function(req, res) {
    var get_sample_login = {
        user: "testing",
        password: "testing2021"
    };
    fetch(endpoint+'/login', {method: 'POST', body: JSON.stringify(get_sample_login), headers: {'Content-Type': 'application/json'}}).then(resp => resp.json())
    .then(records => {
        console.log(records);
        res.send(records);
    });
});

/* Users */
app.get('/users', auth, getUsers);
app.post('/create-user', auth, createUser);
app.get('/remove-user/:id', auth, deleteUser);
app.post('/update-user', auth, updateUser);

/* Contacts */
app.post('/update-contact', auth, updateContact);
app.post('/delete-contact', auth, deleteContact);

/* Leads */
app.get('/leads', auth, getLeads);
app.post('/lead-details', auth, getLeadDetails);
app.post('/update-lead', auth, updateLead);
app.post('/add-lead-contact', auth, addLeadContact);
app.post('/delete-lead-contact', auth, deleteLeadContact);
app.post('/add-lead-user', auth, addLeadUser);
app.post('/delete-lead-user', auth, deleteLeadUser);
app.post('/delete-lead', auth, deleteLead);

/* Venues */
app.get('/venues', auth, getVenues);
app.post('/venues', upload.single('venue_img'), (req, res, next) => {
    console.log(req.body);
    console.log(req.session.user);
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('Please choose an image');
        error.httpStatusCode = 400;
        return next(error);
    }
    var data = {
        venue: req.body.venue,
        description: req.body.description,
        status: 1,
        image: '/uploads/'+file.originalname
    };
    if(!req.body.venue_id){
        // Create
        fetch(endpoint+'/create-venue', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Authorization': 'Bearer ' + req.session.user,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(result => {
            getVenues(req, res, next);
        });
    }else{
        //Update
        updateVenue(req, res, next, data);
    } 
});
app.get('/disable-venue/:id/:status', auth, enableOrDisableVenue);
app.get('/enable-venue/:id/:status', auth, enableOrDisableVenue);
app.get('/remove-venue/:id', auth, removeVenue);

/* Bookings */
app.get('/bookings', auth, getBookings);
app.get('/bookings/:id', auth, getBooking);
app.post('/update-booking', auth, updateBooking);
app.post('/create-booking', auth, (req, res, next) => {
    console.log(req.body);
});

/* Contracts */
app.get('/contracts', auth, getContracts);

/* Taxes */
app.get('/taxes', auth, getTaxes);
app.post('/taxes', auth, createTax);
app.get('/disable/tax/:id', auth, disableTax);
app.get('/enable/tax/:id', auth, enableTax);
app.get('/remove/tax/:id', auth, removeTax);
app.post('/update/tax', auth, updateTax);

/* Proposals */
app.get('/proposals', auth, getProposals);
app.post('/clone-template', auth, cloneProposal);
app.get('/remove-proposal/:id', auth, removeProposal);
app.post('/save-as-new-proposal', auth, upload.single('img2'), (req, res, next) => {
    console.log("leads " + req.body.leads);
    var proposal_date = new Date().toISOString();
    //console.log(proposal_date);
    const image = req.file;
    //console.log(image);
    if (!image) {
        const error = new Error('Please choose an image');
        error.httpStatusCode = 400;
        return next(error);
    }
    var file2 = {name: 'Proposal '+Date.now()+'.html', content: req.body.htmlcontent2, path: '/uploads/proposals/'};
    var temppath = path.resolve(__dirname, './public/'+file2.path+file2.name);
    //console.log(temppath);
    fs.writeFile(temppath, req.body.htmlcontent2, function (err) {
        if (err) throw err;
        console.log('Content Saved! Proposal HTML file Created!');
    });
    var data = {
        proposal_date: proposal_date,
        proposal_lead: req.body.leads,
        proposal: req.body.proposal_title,
        status: req.body.status2,
        file_path: file2.path+file2.name,
        tags: req.body.tags2,
        html_content: file2.content,
        related_to: null,
        img: '/uploads/'+image.originalname
    };
    //console.log(data);
    fetch(endpoint+'/create-proposal', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Authorization': 'Bearer ' + req.session.user,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(result => {
        getProposals(req, res, next);
    });
});
app.post('/save-draft', auth, (req, res, next) => {
    console.log(req.body);
    var proposal_date = '9999-01-01';
    var proposal = 'Draft '+Date.now();
    var tags = 'draft,saved-from-editor';
    var html_content = req.body.proposal_content_editor;
    var img = '/uploads/placeholder.jpg';
    var temppath = path.resolve(__dirname, './public/templates/proposals/'+proposal+'.html');
    console.log(temppath);
    fs.writeFile(temppath, html_content, function (err) {
        if (err) throw err;
        console.log('Content Saved! Proposal Draft file Created!');
    });
    var data = {
        proposal_date: proposal_date,
        proposal_lead: 'none',
        proposal: proposal,
        status: 'Draft',
        file_path: '/templates/proposals/'+proposal+'.html',
        tags: tags,
        html_content: html_content,
        related_to: null,
        img: img
    };
    console.log(data);
    fetch(endpoint+'/create-proposal', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Authorization': 'Bearer ' + req.session.user,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(result => {
        fetch(endpoint+'/get-all-proposals', {method: 'GET', headers: {'Authorization': 'Bearer ' + req.session.user, 'Content-Type': 'application/json'}}).then(resp => resp.json())
        .then(records => {
            res.render('pages/proposals',  {result: result, records: records.records});
        });
    });
});
app.post('/save-as-new-template', auth, upload.single('img'), (req, res, next) => {
    console.log('proposal_date ' + req.body.proposal_date);
    console.log('proposal ' + req.body.proposal);
    console.log('tags ' + req.body.tags)
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('Please choose an image');
        error.httpStatusCode = 400;
        return next(error);
    }
    var file2 = {name: 'proposal_template_'+req.body.proposal_date+'.html', content: req.body.htmlcontent, path: '/templates/proposals/'};
    var temppath = path.resolve(__dirname, './public/'+file2.path+file2.name);
    console.log(temppath);
    fs.writeFile(temppath, file2.content, function (err) {
        if (err) throw err;
        console.log('Content Saved! Proposal HTML file Created!');
    });
    var data = {
        proposal_date: req.body.proposal_date,
        proposal_lead: 'none',
        proposal: req.body.proposal,
        status: 'Template',
        file_path: file2.path+file2.name,
        tags: req.body.tags,
        html_content: file2.content,
        related_to: null,
        img: '/uploads/'+file.originalname
    };
    console.log(data);
    fetch(endpoint+'/create-proposal', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Authorization': 'Bearer ' + req.session.user,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()).then(result => {
        fetch(endpoint+'/get-all-proposals', {method: 'GET', headers: {'Authorization': 'Bearer ' + req.session.user, 'Content-Type': 'application/json'}}).then(resp => resp.json())
        .then(records => {
            res.render('pages/proposals',  {result: result, records: records.records});
        });
    });
});

/* Invoices */
app.get('/invoices', auth, getInvoices);
app.post('/create-invoice', auth, upload.single('img'), (req, res, next) =>{
    var image = req.file;
    if (!image) {
        const error = new Error('Please choose an image');
        error.httpStatusCode = 400;
        return next(error);
    }
    req.body.img = '/uploads/'+image.originalname;
    req.body.file = {name: 'Invoice '+Date.now()+'.html', content: req.body.htmlcontent, path: '/uploads/invoices/'};
    var temppath = path.resolve(__dirname, './public/'+req.body.file.path+req.body.file.name);
    fs.writeFile(temppath, req.body.htmlcontent, function (err) {
        if (err) throw err;
        console.log('Content Saved! Proposal HTML file Created!');
    });
    createInvoice(req, res, next);
});
app.post('/import-invoice', auth, upload.fields([{name: 'img', maxCount: 1}, {name: 'inv', maxCount: 1}]), (req, res, next) =>{
    console.log(req.files);
    var image = req.files.img[0], doc = req.files.inv[0];
    console.log(image.originalname);
    console.log(doc.originalname);
    req.body.htmlcontent = '';
    if (!image) {
        const error = new Error('Please choose an image');
        error.httpStatusCode = 400;
        return next(error);
    }
    if(!doc){
        const error = new Error('Please choose an invoice (pdf, doc, html), any format allowed (except non-safe formats)');
        error.httpStatusCode = 400;
        return next(error);
    }
    req.body.img = '/uploads/'+image.originalname;
    req.body.doc = '/uploads/'+doc.originalname;
    req.body.file = {name: doc.originalname, path: '/uploads/'+doc.originalname};
    var temppath = path.resolve(__dirname, './public/'+req.body.doc);
    fs.readFile(temppath, 'utf8', (err, data) => {
        if (err) throw err;
        req.body.htmlcontent = data;
        console.log('Content Saved! Proposal HTML file Created!');
    });
    console.log(req.body.htmlcontent)
    createInvoice(req, res, next);
});
app.post('/update-template/invoice', auth, (req, res, next) =>{
    req.body.file = {content: req.body.updated_content_n, path: req.body.doc_path_n};
    var temppath = path.resolve(__dirname, './public/'+req.body.file.path);
    fs.writeFile(temppath, req.body.file.content, function (err) {
        if (err) throw err;
        console.log('Content Saved! Proposal HTML file Created!');
    });
    updateInvoiceTemplate(req, res, next);
});

/* Search */
app.post('/search', auth, (req, res, next) => {
    console.log(req.body);
    var tables = ['leads', 'contacts', 'venues', 'calendar', 'invoices', 'contracts', 'proposals', 'users', 'notes', 'taxes'],search=[];
    var time_filter_from = '', time_filter_to = '';
    for(var i=0;i<=tables.length;i++){
        if(req.body.tables[tables[i]]=='on'){
            search.push(tables[i]);
        }
    }
    //console.log('search '+ search);
    if(req.body.time_filter_off=='off' && req.body.from_n && req.body.to_n){
        time_filter_from = req.body.from_n;
        time_filter_to = req.body.to_n;
    }
    getSearchResults(req, res, next, search, time_filter_from, time_filter_to, req.body.search_term);
});

/* Calendar */
app.post('/ecal', auth, (req, res, next) => {
    console.log("MODAL ACTIONS " + JSON.stringify(req.body));
    if(req.body.action_expected == 'download-ics'){
        console.log('download ics');
        let alarms = [], start_day = req.body.start_date_n.split('-').map(function(item) {return parseInt(item);}), 
        start_time = req.body.start_time_n.split(':').map(function(item) {return parseInt(item);});
        let end_day = req.body.end_date_n.split('-').map(function(item) {return parseInt(item);}), 
        end_time = req.body.end_time_n.split(':').map(function(item) {return parseInt(item);});
        //let attendees = getAttendees(req.body.participants_n, req.body.eventid_i);
        console.log('attendees');
        //console.log(attendees);
        alarms.push({
            action: 'audio',
            trigger: {hours:2,minutes:30,before:true},
            repeat: 2,
            attachType:'VALUE=URI',
            attach: 'Glass'
        });
        let event = {
            productId: req.body.short_desc_n,
            uid: "emilsa@manatee.it",
            startOutputType:"local",
            start: start_day.concat(start_time),
            end: end_day.concat(end_time),
            title: req.body.short_desc_n,
            description: req.body.details_n,
            busyStatus: 'BUSY',
            location: req.body.venue_n,
            url: 'https://sample-url.url/meeting-n/', //req.body.url_n
            organizer: { name: 'Admin', email: 'emilsa@manatee.it' },
            //attendees: attendees,
            alarms: alarms
        };
        console.log('events ' + event);
        ics.createEvent(event, (error, value) => {
            console.log(value);
            if (error) {
              console.log(error);
            }
            writeFileSync(`${__dirname}/event.ics`, value);
            res.download(`${__dirname}/event.ics`);
        });
    }else if(req.body.action_expected == 'send-invite'){
        console.log('send invite');
    }else{
        console.log('update event');
    }
});

app.post('/send/proposal/:id', auth, send);
app.post('/send/invoice/:id', auth, send);
app.post('/send/contract/:id', auth, send);
app.post('/send/message', auth, send);
app.post('/send/invite/:id', auth, send);

app.get('/', auth, getNotifications); //auth, 

/* Communications */
app.get('/messages', auth, getMessages);
app.post('/send-message', auth, send);

// about page
app.get('/about', auth, function(req, res) {
    res.render('pages/about');
});

app.listen(process.env.PORT || 8080, () => console.log('8080 is the magic port'));