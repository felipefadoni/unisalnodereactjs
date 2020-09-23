exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('name', 200).notNullable();
    table.boolean('status');
    table.dateTime('date_limit');

    table.integer('todo_list_id').unsigned();
    table.foreign('todo_list_id').references('todo_list.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
