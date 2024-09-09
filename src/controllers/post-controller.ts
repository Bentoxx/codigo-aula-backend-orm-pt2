import { Request, Response } from "express"
import prisma from "../prisma"

type TBodyPost = {
    title: string
    content: string
    author_id: number
    categories: string[]
}
export default class PostController {
    async create(req: Request, res: Response){
        const { title, content, author_id, categories } = req.body as TBodyPost

        try {
            const author = await prisma.author.findUnique({
                where: {
                    id: Number(author_id)
                }
            })

            if(!author){
                return res.status(400).json({
                    message: 'The informed author does not exist.'
                })
            }

            const categoriesExists = await prisma.category.findMany({
                where: {
                    id: { in: categories }
                }
            })

            if (categories.length !== categoriesExists.length){
                return res.status(400).json({
                    message: 'One or more categories do not exist.'
                })
            }

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: author.id,
                    postCategory: {
                        create: categoriesExists.map(category => {
                            return {
                                categoryId: category.id
                            }
                        })
                    }
                }
            })

            return res.status(201).json(post)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }
}