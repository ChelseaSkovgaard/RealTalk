$('.question-form').on('submit', function(e) {
  (e).preventDefault();
  $.ajax({
    type: 'POST',
    url: '/questions',
    data: {
      question_text: 'How are you?'
    }
  }).then(function(response) {
    console.log(response)
  })
})
