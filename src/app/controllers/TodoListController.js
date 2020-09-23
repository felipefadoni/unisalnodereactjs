import TodoList from '../models/TodoList';

class TodoListController {
  async index(request, response) {
    try {
      const getAllData = await TodoList.findAll();
      return response.json(getAllData);
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

      const todoList = await TodoList.createTodoList({ name, date_limit });

      return response.status(201).json(todoList);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await TodoList.deleteTodoList({ id });
      return response.status(204).json({ message: 'TodoList deletado com sucesso!' });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new TodoListController();
