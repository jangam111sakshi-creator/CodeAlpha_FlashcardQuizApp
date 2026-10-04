let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style and design web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is used to make web pages interactive."
    }
];

let currentCard = 0;
let answerVisible = false;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const cardNumberElement = document.getElementById("cardNumber");

const showAnswerBtn = document.getElementById("showAnswerBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");


function saveCards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}


function displayCard() {

    if (flashcards.length === 0) {
        questionElement.textContent = "No flashcards available";
        answerElement.textContent = "";
        cardNumberElement.textContent = "0 / 0";
        return;
    }

    questionElement.textContent = flashcards[currentCard].question;
    answerElement.textContent = flashcards[currentCard].answer;

    answerElement.classList.add("hidden");

    answerVisible = false;

    showAnswerBtn.textContent = "Show Answer";

    cardNumberElement.textContent =
        `${currentCard + 1} / ${flashcards.length}`;
}


showAnswerBtn.addEventListener("click", function () {

    if (answerVisible) {
        answerElement.classList.add("hidden");
        showAnswerBtn.textContent = "Show Answer";
        answerVisible = false;
    } else {
        answerElement.classList.remove("hidden");
        showAnswerBtn.textContent = "Hide Answer";
        answerVisible = true;
    }
});


nextBtn.addEventListener("click", function () {

    if (flashcards.length === 0) return;

    currentCard++;

    if (currentCard >= flashcards.length) {
        currentCard = 0;
    }

    displayCard();
});


prevBtn.addEventListener("click", function () {

    if (flashcards.length === 0) return;

    currentCard--;

    if (currentCard < 0) {
        currentCard = flashcards.length - 1;
    }

    displayCard();
});


addBtn.addEventListener("click", function () {

    let question = prompt("Enter your question:");

    if (!question) return;

    let answer = prompt("Enter the answer:");

    if (!answer) return;

    flashcards.push({
        question: question,
        answer: answer
    });

    currentCard = flashcards.length - 1;

    saveCards();
    displayCard();

    alert("Flashcard added successfully!");
});


editBtn.addEventListener("click", function () {

    if (flashcards.length === 0) return;

    let newQuestion = prompt(
        "Edit question:",
        flashcards[currentCard].question
    );
    
    if (!newQuestion) return;

    let newAnswer = prompt(
        "Edit answer:",
        flashcards[currentCard].answer
    );

    if (!newAnswer) return;

    flashcards[currentCard].question = newQuestion;
    flashcards[currentCard].answer = newAnswer;

    saveCards();
    displayCard();

    alert("Flashcard updated successfully!");
});


deleteBtn.addEventListener("click", function () {

    if (flashcards.length === 0) return;

    let confirmDelete = confirm(
        "Are you sure you want to delete this flashcard?"
    );

    if (!confirmDelete) return;

    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length) {
        currentCard = flashcards.length - 1;
    }

    if (currentCard < 0) {
        currentCard = 0;
    }

    saveCards();
    displayCard();

    alert("Flashcard deleted successfully!");
});


displayCard();