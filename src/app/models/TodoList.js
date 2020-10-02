import db from '../../config/db';

class TodoList {

  async findById({ id }) {
    return await db('todo_list').where({ id }).first();
  }

  async findAll() {
    const data = await db('todo_list').orderBy('date_limit', 'asc');
    return data;
  }

  async createTodoList({ name, date_limit }) {
    return await db('todo_list').insert({ name, date_limit }).returning('*');
  }

  async deleteTodoList({ id }) {
    await db('todo_list').delete().where({ id });
  }
}

export default new TodoList();
