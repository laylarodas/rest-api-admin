import { Router } from 'express';
import { createProduct, getProducts } from './handlers/product';
import { body } from 'express-validator';
import { handleInputErrors } from './middlewares';

const router = Router();

router.get('/', getProducts);

router.post('/',
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name has to be string'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price has to be numeric value')
        .custom(value => value > 0).withMessage('Price has to be greater than 0'),
    handleInputErrors,
    createProduct
);


export default router;