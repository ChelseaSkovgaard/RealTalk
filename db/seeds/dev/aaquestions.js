exports.seed = function( knex, Promise) {
  return knex('questions').del()
  .then(() => {
    return Promise.all([
      knex('questions').insert({
        "id": 1,
        "question_text": "Which hobby is most splendid?",
        "created_at": "2017-02-01T21:19:04.721Z"
      }),
      knex('questions').insert({
        "id": 2,
        "question_text": "Which activity is most optimized?",
        "created_at": "2017-02-01T21:19:04.721Z"
      }),
    ]);
  });
};
