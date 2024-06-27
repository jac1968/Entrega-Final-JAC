    // tests category endpoints
    const request = require('supertest')
    const app = require('../app')
    const BASE_URL = '/api/v1/categories'
    
    let TOKEN       // Variable for save Token user
    let categoryId      // Variable for save category id
    
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
            
            
    const category = {
        name: "Tv"
    }
            
    test("Post  👉  'BASE_URL',  must  return  status  200  &  category.name === res.body.name", async () => {
    
        const res = await request(app)
            .post(BASE_URL)
            .send(category)
            .set('Authorization', `Bearer ${TOKEN}`)
    
        categoryId = res.body.id 
    
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(categor.name)
    
    })
            
    
    test("Get 👉 'BASE_URL', must  return  status 200  & res.body.length == 1", async () => {
    
        const res = await request(app)
            .get(BASE_URL)
    
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
    
    })
    
            
    test("Delete 👉 'BASE_URL/:id', must return status 204", async () => {
    
        const res = await request(app)
            .delete(`${BASE_URL}/${categoryId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
    
        expect(res.status).toBe(204)
    
    }) 