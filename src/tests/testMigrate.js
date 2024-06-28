
const sequelize = require('../utils/connection');
const userTest = require('./createUser/user');
require ('../models')

const testMigrate = async () => {

    try {
        await sequelize.sync({force:true});
        console.log("Database Reset 🖥️ - ✅"); // Personalized message
        await userTest()      // Create new user for testing
        process.exit()

    } 
    
    catch (error) {
        console.log(error)
    }
}

testMigrate();
