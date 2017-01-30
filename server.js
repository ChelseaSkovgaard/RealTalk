const express = require('express');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Real Time';

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (request, response) => {
  res.sendfile(__dirname + '/public/index.html')
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
