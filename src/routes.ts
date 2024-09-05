import { Router } from 'express'
import AuthorController from './controllers/author-controller'
import CategoryController from './controllers/category-controller'

const routes = Router()

routes.post('/authors', new AuthorController().create)
routes.get('/authors', new AuthorController().list)
routes.get('/authors/:id', new AuthorController().show)
routes.put('/authors/:id', new AuthorController().update)
routes.delete('/authors/:id', new AuthorController().delete)

routes.post('/authors/:id/profile', new AuthorController().createProfile)

routes.post('/categories', new CategoryController().create)

export default routes