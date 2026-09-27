document.addEventListener("DOMContentLoaded", () => {

    let totalScore = 0;

    const totalScoreElement =
        document.getElementById("totalScore");

    const bigScore =
        document.getElementById("bigScore");

    const scoreTitle =
        document.getElementById("scoreTitle");

    const scoreMessage =
        document.getElementById("scoreMessage");


    function updateScore() {

        const formatted =
            String(totalScore).padStart(3, "0");

        totalScoreElement.textContent =
            formatted;

        bigScore.textContent =
            formatted;


        if (totalScore >= 180) {

            scoreTitle.textContent =
                "LEGENDARY BESTIE";

            scoreMessage.textContent =
                "Okay. You actually know the lore.";

        } else if (totalScore >= 100) {

            scoreTitle.textContent =
                "BESTIE BOSS";

            scoreMessage.textContent =
                "The friendship knowledge is strong.";

        } else if (totalScore >= 50) {

            scoreTitle.textContent =
                "CHAOS MASTER";

            scoreMessage.textContent =
                "Not bad. You're getting there.";

        } else {

            scoreTitle.textContent =
                "ROOKIE BESTIE";

            scoreMessage.textContent =
                "The assessment has only just begun.";

        }

    }


    function addScore(points) {

        totalScore += points;

        updateScore();

    }


    updateScore();


    /* =====================================================
       GAME TABS
    ===================================================== */

    const tabs =
        document.querySelectorAll(".game-tab");

    const panels = {

        quiz:
            document.getElementById("quizGame"),

        memory:
            document.getElementById("memoryGame"),

        cake:
            document.getElementById("cakeGame")

    };


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const selected =
                tab.dataset.game;


            tabs.forEach(item => {

                item.classList.remove("active");

            });


            tab.classList.add("active");


            Object.values(panels).forEach(panel => {

                panel.classList.remove("active");

            });


            panels[selected].classList.add("active");

        });

    });


    /* =====================================================
       QUIZ
    ===================================================== */

    const questions = [

        {
            question:
                "Who is more likely to start unnecessary bakchodi? 😂",

            options: [
                "Mitali 😎",
                "Aniruddh 💀",
                "Both of us",
                "Neither. We're innocent."
            ],

            answer: 2
        },

        {
            question:
                "Who takes longer to reply?",

            options: [
                "Mitali",
                "Aniruddh",
                "Aashish",
                "Depends on the day"
            ],

            answer: 3
        },

        {
            question:
                "What keeps this friendship alive?",

            options: [
                "Mutual respect",
                "Food",
                "Insults & chaos",
                "All of the above"
            ],

            answer: 1
        },

        {
            question:
                "what would you like more",

            options: [
                "Chocolate cake",
                "Biryani",
                "Butter Chicken 💀",
                "Sukda Bombil"
            ],

            answer: 3
        },

        {
            question:
                "What's the best birthday gift?",

            options: [
                "Money",
                "Scientific Calculator",
                "Casio Watch",
                "FREE FOOD 🍕"
            ],

            answer: 3
        }

    ];


    let currentQuestion = 0;


    const questionElement =
        document.getElementById("quizQuestion");

    const optionsElement =
        document.getElementById("quizOptions");

    const feedbackElement =
        document.getElementById("quizFeedback");

    const progressElement =
        document.getElementById("quizProgress");


    function loadQuestion() {

        const question =
            questions[currentQuestion];


        progressElement.textContent =
            `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;


        questionElement.textContent =
            question.question;


        optionsElement.innerHTML = "";

        feedbackElement.textContent = "";


        question.options.forEach(
            (option, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "quiz-option";

                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () => {

                        answerQuestion(
                            button,
                            index,
                            question.answer
                        );

                    }
                );


                optionsElement.appendChild(button);

            }
        );

    }


    function answerQuestion(
        button,
        selected,
        correct
    ) {

        const options =
            document.querySelectorAll(
                ".quiz-option"
            );


        options.forEach(option => {

            option.disabled = true;

        });


        if (selected === correct) {

            button.classList.add("correct");

            feedbackElement.textContent =
                "✓ Correct. +20 points.";

            addScore(20);

        } else {

            button.classList.add("wrong");

            options[correct]
                .classList.add("correct");

            feedbackElement.textContent =
                "Close enough 😂 +5 points.";

            addScore(5);

        }


        setTimeout(() => {

            currentQuestion++;


            if (
                currentQuestion <
                questions.length
            ) {

                loadQuestion();

            } else {

                questionElement.textContent =
                    "Quiz complete.";

                optionsElement.innerHTML = "";

                feedbackElement.textContent =
                    "You survived the friendship assessment.";

            }

        }, 900);

    }


    loadQuestion();


    /* =====================================================
       MEMORY MATCH
    ===================================================== */

    const memoryBoard =
        document.getElementById("memoryBoard");

    const memoryScore =
        document.getElementById("memoryScore");

    const memoryFeedback =
        document.getElementById("memoryFeedback");


    const symbols = [
        "❤️",
        "🎂",
        "😂"
    ];


    let cards = [
        ...symbols,
        ...symbols
    ];


    cards.sort(
        () => Math.random() - 0.5
    );


    let flipped = [];

    let matched = 0;


    cards.forEach(symbol => {

        const card =
            document.createElement("button");

        card.className =
            "memory-card";

        card.textContent =
            "?";

        card.dataset.symbol =
            symbol;


        card.addEventListener(
            "click",
            () => flip(card)
        );


        memoryBoard.appendChild(card);

    });


    function flip(card) {

        if (
            flipped.length >= 2 ||
            card.classList.contains("flipped") ||
            card.classList.contains("matched")
        ) {

            return;

        }


        card.classList.add("flipped");

        card.textContent =
            card.dataset.symbol;

        flipped.push(card);


        if (flipped.length === 2) {

            checkPair();

        }

    }


    function checkPair() {

        const first =
            flipped[0];

        const second =
            flipped[1];


        if (
            first.dataset.symbol ===
            second.dataset.symbol
        ) {

            first.classList.add("matched");

            second.classList.add("matched");

            matched++;

            addScore(30);

            memoryScore.textContent =
                `${String(matched).padStart(2, "0")} / 03`;

            memoryFeedback.textContent =
                "Memory unlocked. +30 points.";

            flipped = [];


            if (matched === 3) {

                memoryFeedback.textContent =
                    "🏆 Memory Master unlocked.";

            }

        } else {

            memoryFeedback.textContent =
                "Nope. Try again.";


            setTimeout(() => {

                first.classList.remove("flipped");

                second.classList.remove("flipped");

                first.textContent = "?";

                second.textContent = "?";

                flipped = [];

            }, 700);

        }

    }


    /* =====================================================
       CAKE CATCHER
    ===================================================== */

    const cakeButton =
        document.getElementById("cakeButton");

    const cakeScore =
        document.getElementById("cakeScore");

    const cakeFeedback =
        document.getElementById("cakeFeedback");

    const cakeDisplay =
        document.getElementById("cakeDisplay");


    let cakes = 0;


    cakeButton.addEventListener(
        "click",
        () => {

            if (cakes >= 5) {
                return;
            }


            cakes++;

            cakeScore.textContent =
                String(cakes).padStart(2, "0");


            addScore(10);


            cakeDisplay.textContent =
                cakes % 2 === 0
                    ? "🍰"
                    : "🎂";


            if (cakes < 5) {

                cakeFeedback.textContent =
                    `${5 - cakes} more cake(s).`;

            } else {

                addScore(50);

                cakeFeedback.textContent =
                    "🏆 Cake Champion unlocked.";

                cakeButton.textContent =
                    "CHAMPION";

                cakeButton.disabled = true;

            }

        }
    );

});