var playerImages = ``,
    computerImages = ``
computerCardFace = ``
doubleDown1 = ``,
    doubleDown2 = ``;
var playerTotal = 0,
    leftTotal = 0,
    rightTotal = 0,
    computerTotal = 0,
    aceCount = 0,
    acesSeen = 0,
    random = 0,
    win = 0,
    lose = 0;
var winCondition = false,
    leftCondition = false,
    rightCondition = false;;
var cards = [
    "2C",
    "2D",
    "2H",
    "2S",
    "3C",
    "3D",
    "3H",
    "3S",
    "4C",
    "4D",
    "4H",
    "4S",
    "5C",
    "5D",
    "5H",
    "5S",
    "6C",
    "6D",
    "6H",
    "6S",
    "7C",
    "7D",
    "7H",
    "7S",
    "8C",
    "8D",
    "8H",
    "8S",
    "9C",
    "9D",
    "9H",
    "9S",
    "10C",
    "10D",
    "10H",
    "10S",
    "AC",
    "AD",
    "AH",
    "AS",
    "JC",
    "JD",
    "JH",
    "JS",
    "KC",
    "KD",
    "KH",
    "KS",
    "QC",
    "QD",
    "QH",
    "QS"
]
var values = [
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    8,
    8,
    8,
    8,
    9,
    9,
    9,
    9,
    10,
    10,
    10,
    10,
    11,
    11,
    11,
    11,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10
]

function CreateHands() {
    //Empty both divs
    $('.playerImagePlace').empty()
    $('.computerImagePlace').empty()
    $('.buttons').empty();
    $('.buttons').append(`
    <button type="button" class="btn mb-2 mt-5" onclick="AddCards()">Hit</button>
    <br />
    <button type="button" class="btn mb-2" onclick="Computer()">Stay</button>
    <br />
    <button type="button" class="btn mb-2" onclick="CreateHands()">New Game</button>
    <br />
    `);

    //Create default values to be used on every initialization
    cards = [
        "2C",
        "2D",
        "2H",
        "2S",
        "3C",
        "3D",
        "3H",
        "3S",
        "4C",
        "4D",
        "4H",
        "4S",
        "5C",
        "5D",
        "5H",
        "5S",
        "6C",
        "6D",
        "6H",
        "6S",
        "7C",
        "7D",
        "7H",
        "7S",
        "8C",
        "8D",
        "8H",
        "8S",
        "9C",
        "9D",
        "9H",
        "9S",
        "10C",
        "10D",
        "10H",
        "10S",
        "AC",
        "AD",
        "AH",
        "AS",
        "JC",
        "JD",
        "JH",
        "JS",
        "KC",
        "KD",
        "KH",
        "KS",
        "QC",
        "QD",
        "QH",
        "QS"
    ]
    values = [
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        6,
        7,
        7,
        7,
        7,
        8,
        8,
        8,
        8,
        9,
        9,
        9,
        9,
        10,
        10,
        10,
        10,
        11,
        11,
        11,
        11,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10
    ]
    playerImages = ``, computerImages = ``, computerCardFace = ``, doubleDown1 = ``, doubleDown2 = ``;
    playerTotal = 0, computerTotal = 0, aceCount = 0, acesSeen = 0, leftTotal = 0, rightTotal = 0;
    winCondition = false, leftCondition = false, rightCondition = false;

    for (var i = 0; i < 2; i++) { //User hand
        random = Math.floor(Math.random() * cards.length); //Get random number between 1 and cards length
        playerImages += `<img src="Images/${cards[random]}.png" class="img-fluid mt-2 mr-2" style="height: 180px; width: 140px;" />`; //Add image to card
        cards.splice(random, 1); //Remove card that was used
        playerTotal += values[random]; //Add value of card to player total
        values.splice(random, 1); //Remove value of card that was used

        random = Math.floor(Math.random() * cards.length); //Get random number between 1 and cards length
        computerImages += `<img src="Images/${cards[random]}.png" class="img-fluid mt-2 mr-2" style="height: 180px; width: 140px; max-width: 100%" />`; //Add image to card
        cards.splice(random, 1); //Remove card that was used
        computerTotal += values[random]; //Add value of card to player total
        values.splice(random, 1); //Remove value of card that was used
    }

    computerCardFace = computerImages.split('><')[0].substring(computerImages.split('><')[0].lastIndexOf("Images/") + 7, computerImages.split('><')[0].lastIndexOf(".png")); //Get the card face of the first card
    computerImages = computerImages.split('><')[0].replace(/Images.*png/, 'Images/Back.png') + "><" + computerImages.split('><')[1]; //Replace the first card with an image of the backside of a card

    $('.playerImagePlace').append(
        playerImages
    );

    $('.computerImagePlace').append(
        computerImages
    );

    CheckPlayer();

    $('.playerScore').text(
        `Your score is: ${playerTotal}`
    );

    if (playerTotal != 21) {
        $('.computerScore').text(
            `The computer's score is: Unknown`
        );
    } else { //Reveal card if player gets a blackjack
        computerImages = computerImages.split('><')[0].replace(/Images.*png/, `Images/${computerCardFace}.png`) + "><" + computerImages.split('><')[1];

        $('.computerImagePlace').empty();

        $('.computerImagePlace').append(
            computerImages
        );

        $('.computerScore').text(
            `The computer's score is: ${computerTotal}`
        );

        DisplayWins();
    }
}

