import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        })
        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)



        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        }

        res.json({ data: product })

    } catch (error) {
        console.log(error)
    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}