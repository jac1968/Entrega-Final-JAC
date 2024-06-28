// tests products endpoints
const request = require('supertest')
const app = require('../app')
const BASE_URL =      '/api/v1/products'
const BASE_URL_LOGIN = '/api/v1/users'

let TOKEN          // Variable for save Token user
let productId     // Variable for save product id

 beforeAll(async () => {

    const login = {
        email: "mm@gmail.com",
        password: "maria123"
    }

    const res = await request(app)
        .post(`${BASE_URL_LOGIN}/login`)
        .send(login)

        TOKEN = res.body.token

}) 

const product = {
    title: "Samsung A11-S",
    description: "Celular Samsung A11 color negro mate",
    categoryId: 1,
    price: 999.99
}
        
test("Post 👉 'BASE_URL', must return status 201 & product.title === res.body.title", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

})
        

test("Get 👉 'BASE_URL', must return status 200 & res.body.length == 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

        
test("Delete 👉 'BASE_URL/:id', must return status 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

})  