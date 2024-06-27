
const sequelize = require('../utils/connection');
require ('../models')

const testMigrate = async () => {

    try {
        await sequelize.sync({force:true});
        console.log("Database Reset Final 🖥️ - ✅"); // Personalized message

        process.exit()

    } catch (error) {
        console.log(error)
    }
}

testMigrate();
