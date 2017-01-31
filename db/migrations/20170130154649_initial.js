exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('questions', function(table){
            table.increments('id').primary();
            table.string('question_text');
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
        knex.schema.dropTable('users')
    ]);
};