function AddCards() { //Add more cards
    if (winCondition == false) {
        $('.buttons').empty();
        $('.buttons').append(`
      <button type="button" class="btn mb-2 mt-5" onclick="AddCards()">Hit</button>
      <br />
      <button type="button" class="btn mb-2" onclick="Computer()">Stay</button>
      <br />
      <button type="button" class="btn mb-2" onclick="CreateHands()">New Game</button>
      <br />
      `);

        random = Math.floor(Math.random() * cards.length);
        playerImages += `<img src="Images/${cards[random]}.png" class="img-fluid mt-2 mr-2" style="height: 180px; width: 140px;" />`
        cards.splice(random, 1);
        playerTotal += values[random];
        values.splice(random, 1);

        $('.playerImagePlace').empty();

        $('.playerImagePlace').append(
            playerImages
        );

        CheckPlayer()

        $('.playerScore').text(
            `Your score is: ${playerTotal}`
        );
    } else {
        alert("You cannot add more cards. Please re-fresh");
    }
}

function AddLeft() {
    if (winCondition == false) {
        if (leftCondition == false) {
            random = Math.floor(Math.random() * cards.length);
            doubleDown1 += ` <br /><img src="Images/${cards[random]}.png" class="img-fluid mt-2 mr-2" style="height: 180px; width: 140px;" />`;
            cards.splice(random, 1);
            leftTotal += values[random];
            values.splice(random, 1);

            $('.cardSet1').empty();
            $('.cardSet1').append(
                doubleDown1
            );

            CheckLeftCard()

            $('.cardScore1').text(
                `Left score is: ${leftTotal}`
            );
        } else {
            alert("You cannot add more cards to the left side.");
        }
    } else {
        alert("You cannot add more cards. Please re-fresh");
    }
}

function AddRight() {
    if (winCondition == false) {
        if (rightCondition == false) {
            random = Math.floor(Math.random() * cards.length);
            doubleDown2 += ` <br /><img src="Images/${cards[random]}.png" class="img-fluid mt-2 mr-2" style="height: 180px; width: 140px;" />`;
            cards.splice(random, 1);
            rightTotal += values[random];
            values.splice(random, 1);

            $('.cardSet2').empty();
            $('.cardSet2').append(
                doubleDown2
            );

            CheckRightCard()

            $('.cardScore2').text(
                `Right score is: ${rightTotal}`
            );
        } else {
            alert("You cannot add more cards to the right side.");
        }
    } else {
        alert("You cannot add more cards. Please re-fresh");
    }
}

function DoubleDown() {
    $('.playerImagePlace').empty();
    //Append the two divs and the base images
    $('.playerImagePlace').append(`
  <div class="cardSet1" style="box-sizing: border-box; display: inline-block; vertical-align: top;">${playerImages.split('><')[0] + ">"}</div>
  <div class="cardSet2" style="box-sizing: border-box; display: inline-block; vertical-align: top;">${"<" + playerImages.split('><')[1]}</div>
  `);

    playerImages = ""; //Empty images

    $('.buttons').empty();
    $('.buttons').append(`
    <button type="button" class="btn mb-2 mt-5" onclick="AddLeft()">Hit Left</button>
    <button type="button" class="btn mb-2" onclick="AddRight()">Hit Right</button>
    <br />
    <button type="button" class="btn mb-2" onclick="Computer()">Stay</button>
    <br />
    <button type="button" class="btn mb-2" onclick="CreateHands()">New Game</button>
    <br />
    `); //Append a Left and Right Hand Buttons
    $('.playerScore').empty();
    $('.playerScore').append(`
    <div class="cardScore1 mr-1" style="box-sizing: border-box; display: inline-block; margin-left: -6em;">Left score is: ${leftTotal}</div>
    <div class="cardScore2" style="box-sizing: border-box; display: inline-block;">Right score is: ${rightTotal}</div>
    `);
}

