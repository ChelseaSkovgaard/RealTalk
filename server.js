const express = require('express');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
// const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Real Talk';

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (request, response) => {
  response.sendfile(__dirname + '/public/index.html')
})

app.get('/signin', (request, response) => {
  response.sendfile(__dirname + '/public/signin.html')
})

app.post('/users', (request,response) => {
  const { name } = request.body;
  const user = {name: name}
  database('users').insert(user)
  .then(function() {
    database('users').select()
      .then(function(users){
        response.status(200).json(users);
      })
      .catch(function(error) {
        response.status(404);
      });
  });
});

app.post('/questions', (request,response) => {
  const { question_text, answer_text } = request.body;
  const questionInfo = {question_text:question_text, created_at: new Date}
  var id = database('questions').returning('id').insert(questionInfo)
  .then(function(id) {
    var parsedId = parseInt(id[0])
    answer_text.forEach((m) => {
       database('answers').insert({answer_text: m, question_id: parsedId })
       .then(function(data) {
       })
      })
    }) .then(function() {
        database('answers').select()
        .then(function(answers){
          response.status(200).json(answers)
        })
      })
    .catch(function(error) {
    response.status(404);
  })
});

app.get('/questions', (request, response) => {
  database('questions').select()
    .then(function(questions) {
      response.status(200).json(questions)
    });
});

app.get('/answers', (request, response) => {
  database('answers').select()
  .then(function(answers) {
    response.status(200).json(answers)
  });
});

app.get('/:id', (request, response) => {
  database('questions').where('id', request.params.id).select()
    .then(function(){
      response.redirect('/questions');
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
