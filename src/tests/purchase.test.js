require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'

let TOKEN, product, purchase, userId

afterAll(async () => {
    await product.destroy()
});

beforeAll(async () => {

    const login = {
        email: "mm@gmail.com",
        password: "maria123"
    }

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(login)

    TOKEN = res.body.token
    userId = res.body.user.id

    product = await Product.create({
        title: 'Samsung S40',
        description: 'Samsung S40 color negro mate',
        price: 249.99
    });

    purchase = {
        quantity: 1,
        productId: product.id,
        userId: res.body.id
    };

});


test("Post 👉 'BASE_URL',  must  return  status  201  &  res.body.purchase.userid === purchase.userId",  async () => {

    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(purchase)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchase.userId)
});

test("GET 👉 'BASE_URL',  must return status 200 & res.body.purchase.userid === purchase.userId", async () =>{

    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()   
    expect(res.body.userId).toBe(purchase.userId)

});