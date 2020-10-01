exports.up = function (knex) {
  return knex.schema.createTable('todo_list', (table) => {
    table.increments('id');
    table.string('name', 200).notNullable();
    table.date('date_limit');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('todo_list');
};
