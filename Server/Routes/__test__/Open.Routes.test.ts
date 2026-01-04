import request from "supertest";
import { app } from "../../app";

describe('POST /login', () => {
    it('returns 201 for login with email', async () => {
        return request(app).
            post('/login')
            .send({
                uname: "admin@test.com",
                password: "Admin@123"
            })
            .expect(201)
    })
    it('returns 201 for login with id', async () => {
        return request(app).
            post('/login')
            .send({
                uname: "admin",
                password: "Admin@123"
            })
            .expect(201)
    })
    it('returns 401 for wrong password', async () => {
        return request(app).
            post('/login')
            .send({
                uname: "admin",
                password: "Admin"
            })
            .expect(401)
    })
    it('returns 401 for wrong password', async () => {
        return request(app).
            post('/login')
            .send({
                uname: "admin",
                password: "Admin@121"
            })
            .expect(401)
    })
    it('returns 401 for wrong username', async () => {
        return request(app).
            post('/login')
            .send({
                uname: "admin2",
                password: "Admin@121"
            })
            .expect(401)
    })
})