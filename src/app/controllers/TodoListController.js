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
    const { name, date_limit } = request.body;

    if (!name)
      return response
        .status(400)
        .json({ message: 'Nome da TodoList não foi informado.' });

    const todoList = await TodoList.createTodoList({ name, date_limit });

    return response.json(todoList);
  }
}

export default new TodoListController();
