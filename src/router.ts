import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, updatedAvailability } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middlewares';

const router = Router();


/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *             type: object
 *             properties: 
 *                 id:
 *                  type: integer
 *                  description: The product id
 *                  example: "1"
 *                 name:
 *                  type: string
 *                  description: The product name
 *                  example: "Curve Monitor"
 *                 price:
 *                  type: number
 *                  description: The product price
 *                  example: "300"
 *                 availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: "true"
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *         summary: Get all products
 *         tags: 
 *           - Products
 *         description: Return a list of all products
 *         responses:
 *             200:
 *                description: Successfully response
 *                content:
 *                   application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */






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

// route update product
router.put('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name has to be string'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price has to be numeric value')
        .custom(value => value > 0).withMessage('Price has to be greater than 0'),
    body('availability')
        .isBoolean().withMessage('Availability has to be boolean value'),
    handleInputErrors,
    updateProduct
)


router.patch('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    handleInputErrors,
    updatedAvailability
)


router.delete('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    handleInputErrors,
    deleteProduct
)

export default router;