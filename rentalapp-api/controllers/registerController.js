const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../db').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `user` FROM `system_users` WHERE `user`=?",
            [req.body.user]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "Username already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `system_users`(`fullname`,`user`,`password`,`email`,`phone`) VALUES(?,?,?,?,?)',[
            req.body.fullname,
            req.body.user,
            hashPass,
            req.body.email,
            req.body.phone
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}