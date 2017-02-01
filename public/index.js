$('.question-form').on('submit', function(e) {
  (e).preventDefault();
  var questionText = $('#question-input').val()
  var answerInput = $('#answer-input-1').val()
  $.ajax({
    type: 'POST',
    url: '/questions',
    data: {
      question_text: questionText,
      answer_text: answerInput
    }
  }).then(function(response) {
    console.log(response)
  })
})
