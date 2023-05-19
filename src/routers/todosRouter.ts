import { Router } from 'express';
import controller from '../controllers/todosController';
import { check } from 'express-validator';

const router = Router();
router.get('/todos', controller.getTodos);
router.post('/todos', [check('title').isLength({ min: 1, max: 80 })], controller.addTodo);
router.put('/todos/:id', [check('title').isLength({ min: 1, max: 80 })], controller.updateTodo);
router.delete('/todos/:id', controller.deleteTodo);

export default router;