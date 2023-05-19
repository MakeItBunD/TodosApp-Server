import type { Request, Response } from 'express';
import Todo from '../models/todo';
import { validationResult } from 'express-validator';
import handleError from '../utils/handleError';
import CustomRequest from '../interfaces/CustomRequest';
import ITodo from '../interfaces/ITodo';

class TodoController {
  async getTodos(req: Request, res: Response) {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      return handleError(res, 500, error);
    }
  }

  async addTodo(req: CustomRequest<{ title: string }>, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleError(res, 500, 'Title must be between 1 and 80 characters');
      }
      const { title } = req.body;
      const isExist = await Todo.findOne({ title });
      if (isExist) {
        return handleError(res, 500, 'Todo allready exsisted');
      }
      const todo = new Todo({ title });
      await todo.save();
      res.status(201).json({ message: 'Todo was added' });
    } catch (error) {
      return handleError(res, 500, 'Something wrong...');
    }
  }

  async updateTodo(req: CustomRequest<ITodo>, res: Response) {
    try {
      const todoId = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleError(res, 500, 'Title must be between 1 and 80 characters');
      }
      if (!Todo.findById(todoId)) {
        return res.status(200).json({ message: 'Todo is not existed' });
      }
      const { title } = req.body;
      const isExist = await Todo.findOne({ title });
      if (isExist) {
        return handleError(res, 500, 'Todo allready exsisted');
      }
      await Todo.findByIdAndUpdate(todoId, req.body);
      res.status(200).json({ message: 'Todo was updated' });
    } catch (error) {
      return handleError(res, 500, 'Something wrong...');
    }
  }

  async deleteTodo(req: CustomRequest<{ id: string }>, res: Response) {
    try {
      const todoId = req.params.id;
      await Todo.findByIdAndDelete(todoId);
      res.status(200).json({ message: 'Todo was deleted' });
    } catch (error) {
      if (error.name === 'CastError') {
        return handleError(res, 500, 'Todo was not existed');
      } else {
        return handleError(res, 500, 'Something wrong...');
      }
    }
  }
}

export default new TodoController();