    // Create user for testing 
const User = require("../../models/User")

const userTest = async () => {

    const data = {
        firstName: "Maria",
        lastName: "Marin",
        email: "mm@gmail.com",
        password: "maria123",
        phone: '4444-3333-2222'
    }

    await User.create(data)
}

module.exports = userTest