document.addEventListener("DOMContentLoaded", () => {
    const cardsArray = ["1.jpg", "2.jpg", "3.jpg", "8.jpg", "5.jpg", "9.jpg", "1.jpg", "2.jpg", "3.jpg", "8.jpg", "5.jpg", "9.jpg"];
    let shuffledCards = [], selectedCards = [], matchedCards = [], moveCount = 0, timer, timeElapsed = 0;
    let len = cardsArray.length;

    
    function shuffleCards() {
        let tempArray = [...cardsArray];
        shuffledCards = [];

        while (tempArray.length) {
            let i = Math.floor(Math.random() * tempArray.length);
            shuffledCards.push(tempArray.splice(i, 1)[0]);
        }
    }

    shuffleCards();

    const gameBoard = document.getElementById("game-board");
    const movesDisplay = document.getElementById("moves"); 
    const timerDisplay = document.getElementById("timer"); 
    const gameOverPopup = document.getElementById("game-over"); 
    const restartButton = document.getElementById("restart"); 

    
    function createBoard() {
        gameBoard.innerHTML = "";  

        shuffledCards.forEach((card, index) => {
            let cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.dataset.symbol = card;
            cardElement.dataset.index = index;

            let img = document.createElement("img");
            img.src = "back.png";
            img.className = "card-image";
            cardElement.appendChild(img);

            cardElement.addEventListener("click", flipCard);
            gameBoard.appendChild(cardElement);
        });
    }


    function startTimer() {
        if (!timer) {
            timer = setInterval(() => {
                timeElapsed++;
                timerDisplay.textContent = formatTime(timeElapsed);
            }, 1000);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
    }


    function flipCard() {
        if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
            this.firstChild.src = this.dataset.symbol;
            this.classList.add("flipped");
            selectedCards.push(this);

            if (selectedCards.length === 1) {
                startTimer();
            }
        }

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 600);
        }
    }

    function checkMatch() {
        let card1 = selectedCards[0], card2 = selectedCards[1];
        moveCount++;
        movesDisplay.textContent = `Moves: ${moveCount}`;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedCards.push(card1, card2);
        } else {
            card1.firstChild.src = "back.png";
            card2.firstChild.src = "back.png";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        selectedCards = [];

        if (matchedCards.length === shuffledCards.length) {
            clearInterval(timer); 
            setTimeout(() => {
                gameOverPopup.style.display = "block"; 
            }, 500);
        }
    }

    
    function restartGame() {
     
        shuffledCards = [];
        selectedCards = [];
        matchedCards = [];
        moveCount = 0;
        timeElapsed = 0;
        movesDisplay.textContent = "Moves: 0";
        timerDisplay.textContent = "0:00";
        gameOverPopup.style.display = "none";

   
        shuffleCards();
        createBoard();

       
        clearInterval(timer);
        timer = null;
        timeElapsed = 0;
    }

 
    restartButton.addEventListener("click", restartGame);

    
    createBoard();
});
