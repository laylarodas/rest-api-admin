
import { connectDB } from '../server';
import db from '../config/db';


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