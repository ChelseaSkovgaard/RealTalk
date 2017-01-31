exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('name');
        }),

        knex.schema.createTable('questions', function(table){
            table.increments('id').primary();
            table.string('question_text');
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            table.timestamps();
        }),

        knex.schema.createTable('answers', function(table){
            table.increments('id').primary();
            table.string('answer_text');
            table.integer('question_id')
                 .references('id')
                 .inTable('questions');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('answers'),
        knex.schema.dropTable('questions'),
        knew.schema.dropTable('users')
    ]);
};
