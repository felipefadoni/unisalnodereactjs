import db from '../../config/db';

class Tasks {
  async findByIdTodoList({ todo_list_id }) {
    const listTasks = await db('tasks')
      .where({ todo_list_id })
      .orderBy('date_limit', 'asc');
    return listTasks;
  }

  async createTask({ todo_list_id, name, date_limit, status }) {
    return await db('tasks')
      .insert({ todo_list_id, name, date_limit, status })
      .returning('*');
  }

  async updateTask({ id }) {
    return await db('tasks')
      .update({ status: true })
      .where({ id })
      .returning('*');
  }

  async deleteTask({ id }) {
    await db('tasks').delete().where({ id });
  }
}

export default new Tasks();
