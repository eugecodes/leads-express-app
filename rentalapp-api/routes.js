const router = require('express').Router();
const exp = require('express');
const {body} = require('express-validator');
const {register, login, getUser, getAllUsers} = require('./controllers/userController.js');
const {createLead, updateLeadDate, updateLeadAssignedUsers, updateLeadUsersTobeNotified, updateLeadStatus, updateLeadDetails, getLead, getAllLeads} = require('./controllers/leadController.js');
const {createInvoice, updateInvoice, getInvoice, getAllInvoices} = require('./controllers/invoiceController.js');
const {createContract, updateContract, getContract, getAllContracts} = require('./controllers/contractController.js');
const {createNote, updateNote, getNote, getAllNotes} = require('./controllers/notesController.js');
const {createProposal, updateProposal, getProposal, getAllProposals} = require('./controllers/proposalController.js');
const {createTodo, updateTodo, getTodo, getAllTodos} = require('./controllers/todoController.js');
const {createContact, updateContact, getContact, getAllContacts} = require('./controllers/leadcontactsController.js');
const {createMessage, getMessage, getAllMessages} = require('./controllers/communicationController.js');
const {createBooking, getBooking, updateBooking, getAllBookings} = require('./controllers/bookingController.js');
const {createVenue, getVenue, updateVenue, getAllVenues} = require('./controllers/venueController.js');
const {createTax, getTax, updateTax, getAllTaxes} = require('./controllers/taxesController.js');

/* Documentation */
router.get('/', function(req, res) {
    res.sendFile('./public/doc.html', { root: __dirname });
});

