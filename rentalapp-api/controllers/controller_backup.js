exports.updateLead = async(req,res,next) => {
    const errors = validationResult(req);

    const lead_fields = ['event_start', 'event_end', 'status', 'contacts', 'type_of_event', 'users_assigned', 'following', 'tags', 'details'];
    var fields = '';
    var field_values = [];
    for(var i=0;i<lead_fields.length;i++){
        if(req.body[lead_fields[i]]){
            fields = fields + '="?",';
            field_values[i] = req.body[lead_fields[i]];
        }
    }
    fields = fields.substring(0, fields.length - 1);
    console.log(fields);
    console.log(field_values);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        if(
            !jwt.verify(theToken, 'the-super-strong-secret')
        ){
            return res.status(422).json({
                message: "Token invalid"
            });
        }


// 'UPDATE `leads` SET `event_start`="?",`event_end`="?",`status`="?",`contacts`="?",`type_of_event`="?",`users_assigned`="?",`following`="?",`tags`="?",`details`="?" WHERE `id`=?'
        const [rows] = await conn.execute('UPDATE leads SET '+fields+' WHERE id=?', 
        [
            field_values
            /*req.body.event_start, // DATETIME - Can be one day, one week, one month or some hours !@ The rental time is flexible with this
            req.body.event_end, // DATETIME - Can be one day, one week, one month or some hours 
            status, // Awaiting Answer, Sucessfully captured, In Process, On Hold, Finished, -- Lead Capture, Proposal, proposal sign, invoicing, invoice payment, Contract, Contract Sign
            req.body.event_contacts,
            req.body.type_of_event,
            req.body.users_assigned,
            req.body.users_to_be_notified,
            req.body.tags,
            req.body.event_details,
            req.body.event_id*/
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The lead has been successfully updated.",
            });
        }

    }catch(err){
        next(err);
    }
};