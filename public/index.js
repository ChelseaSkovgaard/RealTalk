$('.question-form').on('submit', function(e) {
  (e).preventDefault();
  var questionText = $('#question-input').val()
  var inputArr = Array.from($('.answer-inputs')).map((e) => e.value)
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
