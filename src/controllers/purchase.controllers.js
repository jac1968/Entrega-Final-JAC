const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Cart = require('../models/Cart');

/* const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll(
        {where: {userId},  
            include:[{model: Product, attributes:["title", "price"],
            include:[{model: Category, attributes:["name"]}]}]}
    )
    return res.json(results)
})

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const cart = await Cart.findAll(
        {where: {userId}, attributes: ["userId", "productId", "quantity" ]}
    )
    if (cart) {
        const result = await Purchase.bulkCreate(cart)
    } 
    if (result) {
        await Cart.destroy({ where: { userId } })
        return res.status(201).json(result)
    }

    return res.sendStatus(404)

}); */

const getAll = catchError(async (req, res) => {
    const userId = req.user.id
    const result = await Purchase.findAll({
      where: { userId }, 
      include: [{ model: Product, attributes: ['title', 'price'],
      include: [{ model: Category, attributes: ['name']}]}]  
    })
    return res.json(result)
  });
  
  const create = catchError(async (req, res) => {
    const userId = req.user.id
  
    const cart = await Cart.findAll({
      where: { userId }, raw: true,
      attributes: ['quantity', 'userId', 'productId']})

    if (cart) {
        const result = await Purchase.bulkCreate(cart)
        if (result) {
            await Cart.destroy({ where: { userId } }) 
            return res.status(201).json(result) 
        }  
    }

    return res.sendStatus(404)

    });
    
       /* if (!cart) return res.sendStatus(404) 

    const result = await Purchase.bulkCreate(cart)
    if (!result) return res.sendStatus(404)  

    await Cart.destroy({ where: { userId } }) 
    return res.status(201).json(result) */



module.exports = {
    getAll,
    create
}