function Computer() {
    if (winCondition == false) {
        computerImages = computerImages.split('><')[0].replace(/Images.*png/, `Images/${computerCardFace}.png`) + "><" + computerImages.split('><')[1];

        CheckComputer();

        $('.computerImagePlace').empty()

        $('.computerImagePlace').append(
            computerImages
        );

        $('.computerScore').text(
            `The computer's score is: ${computerTotal}`
        );

        if (computerTotal < 22) {
            if (playerTotal > computerTotal) {
                alert("Your hand is higher and you have won.");
                win++;
                winCondition = true;
            } else if (playerTotal == computerTotal) {
                alert("You hand equals the computer's hand and you have lost the game.");
                lose++;
                winCondition = true;
            } else {
                alert("Your hand is lower and you have lost.");
                lose++;
                winCondition = true;
            }
        }

        DisplayWins();

    } else if (playerTotal == 21) {
        alert("You have blackjack and have won.");
    } else if (playerTotal > 21) {
        alert("You have busted and lost.");
    } else {
        alert("Your hand is lower and you have lost.");
    }
}

function DisplayWins() {
    $('.playerWin').text(
        `You have won ${win} times.`
    );

    $('.computerWin').text(
        `The computer has won ${lose} times.`
    );
}

function CheckLeftCard() {
    if (leftTotal > 21 && doubleDown1.includes('Images/A')) { //Convert ace value to 1 if the player busts, but has an ace in their deck
        aceCount = (doubleDown1.match(new RegExp("Images/A", "g")) || []).length; //Gets the amount of aces in the player's deck

        if (acesSeen != aceCount) { //Will subtract 10 from the score and increase the aces seen value
            acesSeen++;
            leftTotal -= 10;
            if (doubleDown1.split('><').length == 5) { //Checks for the off chance that the player wins with an ace as the fifth card
                win++;
                DisplayWins();
                alert("You have won by being dealt 5 cards and not busting.");
                winCondition = true;
            }
        } else {
            alert("The left side has busted.");
            leftCondition = true;
        }
    }
    else if (leftTotal > 21) {
        alert("The left side has busted.");
        leftCondition = true;
    }
    else if (doubleDown1.split('><').length == 5) { //Checks if the player has five cards in their deck
        win++;
        DisplayWins();
        alert("You have won by being dealt 5 cards and not busting.");
        winCondition = true;
    }

    if (winCondition == true && computerImages.split('><').length == 2) {
        DisplayComputerImage();
    }
}

function DisplayComputerImage() {
    if (winCondition == true && computerImages.split('><').length == 2) {
        computerImages = computerImages.split('><')[0].replace(/Images.*png/, `Images/${computerCardFace}.png`) + "><" + computerImages.split('><')[1];

        $('.computerImagePlace').empty()

        $('.computerImagePlace').append(
            computerImages
        );

        $('.computerScore').text(
            `The computer's score is: ${computerTotal}`
        );
    }
}


function CheckRightCard() {
    if (rightTotal > 21 && doubleDown2.includes('Images/A')) { //Convert ace value to 1 if the player busts, but has an ace in their deck
        aceCount = (doubleDown2.match(new RegExp("Images/A", "g")) || []).length; //Gets the amount of aces in the player's deck

        if (acesSeen != aceCount) { //Will subtract 10 from the score and increase the aces seen value
            acesSeen++;
            rightTotal -= 10;
            if (doubleDown2.split('><').length == 5) { //Checks for the off chance that the player wins with an ace as the fifth card
                win++;
                DisplayWins();
                alert("You have won by being dealt 5 cards and not busting.");
                winCondition = true;
            }
        } else {
            alert("The right side has busted.");
            rightCondition = true;
        }
    }
    else if (rightTotal > 21) {
        alert("The right side has bused.");
        rightCondition = true;
    }
    else if (doubleDown2.split('><').length == 5) { //Checks if the player has five cards in their deck
        win++;
        DisplayWins();
        alert("You have won by being dealt 5 cards and not busting.");
        winCondition = true;
    }

    if (winCondition == true && computerImages.split('><').length == 2) {
        DisplayComputerImage();
    }
}

