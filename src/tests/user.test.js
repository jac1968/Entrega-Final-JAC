    // tests user endpoints
const request = require('supertest')
const app = require('../app')
const BASE_URL = '/api/v1/users'

let TOKEN       // Variable for save Token user
let userId      // Variable for save user id

beforeAll(async () => {

    const login = {
        email: "fc@gmail.com",
        password: "fabiana123"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(login)

        TOKEN = res.body.token

})
        
        
const user = {
    firstName: "Marian",
    lastName: "Carrasquilla",
    email: "mc@gmail.com",
    password: "maria123",
    phone: '5555-5555-5555'
}
        
test("Post  👉  'BASE_URL',  must  return  status  201  &  user.firstName === res.body.firstName", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    userId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)

})
        

test("Get 👉 'BASE_URL', must  return  status 200  & res.body.length == 2", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)

})

           
test("Put 👉 'BASE_URL/:id', must return status 200 & res.body.firstName === userUpdate.firstName", async () => {

    const userUpdate = {
        firstName: 'Marian de J.'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(userUpdate.firstName)

}) 
        
test("Delete 👉 'BASE_URL/:id', must return status 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

}) 
        