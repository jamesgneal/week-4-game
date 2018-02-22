$(document).ready(function () {

    // Character objects 
    var obiWan = {
        name: "obiWan",
        healthPoints: 120,
        attackPoints: 6,
        countPoints: 30,
        isHero: false,
        cardId: "#obiwan-card",
    };
    var maceWindu = {
        name: "maceWindu",
        healthPoints: 120,
        attackPoints: 14,
        countPoints: 6,
        isHero: false,
        cardId: "#mace-card",
    };
    var darthVader = {
        name: "darthVader",
        healthPoints: 180,
        attackPoints: 2,
        countPoints: 20,
        isHero: false,
        cardId: "#vader-card",
    };
    var bobaFett = {
        name: "bobaFett",
        healthPoints: 150,
        attackPoints: 5,
        countPoints: 16,
        isHero: false,
        cardId: "#boba-card",
    };

    // Character array for looping
    var characters = [obiWan, maceWindu, darthVader, bobaFett];

    // Booleans to change phase of the game
    var heroChosen = false;
    var inBattle = false;

    // Gameplay variables
    var heroHealth = 0;
    var heroAttack = 0;
    var attackAdder = 0;
    var oppHealth = 0;
    var oppCounter = 0;
    var opponentsRemaining = (characters.length - 1);

    // set the correct gameboard visibilities for the start of the game
    var gameStart = function () {
        $("#reset-button").hide();
        $("#attack-button").show();
        $(".active-game").hide();
        $(".pre-game").show();
    };

    // Shared gameboard functions
    var healthClassMaker = function (alignment) {
        characterSelection = "#" + characters[i].name + "Health";
        $(characterSelection).addClass(alignment + "HealthDisplay");
    }
    var redundantAreaClass = function () {
        $(characters[i].cardId).removeClass("col-xs-3");
    }
    var titleColorChanger = function (alignment) {
        var titleSelector = "#" + characters[i].name + "Info";
        $(titleSelector).addClass(alignment);
    }

    // Function to call after hero is picked - shuffles the characters array to randomize the "available enemies" layout. This prevents user from memorizing successful click-orders 
    function shuffle() {
        var j, x, i;
        for (i = characters.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = characters[i];
            characters[i] = characters[j];
            characters[j] = x;
        }
    }

    gameStart();

    // CARD CLICKS CONTROLS BEGIN ==============================================================
    $(".character").click(function () {

        // Get the value of the clicked character...
        var $this = this;
        var clicked = $($this).attr("value");

        // CHOOSE HERO BEGIN ============================================================================
        if (heroChosen === false) {
            // ...and find the corresponding object, change their isHero boolean, and pass point values to heroHealth, heroAttack, and attackAdder
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name === clicked) {
                    characters[i].isHero = true;
                    heroHealth = characters[i].healthPoints;
                    heroAttack = characters[i].attackPoints;
                    attackAdder = characters[i].attackPoints;
                }
            }
            // Change the visibilities of the gameboard
            $(".pre-game").hide();
            $(".active-game").show();

            // shuffle the deck so the layout of the "enemies available" area is random each game
            shuffle();

            // Move your selection to the player's "Your Hero" div and add the hero health class to the HP , the others to the "Enemies" div,
            for (i = 0; i < characters.length; i++) {
                if (characters[i].isHero === true) {
                    $(characters[i].cardId).appendTo("#user-character");

                    // remove the now redundant bootstrap class
                    redundantAreaClass();

                    // add hero health class to HP
                    healthClassMaker("hero");

                    // add the hero class to the child title div
                    var titleColorChanger = "#" + characters[i].name + "Info"
                    $(titleColorChanger).addClass("hero");
                    // titleColorChanger("hero");

                    // ...change the message area
                    $("#attack-message").html("<p>Select an enemy character card to battle</p>");

                }
                // select the unclicked cards
                if (characters[i].isHero !== true) {

                    // move them to the enemies div
                    $(characters[i].cardId).appendTo("#enemies");

                    // move the enemies class to the child title divs
                    var titleColorChanger = "#" + characters[i].name + "Info"
                    $(titleColorChanger).addClass("enemies");
                    // titleColorChanger("enemies");
                }
            }

            // Set boolean to reflect that a hero has been chosen
            heroChosen = true;

        } // CHOOSE HERO END ============================================================================

        // CHOOSE OPPONENT BEGIN ==============================================================
        if (heroChosen === true && inBattle === false) {
            // ...find the corresponding object...
            for (i = 0; i < characters.length; i++) {
                // ...ensure the clicked character isn't already the hero...
                if (characters[i].name === clicked && characters[i].isHero === false) {
                    // ...move the card to the Opponent area...
                    $(characters[i].cardId).appendTo("#chosen-opponent");
                    // remove the now redundant bootstrap class
                    redundantAreaClass();
                    // add the opponent class and remove the enemies class to the child title divs
                    var titleColorChanger = "#" + characters[i].name + "Info"
                    $(titleColorChanger).addClass("opponent");
                    $(titleColorChanger).removeClass("enemies");

                    // add the health class to their HP display
                    healthClassMaker("opp");

                    // ...pass point values to oppHealth and oppCounter
                    oppHealth = characters[i].healthPoints;
                    oppCounter = characters[i].countPoints;
                    // ...change the phase of the game
                    inBattle = true;
                    // ...change the message area
                    $("#attack-message").html("<p>Press attack</p>");
                }
            }
        } // CHOOSE OPPONENT END ==============================================================
    }); // CARD CLICKS END ==============================================================

    // ATTACK CLICKS BEGIN ==============================================================
    $("#attack-button").click(function () {
        // make sure we're in the correct phase of the game
        if (inBattle === true) {
            // get hero's attack points
            // display points in attack window
            $("#attack-message").html("<p>Your attack did <span class=\"damage\">" + heroAttack + "</span> damage!</p>");
            // subtract them from opponent's health points
            oppHealth = oppHealth - heroAttack;
            $(".oppHealthDisplay").text(oppHealth);
            // update hero's attack
            heroAttack = heroAttack + attackAdder;

            // if opponent's health points less than or equal to 0 after attack
            if (oppHealth <= 0) {
                // delete the card
                $("#chosen-opponent").empty();
                // set inBattle to false
                inBattle = false;
                // reduce available opponents
                opponentsRemaining--;
                // end game if no more opponents
                if (opponentsRemaining === 0) {
                    $("#attack-message").append(" You win! You have defeated all of your opponents");
                    // change attack button to reset button to reload the page
                    $("#attack-button").hide();
                    $("#reset-button").show();
                    // remove enemies card area
                    $("#enemies-bar").hide();
                } else {
                    $("#attack-message").append(" You win! Choose another opponent.");
                }
            }
            // if opponent's health points more than 0 after attack
            if (oppHealth > 0) {
                // subtract opponent's counter points from opponents health points
                heroHealth = heroHealth - oppCounter;
                $("#attack-message").append("<p>Opponent countered with <span class=\"counter-damage\">" + oppCounter + "</span>!");
                $(".heroHealthDisplay").text(heroHealth);
            }
            // if hero's health points less than zero after attack
            if (heroHealth <= 0) {
                // display that you lost
                $("#attack-message").append(" You lose!");
                // change attack button to reset button to reload the page
                $("#attack-button").hide();
                $("#reset-button").show();
                // delete the card
                $("#user-character").empty();
            }
        }
    }); // ATTACK CLICKS END ==============================================================

    // RESET CLICKS BEGIN ==============================================================
    $("#reset-button").click(function () {
        window.location.reload(true);
    }); // RESET CLICKS END ==============================================================
});