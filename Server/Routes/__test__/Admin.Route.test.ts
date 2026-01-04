import request from "supertest";
import { app } from "../../app";

describe('POST /admin/update-role', () => {
    const cookie=signin();
    it('returns 404 when the key does not exist ', async () => {
        return request(app).
            post('/admin')
            .send({
                name: "anything",
                data: "hello"
            })
            .expect(404)
    })
})