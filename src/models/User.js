        // Model of table users 
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')  

        // Declare tables fields
const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true    //  Not to repeat the value.
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

    // Hook for encrpted password before save record
User.beforeCreate(async(user) => {
    const key = user.password
    const encriptedKey = await bcrypt.hash(key, 10) 
    user.password = encriptedKey
})

module.exports = User;