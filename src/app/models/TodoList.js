import db from '../../config/db';

class TodoList {
  async findAll() {
    const data = await db('todo_list');

    return data;
  }

  async createTodoList({ name, date_limit }) {
    return await db('todo_list').insert({ name, date_limit }).returning('*');
  }
}

export default new TodoList();
