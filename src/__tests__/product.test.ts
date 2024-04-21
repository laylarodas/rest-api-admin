import request from "supertest";
import server from "../server";

 
describe('POST /api/products', () => {

    it('should display validation error', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({});//simulation send empty data

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(5);//4 errors

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveLength(4);
    });

    it('should create a new product', async () => {
       const response = await request(server)
            .post('/api/products')
            //send data
            .send({
                name: 'product-test',
                price: 100
            });

        expect(response.status).toBe(201);//201 created
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body.data).not.toHaveProperty('errors');
    });
});