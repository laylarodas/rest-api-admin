import request from "supertest";
import server from "../server";


describe('POST /api/products', () => {

    it('should display validation error', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({});//simulation send empty data

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(5);//5 errors

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);
    });

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'product-test',
                price: 0
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'product-test',
                price: 'price-test'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(3);
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


describe('GET /api/products', () => {

    it('should check if the route exists', async () => {
        const response = await request(server)
            .get('/api/products');

        expect(response.status).not.toBe(404);
    });

    it('GET a JSON response with products', async () => {
        const response = await request(server)
            .get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);

        expect(response.body).not.toHaveProperty('errors');
    });
}
);