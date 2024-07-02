    // tests cart endpoints
require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
const BASE_URL = '/api/v1/cart'
const BASE_URL_LOGIN = '/api/v1/users'
    
let TOKEN, cart, cartId, product, userId

afterAll(async () => {
    await product.destroy()
})

beforeAll(async () => {
    
    const login = {
        email: "mm@gmail.com",
        password: "maria123"
    }

    const res = await request(app)
        .post(`${BASE_URL_LOGIN}/login`)
        .send(login)
    
    TOKEN = res.body.token
    userId = res.body.user.id

    product= await Product.create(
        {
            title: 'Samsung S40',
            description: 'Samsung S40 color negro mate',
            price: 249.99
        }
    );

    cart = {
        quantity: 1,
        productId: product.id,
        userId: res.body.user.id
    }
    
}) 


test("Post  👉  'BASE_URL',  must  return  status  201  &  res.body.quantity > 0 & userId != null", async () => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set('Authorization', `Bearer ${TOKEN}`)

    cartId = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBeGreaterThan(0)
    expect(res.body.userId).toBeTruthy()
})


test("Get 👉 'BASE_URL', must  return  status 200  & res.body.length == 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].product).toBeDefined()
    
})


test("Get 👉 'BASE_URL/:id', must return status 200 and res.body.quantity === cart.quantity", async () => {
    
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
    expect(res.body.userId).toBeDefined()
    expect(res.body.product).toBeDefined()
}) 


 test("Put 👉 'BASE_URL/:id', must return status 200 & res.body.quantity === cartUpdate.quantity", async () => {

    const cartUpdate = {
        quantity: 3
    }
    
    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(cartUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)
    
})  

test("Delete 👉 'BASE_URL/:id', must return status 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(204)
        
}) 