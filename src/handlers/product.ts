import {Request, Response } from 'express'
import { check, validationResult} from 'express-validator'
import Product from '../models/Product.model'

export const createProduct = async (req: Request, res: Response) => {


    //validations

    await check('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name has to be string')
            .run(req)

    await check('price')
            .notEmpty().withMessage('Price is required')
            .isNumeric().withMessage('Price has to be numeric value')
            .custom(value => value > 0).withMessage('Price has to be greater than 0')
            .run(req)

    let errors = validationResult(req)


    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const product = await Product.create(req.body)
    res.json({data: product})
}
