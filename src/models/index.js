//  Relationships between database tables
const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const ProductImg = require('./Productimg')
const Purchase = require('./Purchase')
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

//  Relationship User - Purchase (1-N)
Purchase.belongsTo(User)
User.hasMany(Purchase)

//  Relationship Purchase - Product (1-N)
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//  Relationship ProductImg - Product (1-N)
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)