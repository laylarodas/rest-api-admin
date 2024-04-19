import { Router } from 'express';
import { createProduct, getProductById, getProducts } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middlewares';

const router = Router();

// route get all products
router.get('/', getProducts)

// route get product by id
router.get('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    handleInputErrors,
    getProductById);


    // route create product
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
)




export default router;