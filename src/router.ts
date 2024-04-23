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
router.get('/', getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *     get:
 *        summary: Get a product by id
 *        tags:
 *           - Products
 *        description: Return a product based on its unique ID
 *        parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *        responses:
 *           200:
 *             description: Successfully Response
 *             content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *           404:
 *              description: Product not found
 *           400:
 *              description: Bad Request - Invalid ID
 * 
 * 
 */
router.get('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    handleInputErrors,
    getProductById);


/**
 * @swagger
 * /api/products:
 *    post:
 *      summary: Create a new product
 *      tags:
 *       - Products
 *      description: Return a new record in the database
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                name: 
 *                 type: string
 *                 example: "Curve Monitor"
 *                price:
 *                 type: number
 *                 example: "300"
 *      responses:
 *       201:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *          description: Bad Request - Invalid input data
 */
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


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Updates a product with user input
 *      tags:
 *       - Products
 *      description: Return the updated product
 *      parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *              type: integer
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name: 
 *                      type: string
 *                      example: "Curve Monitor"
 *                  price:
 *                      type: number
 *                      example: "300"
 *                  availability:
 *                     type: boolean
 *                     example: "true"
 *      responses:
 *       200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *          description: Bad Request - Invalid ID or invalid input data
 *       404:
 *          description: Product Not Found
 * 
 * 
 */
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



/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *     summary: Updates the availability of a product
 *     tags:
 *          - Products
 *     description: Return the updated product availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *              type: integer
 *     responses:
 *       200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *          description: Bad Request - Invalid ID
 *       404:
 *          description: Product Not Found
 * 
 */


router.patch('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    handleInputErrors,
    updatedAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *             - in: path
 *               name: id
 *               description: The ID of the product to delete
 *               required: true
 *               schema:
 *                 type: integer
 *          responses:
 *            200:
 *                  description: Successfully response
 *                  content:
 *                      application/json:
 *                         schema:
 *                           type: string
 *                           value: "Product deleted"
 *            400:
 *                  description: Bad Request - Invalid ID
 *            404:
 *                  description: Product Not Found
 * 
 */


router.delete('/:id',
    param('id').isInt().withMessage('Id has to be integer'),
    handleInputErrors,
    deleteProduct
)

export default router;