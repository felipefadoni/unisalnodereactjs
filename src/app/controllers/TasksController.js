import { format } from 'date-fns';
import TodoList from '../models/TodoList';
import Tasks from '../models/Tasks';

class TasksController {
  async index(request, response) {
    try {
      const { todo_list_id } = request.params;
      const getTodoList = await TodoList.findById({ id: todo_list_id });
      const getTasks = await Tasks.findByIdTodoList({ todo_list_id });

      const mapTasks = getTasks.map((task) => {
        const dateFormat = task.date_limit
          ? format(new Date(task.date_limit), 'dd/MM/yyyy')
          : null;
        return {
          ...task,
          dateFormat
        };
      });

      const returnData = {
        todoList: getTodoList,
        tasks: mapTasks
      };

      return response.json(returnData);
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

      const dateFormat = taskCreated[0].date_limit
        ? format(new Date(taskCreated[0].date_limit), 'dd/MM/yyyy')
        : null;

      const mapTaskCreated = {
        ...taskCreated[0],
        dateFormat
      }

      return response.status(201).json(mapTaskCreated);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { status } = request.body;
      const updateTask = await Tasks.updateTask({ id, status });

      const dateFormat = updateTask[0].date_limit
        ? format(new Date(updateTask[0].date_limit), 'dd/MM/yyyy')
        : null;

      const mapTasks = {
        ...updateTask[0],
        dateFormat
      };

      return response.status(202).json(mapTasks);
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
