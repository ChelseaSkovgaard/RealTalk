const express = require('express');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Real Time';

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (request, response) => {
  response.sendfile(__dirname + '/public/index.html')
})

app.get('/signin', (request, response) => {
  response.sendfile(__dirname + '/public/signin.html')
})

app.post('/users', (request,response) => {
  const { name } = request.body;
  console.log(request.body.name)
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
  const { user_id, question_text } = request.body;
  console.log(user_id, question_text);
  const questionInfo = {user_id:user_id, question_text:question_text, created_at: new Date}
  database('questions').insert(questionInfo)
  .then(function() {
    database('questions').select()
      .then(function(questions){
        response.status(200).json(questions);
      })
      .catch(function(error) {
        response.status(404);
      });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
