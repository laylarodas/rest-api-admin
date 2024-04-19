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


export const updateProduct = async (req: Request, res: Response) => {
    try {

        // get product id
        const { id } = req.params
        const product = await Product.findByPk(id)

        // check if product exists
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        }

        // update product
        await product.update(req.body)
        await product.save()

        // return updated product
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}



export const updatedAvailability = async (req: Request, res: Response) => {
    try {

        // get product id
        const { id } = req.params
        const product = await Product.findByPk(id)

        // check if product exists
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        }

        // update product
        product.availability = !product.dataValues.availability
        await product.save()

        // return updated product
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        }

        await product.destroy()
        res.json({ message: 'Product deleted' })
    } catch (error) {
        console.log(error)
    }
}
