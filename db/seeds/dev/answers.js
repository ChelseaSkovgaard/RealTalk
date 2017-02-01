exports.seed = function( knex, Promise) {
  return knex('answers').del()
  .then(() => {
    return Promise.all([
      knex('answers').insert({
        "id": 1,
        "answer_text": "work",
        "question_id": 1
      }),
      knex('answers').insert({
        "id": 2,
        "answer_text": "play ball",
        "question_id": 1
      }),
      knex('answers').insert({
        "id": 3,
        "answer_text": "play stick ball",
        "question_id": 1
      }),
      knex('answers').insert({
        "id": 4,
        "answer_text": "tango",
        "question_id": 1
      }),
      knex('answers').insert({
        "id": 5,
        "answer_text": "whiskey",
        "question_id": 2
      }),
      knex('answers').insert({
        "id": 6,
        "answer_text": "julien",
        "question_id": 2
      }),
      knex('answers').insert({
        "id": 7,
        "answer_text": "karate",
        "question_id": 2
      }),
      knex('answers').insert({
        "id": 8,
        "answer_text": "big time",
        "question_id": 2
      })
    ]);
  });
};
