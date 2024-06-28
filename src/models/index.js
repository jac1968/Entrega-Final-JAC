const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const User = require('./User')

//  Relationship Category - Product (1-N)

Product.belongsTo(Category)
Category.hasMany(Product)

//  Relationship User - Cart (1-N)
Cart.belongsTo(User)
User.hasMany(Cart)

//  Relationship Product - Cart (1-N)
Cart.belongsTo(Product)
Product.hasMany(Cart)