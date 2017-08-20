//This first part shows the call back function for the elements.
$.fn.every = function(callback) {
  var numElements = this.length;
  return this.filter(callback).length == numElements;
};
//this shows the variables that have a function like submit button.
$.fn.simpleQuiz = function(options) {
  if(!this.length) { return; };
  
  this.each(function() {
    var form = $(this);
    var submitButton = form.find(':submit');
    var questions = form.find('.question');
    var choices = form.find(':find');
// This is the variable that creates and submits the function
    var init = function() {
      choices.on('change', answerChanged);
      form.on('submit', answersSubmitted);

      answerChanged();
    };
//IF THE ANSWERS ARE SUBMITTED THETHE FUNCTION KEY WILL SAY TRY AGAIN
    var answersSubmitted = function(event) {
      if(!hasPassed()) {
        event.preventDefault();
        alert('Please try again.');
      }
    };
//THIS KEEPS TRACK OF THE SCORE
    var score = function() {
      return form.find(':checked[data-correct]').length;
    };
// THIS HAS PASSED THE FUNCTION
    var hasPassed = function() {
      return score() == questions.length;
    };
// THE ELEMENT IS BEING CHECKED AT THIS POINT
    var hasCheckedElement = function() {
      return $(this).has(':checked').length;
    };
//
    var allQuestionsAnswered = function() {
      return questions.every(hasCheckedElement);
    };

    var answerChanged = function() {
      if(allQuestionsAnswered()) {
        submitButton.removeAttr('disabled');
      } else {
        submitButton.attr('disabled', 'disabled');
      }
    };

    init();
  });

};