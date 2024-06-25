        // Controllers for table users
// ---------------------------------------------- //

const catchError = require('../utils/catchError')
const User = require('../models/User')  // import models table
const bcrypt = require('bcrypt')  // import Bcrypt

        // Controller GetALL
const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

        // Controller Create
const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

        // Controller Remove
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

        // Controller Update
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

        // Controller login
const login = catchError(async(req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({where: {email} })
    if (!user) return res.status(401).json({error: '❌ Invalid entry 🚫'})

    const found = await bcrypt.compare(password, user.password)
    if (!found ) return res.status(401).json({error: '❌ Invalid entry 🚫'})

    const token = jwt.sign({user}, process.env.TOKEN_SECRET, {expiresIn: '6h'})
    return res.json({user, token})
    
 })
        
module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}