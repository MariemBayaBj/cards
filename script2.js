// Wait until the DOM content is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Initial array of card images (some duplicates for the memory game)
    const cardsArray = ["1.jpg", "2.jpg", "3.jpg", "8.jpg", "5.jpg", "9.jpg", "1.jpg", "2.jpg", "3.jpg", "8.jpg", "5.jpg", "9.jpg"];
    // Variables for the game logic
    let shuffledCards = [], selectedCards = [], matchedCards = [], moveCount = 0, timer, timeElapsed = 0;
    let len = cardsArray.length;

    // Function to shuffle the cards randomly
    function shuffleCards() {
        let tempArray = [...cardsArray];  // Create a copy of the cards array
        shuffledCards = [];  // Reset the shuffled cards array

        // Shuffle the cards by randomly picking from the tempArray
        while (tempArray.length) {
            let i = Math.floor(Math.random() * tempArray.length);
            shuffledCards.push(tempArray.splice(i, 1)[0]);
        }
    }

    // Shuffle cards initially
    shuffleCards();

    // DOM elements for game display and interaction
    const gameBoard = document.getElementById("game-board");
    const movesDisplay = document.getElementById("moves");
    const timerDisplay = document.getElementById("timer");
    const gameOverPopup = document.getElementById("game-over");
    const restartButton = document.getElementById("restart");

    // Function to create the game board with shuffled cards
    function createBoard() {
        gameBoard.innerHTML = "";  // Clear existing board

        // Loop through shuffled cards and create HTML elements for each card
        shuffledCards.forEach((card, index) => {
            let cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.dataset.symbol = card;  // Store the card's symbol
            cardElement.dataset.index = index;  // Store the card's index

            // Create the image element for the card's back side
            let img = document.createElement("img");
            img.src = "back.png";  // The image for the back of the card
            img.className = "card-image";
            cardElement.appendChild(img);

            // Add event listener to flip the card on click
            cardElement.addEventListener("click", flipCard);
            gameBoard.appendChild(cardElement);  // Add the card element to the board
        });
    }

    // Function to start the timer once the first card is flipped
    function startTimer() {
        if (!timer) {
            timer = setInterval(() => {
                timeElapsed++;  // Increment the timer every second
                timerDisplay.textContent = formatTime(timeElapsed);  // Update the timer display
            }, 1000);
        }
    }

    // Function to format time in a MM:SS format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
    }

    // Function to handle the flipping of a card
    function flipCard() {
        // Prevent more than 2 cards from being flipped at the same time
        if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
            this.firstChild.src = this.dataset.symbol;  // Show the card's symbol
            this.classList.add("flipped");  // Mark the card as flipped
            selectedCards.push(this);  // Add the flipped card to selectedCards array

            // Start the timer when the first card is flipped
            if (selectedCards.length === 1) {
                startTimer();
            }
        }

        // If two cards are flipped, check for a match after a short delay
        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 600);
        }
    }

    // Function to check if the two selected cards match
    function checkMatch() {
        let card1 = selectedCards[0], card2 = selectedCards[1];
        moveCount++;  // Increment the move count
        movesDisplay.textContent = `Moves: ${moveCount}`;  // Update the move count display

        // If the cards match, keep them face-up
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedCards.push(card1, card2);  // Add the matched cards to matchedCards array
        } else {
            // If they don't match, flip them back after a short delay
            card1.firstChild.src = "back.png";
            card2.firstChild.src = "back.png";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        // Reset selected cards for the next selection
        selectedCards = [];

        // Check if all cards are matched and end the game if true
        if (matchedCards.length === shuffledCards.length) {
            clearInterval(timer);  // Stop the timer
            setTimeout(() => {
                // Show the game over popup
                gameOverPopup.style.display = "block";  
                // Show an alert when the game is won
                alert(`Congratulations! You've won the game in ${moveCount} moves and ${formatTime(timeElapsed)}!`);
            }, 500);
        }
    }

    // Function to restart the game
    function restartGame() {
        // Reset all variables to their initial state
        shuffledCards = [];
        selectedCards = [];
        matchedCards = [];
        moveCount = 0;
        timeElapsed = 0;
        movesDisplay.textContent = "Moves: 0";  // Reset the moves display
        timerDisplay.textContent = "0:00";  // Reset the timer display
        gameOverPopup.style.display = "none";  // Hide the game over popup

        // Shuffle the cards and recreate the board
        shuffleCards();
        createBoard();

        // Clear the timer and reset it
        clearInterval(timer);
        timer = null;
        timeElapsed = 0;
    }

    // Add event listener to the restart button to restart the game
    restartButton.addEventListener("click", restartGame);

    // Create the initial game board
    createBoard();
});
