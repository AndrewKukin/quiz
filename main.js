// все варианты ответов options
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

// сам вопрос
const question = document.getElementById('question');

// номер вопроса
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let score = 0; // итогвый результат

const correctAnswer = document.getElementById('correct-answer'), //количество правильных ответов
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'); //количество всех вопросаов в модальном окне

const btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Сколько спутников у Марса?',
        options: [
                    '1) 13',
                    '2) 2',
                    '3) 50',
                    '4) 1',
        ],
        rightAnswer: 1
    },

    {
        question: 'Самый большой вулкан Солнечной системы называется «Гора Олимп». Где он находится?',
        options: [
                    '1) Юпитер',
                    '2) Земля',
                    '3) Марс',
                    '4) Венера',
        ],
        rightAnswer: 2
    },

    {
        question: 'Из чего в основном состоит Солнце?',
        options: [
                    '1) жидкая лава',
                    '2) расплавленный метал',
                    '3) газ',
                    '4) камень',
        ],
        rightAnswer: 2
    },

    {
        question: 'Из чего в основном состоят кометы?',
        options: [
                    '1) ядовитая жидкость',
                    '2) лед и пыль',
                    '3) ржавый металл',
                    '4) расплавленный камень.',
        ],
        rightAnswer: 1
    },

    {
        question: 'К какой планете принадлежат спутники Оберон и Титания?',
        options: [
                    '1) Юпитер',
                    '2) Уран',
                    '3) Венера',
                    '4) Земля',
        ],
        rightAnswer: 1
    },

    {
        question: 'Какой из вариантов лучше всего описывает атмосферу, окружающую Венеру?',
        options: [
                    '1) яркая и солнечная',
                    '2) холодная и снежная',
                    '3) холодная и влажная',
                    '4) горячая и ядовитая',
        ],
        rightAnswer: 3
    },

    {
        question: 'Какая из этих планет самая маленькая?',
        options: [
                    '1) Юпитер',
                    '2) Уран',
                    '3) Земля',
                    '4) Меркурий',
        ],
        rightAnswer: 3
    },

    {
        question: 'Какие две планеты вращаются в обратном направлении от остальных?',
        options: [
                    '1) Уран и Венера ',
                    '2) Венера и Плутон',
                    '3) Меркурий и Юпитер',
                    '4) Земля и Нептун',
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestions.innerHTML = questions.length; // вывод колиичества вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question //сам вопрос

    // мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей странийы
    indexOfPage++;// увеличение индекса страницы
};

let completedAnswers = [] // массив для уже хаданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswers = el => { // как сравнить на ответ и правильный ответ
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct')
        score++
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong')
    }
    disabledOptions();
};

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswers(e));
};

const disabledOptions = () => { // функция которая отключает остальные варианты при выборе
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};

// удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
