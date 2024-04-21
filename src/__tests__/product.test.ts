import request from "supertest";
import server from "../server";

 
describe('POST /api/products', () => {
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
        expect(response.body.data).not.toHaveProperty('error');
    });
});