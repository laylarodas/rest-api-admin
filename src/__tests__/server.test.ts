import request from 'supertest';
import server, { connectDB } from '../server';
import db from '../config/db';

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.msg).toBe('From API');

        expect(response.status).not.toBe(404);
        expect(response.body.msg).not.toBe('from api');
    });
});

//create a mock for the db connection
jest.mock('../config/db');

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')//mock the authenticate method
            .mockRejectedValueOnce(new Error('Failed to connect to db'))//mock the error

        const consoleSpy = jest.spyOn(console, 'log');//mock the console.log method

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(//check if the error message is logged
            expect.stringContaining('Failed to connect to db')
        );

    });
})