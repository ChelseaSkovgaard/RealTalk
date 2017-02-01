$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: '/questions'
  }).then(function(response) {
    response.forEach(function(m) {
      $('.questions-container').append(`<p>${m.question_text}</p>`)
    })
  });
})

$(' .question-form').on('submit', function(e) {
  (e).preventDefault();
  var questionText = $('#question-input').val()
  var inputArr = Array.from($('.answer-inputs')).map((m) => m.value)
  $.ajax({
    type: 'POST',
    url: '/questions',
    data: {
      question_text: questionText,
      answer_text: inputArr
    }
  }).then(function(response) {
    console.log(response)
  });
});
