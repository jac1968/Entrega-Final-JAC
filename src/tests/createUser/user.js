    // Create user for testing 
const User = require("../../models/User")

const userTest = async () => {

    const data = {
        firstName: "Fabiana de J.",
        lastName: "Carrasquilla",
        email: "fc@gmail.com",
        password: "fabiana123",
        phone: '4444-3333-2222'
    }

    await User.create(data)
}

module.exports = userTest