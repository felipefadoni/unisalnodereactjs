import { format } from 'date-fns';
import TodoList from '../models/TodoList';

class TodoListController {
  async index(request, response) {
    try {
      const getAllData = await TodoList.findAll();
      const formatDateAllData = getAllData.map((data) => {
        const dateFormat = data.date_limit
          ? format(new Date(data.date_limit), 'dd/MM/yyyy')
          : null;
        return {
          ...data,
          dateFormat
        };
      });
      return response.json(formatDateAllData);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async create(request, response) {
    try {
      const { name, date_limit } = request.body;

      if (!name)
        return response
          .status(400)
          .json({ message: 'Nome da TodoList não foi informado.' });

      const checkDateLimit = date_limit ? date_limit : null;

      const todoList = await TodoList.createTodoList({
        name,
        date_limit: checkDateLimit
      });

      const dateFormat = todoList[0].date_limit
          ? format(new Date(todoList[0].date_limit), 'dd/MM/yyyy')
          : null;

      const todoListFormat = {
        ...todoList[0],
        dateFormat
      }

      return response.status(201).json(todoListFormat);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await TodoList.deleteTodoList({ id });
      return response
        .status(204)
        .json({ message: 'TodoList deletado com sucesso!' });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new TodoListController();