/* System Users - Finished testing*/
router.post('/register', [
    body('fullname',"The name must be of minimum 3 characters length").notEmpty(), //.escape().trim().isLength({ min: 3 })
    body('user',"User must be of minimum 3 characters length").notEmpty(), //.escape().trim().isLength({ min: 3 })
    body('password',"The Password must be of minimum 4 characters length").notEmpty(), //.trim().isLength({ min: 4 })
    body('email',"Invalid email address").notEmpty(), //.escape().trim().isEmail()
    body('phone',"Invalid phone number").notEmpty(), //.escape().trim().isMobilePhone()
],register);
router.post('/login',[
    body('user',"User can't be empty").notEmpty(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty(), //.trim().isLength({ min: 4 })
],login);
router.get('/get-user',getUser);
router.get('/get-all-users',getAllUsers);

/* Leads - Finished testing */
router.post('/create-lead', [
    body('event_start', "Event start datetime must be defined").notEmpty(),
    body('event_end', "Event end datetime must be defined").notEmpty(),
    body('status', "Status").notEmpty(),
    body('event_contacts', "At least one contact must be defined").notEmpty(),
    body('type_of_event', "Type of event can't be empty").notEmpty(),
    body('users_assigned', "At least one user must be assigned to this lead").notEmpty(),
    body('users_to_be_notified', "At least one user must be notified about this lead").notEmpty(),
    body('event_details', "At least the venue must be defined here").notEmpty()
], createLead);
router.get('/get-lead/:event_id', getLead); 
router.get('/get-all-leads', getAllLeads);
router.post('/update-event-date', [
    body('event_id', "Event ID can't be empty").notEmpty(),
    body('event_start', "Event start datetime can't be not defined").notEmpty(),
    body('event_end', "Event end datetime can't be not defined").notEmpty()
], updateLeadDate);
router.post('/update-assigned-users', [
    body('event_id', "Event ID can't be empty").notEmpty(),
    body('assigned_users', "At least one user must be assigned to this lead").notEmpty()
], updateLeadAssignedUsers);
router.post('/update-users-tobe-notified', [
    body('event_id', "Event ID can't be empty").notEmpty(),
    body('users_tobe_notified', "At least one user must be notified about this lead").notEmpty()
], updateLeadUsersTobeNotified);
router.post('/update-event-status', [
    body('event_id', "Event ID can't be empty").notEmpty(),
    body('event_status', "The Status of the process can't be empty").notEmpty()
], updateLeadStatus);
router.post('/update-event-details', [
    body('event_id', "Event ID can't be empty").notEmpty(),
    body('event_details', "The Status of the process can't be empty").notEmpty()
], updateLeadDetails);

/* Lead Contacts - Finished testing */
router.post('/add-contact',[
    body('fullname',"Name Surname").notEmpty(),
    body('email',"Email Address").notEmpty(), //.trim().isLength({ min: 4 })
    body('phone',"Phone").notEmpty(),
    body('address',"Address").notEmpty(),
    body('contact_hours',"Contact Hours and Days").notEmpty(),
    body('active',"1- Active 2- Disabled").notEmpty()
],createContact);
router.post('/update-contact',[
    body('fullname',"Name Surname").notEmpty(),
    body('email',"Email Address").notEmpty(), //.trim().isLength({ min: 4 })
    body('phone',"Phone").notEmpty(),
    body('address',"Address").notEmpty(),
    body('contact_hours',"Contact Hours and Days").notEmpty(),
    body('active',"1- Active 2- Disabled").notEmpty(),
    body('id',"ID of the booking to modify").notEmpty()
],updateContact);
router.get('/get-contact/:id', getContact); 
router.get('/get-all-contacts', getAllContacts);

/* Bookings - Finished Testing */
router.post('/add-booking',[
    body('booking_type',"Type of Booking 1- Lead, 2- Internal, 3- Commercial, 4- Others").notEmpty(),
    body('when_booking_start',"Start date and time").notEmpty(), //.trim().isLength({ min: 4 })
    body('when_booking_end',"End date and time").notEmpty(),
    body('title',"Subject of the booking").notEmpty(),
    body('repeats',"If the booking repeats over time 1- Yes 0- No").notEmpty(),
    body('place_of_meeting',"Place for the booking").notEmpty(),
    body('related_to',"Related to which lead (notes, pendings are optional)").notEmpty(),
    body('participants',"Participants, involved parts").notEmpty(),
    body('status',"Status 1- Pending, 2- Successfully Closed, 3- In Progress, 4- Cancelled, 5- Rescheduled").notEmpty(),
    body('booking_details',"Details can be text, or can be a JSON structure").notEmpty(),
],createBooking);
router.post('/update-booking',[
    body('booking_type',"Type of Booking 1- Lead, 2- Internal, 3- Commercial, 4- Others").notEmpty(),
    body('when_booking_start',"Start date and time").notEmpty(), //.trim().isLength({ min: 4 })
    body('when_booking_end',"End date and time").notEmpty(),
    body('title',"Subject of the booking").notEmpty(),
    body('repeats',"If the booking repeats over time 1- Yes 0- No").notEmpty(),
    body('place_of_meeting',"Place for the booking").notEmpty(),
    body('related_to',"Lead or Contact").notEmpty(),
    body('participants',"Participants, involved parts").notEmpty(),
    body('status',"Status 1- Pending, 2- Successfully Closed, 3- In Progress, 4- Cancelled, 5- Rescheduled").notEmpty(),
    body('booking_details',"Details can be text, or can be a JSON structure").notEmpty(),
    body('id',"ID of the booking to modify").notEmpty()
],updateBooking);
router.get('/get-booking/:booking_id', getBooking); 
router.get('/get-all-bookings', getAllBookings);

/* Invoices - Finished Testing */
router.post('/add-invoice',[
    body('title',"Type of Booking 1- Lead, 2- Internal, 3- Commercial, 4- Others").notEmpty(),
    body('doc_path',"Start date and time").notEmpty(), //.trim().isLength({ min: 4 })
    body('payment_status',"End date and time").notEmpty(),
    body('payment_date',"Subject of the booking").notEmpty(),
    body('destinatary',"If the booking repeats over time 1- Yes 0- No").notEmpty(),
    body('due',"Place for the booking").notEmpty(),
    body('amount',"Participants, involved parts").notEmpty()
],createInvoice);
router.post('/update-invoice',[
    body('title',"Type of Booking 1- Lead, 2- Internal, 3- Commercial, 4- Others").notEmpty(),
    body('doc_path',"Start date and time").notEmpty(), //.trim().isLength({ min: 4 })
    body('payment_status',"End date and time").notEmpty(),
    body('payment_date',"Subject of the booking").notEmpty(),
    body('destinatary',"If the booking repeats over time 1- Yes 0- No").notEmpty(),
    body('due',"Place for the booking").notEmpty(),
    body('amount',"Participants, involved parts").notEmpty(),
    body('id',"ID of the booking to modify").notEmpty()
],updateInvoice);
router.get('/get-invoice/:id', getInvoice); 
router.get('/get-all-invoices', getAllInvoices);

/* Contracts - Finished testing */
router.post('/add-contract',[
    body('title',"Type of Booking 1- Lead, 2- Internal, 3- Commercial, 4- Others").notEmpty(),
    body('date',"Start date and time").notEmpty(), //.trim().isLength({ min: 4 })
    body('status',"End date and time").notEmpty(),
    body('destinatary',"Subject of the booking").notEmpty(),
    body('amount',"If the booking repeats over time 1- Yes 0- No").notEmpty(),
    body('doc_path',"Place for the booking").notEmpty(),
    body('signed_date',"Participants, involved parts").notEmpty()
],createContract);
router.post('/update-contract',[
    body('title',"Type of Booking 1- Lead, 2- Internal, 3- Commercial, 4- Others").notEmpty(),
    body('date',"Start date and time").notEmpty(), //.trim().isLength({ min: 4 })
    body('status',"End date and time").notEmpty(),
    body('destinatary',"Subject of the booking").notEmpty(),
    body('amount',"If the booking repeats over time 1- Yes 0- No").notEmpty(),
    body('doc_path',"Place for the booking").notEmpty(),
    body('signed_date',"Participants, involved parts").notEmpty(),
    body('id',"ID of the booking to modify").notEmpty()
],updateContract);
router.get('/get-contract/:id', getContract); 
router.get('/get-all-contracts', getAllContracts);

/* Communications - Finished testing */
router.post('/create-message', [
    body('message_date', "Date of the message can't be empty").notEmpty(),
    body('message_subject', "Subject must be defined").notEmpty(),
    body('message_body', "Body of the message can't be empty").notEmpty(),
    body('status', "Status can't be empty").notEmpty(),
    body('event_id', "Event / Lead related can't be empty").notEmpty(),
    body('from', "Sender can't be empty").notEmpty(),
    body('to', "Destination can't be empty").notEmpty()
], createMessage);
router.get('/get-message/:id', getMessage); 
router.get('/get-all-messages', getAllMessages);

/* Proposals - Finished testing */
router.post('/create-proposal', [
    body('proposal_date', "The proposal date can't be empty").notEmpty(),
    body('proposal_lead', "Proposal Lead must be defined").notEmpty(),
    body('proposal', "Proposal can't be empty").notEmpty(),
    body('status', "Status can't be empty").notEmpty(),
    body('file_path', "Document path can't be empty").notEmpty(),
    body('tags', "Classification of the proposal can't be empty").notEmpty()
], createProposal);
router.post('/update-proposal', [
    body('proposal_date', "The proposal date can't be empty").notEmpty(),
    body('proposal_lead', "Proposal Lead must be defined").notEmpty(),
    body('proposal', "Proposal can't be empty").notEmpty(),
    body('status', "Status can't be empty").notEmpty(),
    body('file_path', "Document path can't be empty").notEmpty(),
    body('tags', "Classification of the proposal can't be empty").notEmpty(),
    body('id', "ID Can't be empty").notEmpty()
], updateProposal);
router.get('/get-proposal/:id', getProposal); 
router.get('/get-all-proposals', getAllProposals);

/* Notes - Finished Testing */
router.post('/create-note', [
    body('details', "Details can't be empty").notEmpty(),
    body('status', "Status of completion must be defined").notEmpty(),
    body('archive_after', "Archive after can't be empty").notEmpty(),
    body('set_reminder', "Reminder can't be empty").notEmpty()
], createNote);
router.post('/update-note', [
    body('details', "Details can't be empty").notEmpty(),
    body('status', "Status of completion must be defined").notEmpty(),
    body('archive_after', "Archive after can't be empty").notEmpty(),
    body('set_reminder', "Reminder can't be empty").notEmpty(),
    body('id', "ID Can't be empty").notEmpty()
], updateNote);
router.get('/get-note/:id', getNote); 
router.get('/get-all-notes', getAllNotes);

/* To-Do - Finished Testing */
router.post('/create-to-do', [
    body('details', "Details can't be empty").notEmpty(),
    body('status', "Status of completion must be defined").notEmpty(),
    body('date_for_completion', "Date for completion can't be empty").notEmpty()
], createTodo);
router.post('/update-to-do', [
    body('details', "Details can't be empty").notEmpty(),
    body('status', "Status of completion must be defined").notEmpty(),
    body('date_for_completion', "Date for completion can't be empty").notEmpty(),
    body('id', "ID Can't be empty").notEmpty()
], updateTodo);
router.get('/get-to-do/:id', getTodo); 
router.get('/get-all-to-dos', getAllTodos);

/* Venues - Finished Testing */
router.post('/create-venue', [
    body('venue', "Venue can't be empty").notEmpty(),
    body('description', "Details can't be empty").notEmpty(),
    body('status', "Status must be defined").notEmpty(),
    body('image', "Image can't be empty").notEmpty()
], createVenue);
router.post('/update-venue', [
    body('venue', "Venue can't be empty").notEmpty(),
    body('description', "Details can't be empty").notEmpty(),
    body('status', "Status must be defined").notEmpty(),
    body('image', "Image can't be empty").notEmpty(),
    body('id', "ID Can't be empty").notEmpty()
], updateVenue);
router.get('/get-venue/:id', getVenue); 
router.get('/get-all-venues', getAllVenues);

/* Taxes - Finished Testing */
router.post('/create-tax', [
    body('percentage', "Percentage can't be empty").notEmpty(),
    body('description', "Details can't be empty").notEmpty()
], createTax);
router.post('/update-tax', [
    body('percentage', "Percentage can't be empty").notEmpty(),
    body('description', "Details can't be empty").notEmpty(),
    body('id', "ID Can't be empty").notEmpty()
], updateTax);
router.get('/get-tax/:id', getTax); 
router.get('/get-all-taxes', getAllTaxes);

module.exports = router;