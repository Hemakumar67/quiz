const quizQuestions = [
  {
    "question": "What keyword is used to check whether a given property is valid or not?",
    "answers": {
      "a": "if",
      "b": "of",
      "c": "in",
    },
    "correctAnswer": "c",
  },
  {
    "question": `(function(){
      setTimeout(()=> console.log(1),2000);
      console.log(2);
      setTimeout(()=> console.log(3),0);
      console.log(4);
     })();   What is the output?`,
    "answers": {
      "a": "2 4 3 1",
      "b": "2 3 4 1",
      "c": "4 2 3 1",
    },
    "correctAnswer": "a",
  },
  {
    "question": `let a = null || undefined;
    a == null ? console.log(a) : console.log('error');
    what is the output?`,
    "answers": {
      "a": "null",
      "b": "undefined",
      "c": "error",
    },
    "correctAnswer": "b",
  },
  {
    "question": `var value = true + true + true * 3;
    console.log(value); what is the output?`,
    "answers": {
      "a": "0 || Error",
      "b": "3",
      "c": "5",
    },
    "correctAnswer": "c",
  },
  {
    "question": `function test(...args) {
      console.log(typeof args);
     }
     test(12); what is the output?`,
    "answers": {
      "a": "Number",
      "b": "NaN",
      'c': "Object",
    },
    "correctAnswer": "c",
  },
  {
    "question": `const array = [1, 2, 3];
    const extension = [4, 5, 6];
    array = [...extension, ...array]
    console.log(array) what is the output?`,
    "answers": {
      "a": "[1,2,3]",
      "b": "Error",
      'c': "[4,5,6,1,2,3]",
    },
    "correctAnswer": "b",
  },
  {
    "question": `var a = 4;
    function baaz() {
      a = 6;
      boom();
    }; function boom() {
      var a = 8;
      console.log(a)
    };
    baaz();
    console.log(a); what is the output?`,
    "answers": {
      "a": "8,6",
      "b": "4,8",
      'c': "6,4",
    },
    "correctAnswer": "a",
  },
  {
    "question": `var arr = ["B", "A"];
    var [first, second, ...rest] = arr;
    console.log(rest); what is the output?`,
    "answers": {
      "a": "[]",
      "b": "['B']",
      'c': "['B','A]",
    },
    "correctAnswer": "a",
  },
  {
    "question": `const a;
    console.log(a); what is the output?`,
    "answers": {
      "a": "undefined",
      "b": "Error",
      'c': "null",
    },
    "correctAnswer": "b",
  },
  {
    "question": `var a = 10;
    {
     var a = 20;
   }
   console.log(a); what is the output?`,
    "answers": {
      "a": "10",
      "b": "20",
      'c': "Error",
    },
    "correctAnswer": "b",
  },
];

$('#quiz-div').hide();      // initially hide the questions
// $('#next').append('next')
$('#finish-btn').hide();
$('#question-number').hide()
var iterate = -1;
let intravelSet = null;
let mark = 0;

$(document).on('click','#start',function(){   // start button click
  $('#quiz-div').show();
  $('#question-number').show()
  $('#start-div').hide();
  iterate = iterate + 1;
  myGreeting(iterate)
})

$(document).on('click','#finish-btn',function(){   // Finish button click
  $('#quiz-div').hide();
  var value = $("input[type=radio][name=fav_quiz]:checked").val();
  console.log('value',value);
  mark = quizQuestions[iterate].correctAnswer == value ? mark + 1 : mark;
  console.log('mark',mark)
  $('#quiz').hide();
  $('#finish-btn').hide();
  clearInterval(intravelSet);
  $('#time-ques').hide();
  $('#display-mark').append(`Your Score is: ${mark}<br><span>Total Questions: ${quizQuestions.length}<span>`);
  // $('#question-number').empty().append(`Total Questions: ${quizQuestions.length}`)

})

function startTimer(duration) {    // set intravel function
  var timer = duration,
    minutes,
    seconds;
    intravelSet = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // display.textContent = minutes + ":" + seconds;
    $('#top-time').empty().append(`Time: ${minutes}:${seconds}`)
    if (--timer < 0) {
      console.log("time up!!!!");
      iterate = iterate + 1;
      quizQuestions.length-1 < iterate ? clearInterval(intravelSet): myGreeting(iterate)
      timer = duration;
    }
  }, 1000);
}

function myGreeting(index) {    // questions append function
  console.log("set timeout iterate index", typeof index, index);
  let targetDiv = document.getElementById("quiz");
  console.log("target Division", quizQuestions[iterate]);
  targetDiv.innerHTML = "";
  $('#question-number').empty().append(`Question no: ${index + 1}`)
  $('#quiz').append(`<span>${quizQuestions[index].question}</span><br>
  <input type="radio" name="fav_quiz" value="a"> ${quizQuestions[index].answers.a}<br>
  <input type="radio"  name="fav_quiz" value="b"> ${quizQuestions[index].answers.b}<br>
  <input type="radio" name="fav_quiz" value="c"> ${quizQuestions[index].answers.c}`)

  console.log("iterate index after increase", iterate);
  var fiveMinutes = 60 * 1;
  // display = document.querySelector("#time");
  clearInterval(intravelSet); 
  // startTimer(fiveMinutes, display);
  startTimer(fiveMinutes);
  if(index == quizQuestions.length-1){
    $('#next').prop('disabled', true).hide();
    $('#finish-btn').show();
  }
}


const nextClick = () => {         // Next button click function
  quizQuestions.length === iterate ? document.getElementById("next").addClass('disabled'):'';
  var fiveMinutes = 60 * 1;
  // display = document.querySelector("#time");
  clearInterval(intravelSet);
  // startTimer(fiveMinutes, display);
  startTimer(fiveMinutes);
  console.log("iterete value in the next click", iterate);
  var value = $("input[type=radio][name=fav_quiz]:checked").val();
  console.log('value',value);
  mark = quizQuestions[iterate].correctAnswer == value ? mark + 1 : mark;
  console.log('mark',mark)
  iterate = iterate + 1;
  console.log("next click iterate value", iterate);
  myGreeting(iterate);
};
document.getElementById("next").addEventListener("click", nextClick);