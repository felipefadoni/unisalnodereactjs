import Tasks from '../models/Tasks';

class TasksController {
  async index(request, response) {
    try {
      const { todo_list_id } = request.params;
      const getTasks = await Tasks.findByIdTodoList({ todo_list_id });
      return response.json(getTasks);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async create(request, response) {
    try {
      const { todo_list_id } = request.params;
      const { name, date_limit } = request.body;

      if (!name)
        return response
          .status(400)
          .json({ message: 'O Nome da Task não foi informado.' });

      if (!date_limit)
        return response
          .status(400)
          .json({ message: 'A Data limite não foi informada.' });

      const taskCreated = await Tasks.createTask({
        todo_list_id,
        name,
        date_limit,
        status: false
      });

      return response.status(201).json(taskCreated);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const updateTask = await Tasks.updateTask({ id });
      return response.status(202).json(updateTask);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await Tasks.deleteTask({ id });
      return response
        .status(202)
        .json({ message: 'Task foi deletada com sucesso!' });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new TasksController();