function CheckPlayer() {
    if (playerTotal == 21 && playerImages.split('><').length == 2) { //If first two cards are an ace and a 10 value card, player wins
        win++;
        alert("You have been dealt a blackjack and have won.");
        winCondition = true;
    } else if (playerImages.split('><').length == 2) {
        if (playerImages.split('><')[0].includes("Images/10") && playerImages.split('><')[1].includes("Images/10")) { //If both cards are 10 value
            $('.buttons').append(`
        <button type="button" class="btn" onclick="DoubleDown()">Double Down</button>
        `); //Append a bouble down button

            leftTotal += 10;
            rightTotal += 10;
            //Push the two cards into their respective arrays
            doubleDown1 += `${playerImages.split('><')[0]}>`;
            doubleDown2 += `<${playerImages.split('><')[1]}`;
            playerImages = ""; //Empty images
        } else if (playerImages.split('><')[0].substring(10, 18) == playerImages.split('><')[1].substring(9, 17)) { //If cards are not 10 and they are also the same
            $('.buttons').append(`
        <button type="button" class="btn" onclick="DoubleDown()">Double Down</button>
        `); //Append a bouble down button

            //Determines if the left card has a Jack, Queen, King, or Ace
            if (/[JQKA]/.test(playerImages.split('><')[0].substring(17, 18))) {
                if (/[JQK]/.test(playerImages.split('><')[0].substring(17, 18))) {
                    leftTotal += 10;
                } else if (/A/.test(playerImages.split('><')[0].substring(17, 18))) {
                    leftTotal += 11;
                }
            } else {
                leftTotal += parseInt(playerImages.split('><')[0].substring(17, 18));
            }
            //Determines if the right card has a Jack, Queen, King, or Ace
            if (/[JQKA]/.test(playerImages.split('><')[1].substring(16, 17))) {
                if (/[JQK]/.test(playerImages.split('><')[1].substring(16, 17))) {
                    rightTotal += 10;
                } else if (/A/.test(playerImages.split('><')[1].substring(16, 17))) {
                    rightTotal += 11;
                }
            } else {
                rightTotal += parseInt(playerImages.split('><')[1].substring(16, 17));
            }
            //Push the two cards into their respective arrays
            doubleDown1 += `${playerImages.split('><')[0]}>`;
            doubleDown2 += `<${playerImages.split('><')[1]}`;
        }
    } else if (playerTotal > 21 && playerImages.includes('Images/A')) { //Convert ace value to 1 if the player busts, but has an ace in their deck
        aceCount = (playerImages.match(new RegExp("Images/A", "g")) || []).length; //Gets the amount of aces in the player's deck

        if (acesSeen != aceCount) { //Will subtract 10 from the score and increase the aces seen value
            acesSeen++;
            playerTotal -= 10;
            if (playerImages.split('><').length == 5) { //Checks for the off chance that the player wins with an ace as the fifth card
                win++;
                DisplayWins();
                alert("You have won by being dealt 5 cards and not busting.");
                winCondition = true;
            }
        } else {
            alert("You have busted and have lost the game.");
            lose++;
            DisplayWins();
            winCondition = true;
        }
    } else if (playerTotal > 21) { //Determines if player has busted
        lose++;
        DisplayWins();
        alert("You have busted and have lost the game.");
        winCondition = true;
    } else if (playerImages.split('><').length == 5) { //Checks if the player has five cards in their deck
        win++;
        DisplayWins();
        alert("You have won by being dealt 5 cards and not busting.");
        winCondition = true;
    }

    if (winCondition == true && computerImages.split('><').length == 2) {
        DisplayComputerImage();
    }
}

function CheckComputer() {
    while (computerTotal < 17) {
        random = Math.floor(Math.random() * cards.length);
        computerImages += `<img src="Images/${cards[random]}.png" class="img-fluid mt-2 mr-2" style="height: 180px; width: 140px; max-width: 100%" />`; //Add image to card
        cards.splice(random, 1); //Remove card that was used
        computerTotal += values[random]; //Add value of card to player total
        values.splice(random, 1); //Remove value of card that was used

        if (computerTotal > 21 && computerImages.includes('Images/A')) { //Convert ace value to 1 if the computer busts, but has an ace in their deck
            aceCount = (computerImages.match(new RegExp("Images/A", "g")) || []).length; //Gets the amount of aces in the computers's deck

            if (acesSeen != aceCount) { //Will subtract 10 from the score and increase the aces seen value
                acesSeen++;
                computerTotal -= 10;
            } else {
                win++;
                alert("The computer has busted and you have won.");
                winCondition = true;
                break;
            }
        } else if (computerTotal > 21) { //Determines if computer has busted
            win++;
            alert("The computer has busted and you have won.");
            winCondition = true;
            break;
        } else if (computerTotal >= 17) {
            break;
        }
    }
}
