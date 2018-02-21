$(document).ready(function () {

    // Character objects 
    var obiWan = {
        name: "obiWan",
        healthPoints: 120,
        attackPoints: 15,
        countPoints: 15,
        isHero: false,
        isOpponent: false,
        cardId: "#obiwan-card",
    };
    var maceWindu = {
        name: "maceWindu",
        healthPoints: 100,
        attackPoints: 12,
        countPoints: 6,
        isHero: false,
        isOpponent: false,
        cardId: "#mace-card",
    };
    var darthVader = {
        name: "darthVader",
        healthPoints: 180,
        attackPoints: 10,
        countPoints: 30,
        isHero: false,
        isOpponent: false,
        cardId: "#vader-card",
    };
    var bobaFett = {
        name: "bobaFett",
        healthPoints: 120,
        attackPoints: 3,
        countPoints: 9,
        isHero: false,
        isOpponent: false,
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

    // set the correct visibilities for the gameboard
    $("#reset-button").hide();
    $(".active-game").hide();
    $(".pre-game").show();

    // CARD CLICKS BEGIN ==============================================================
    $(".character").click(function () {
        var $this = this;
        // CHOOSE HERO BEGIN ============================================================================
        if (heroChosen === false) {
            // Get the value of the clicked character...
            var changeHero = $($this).attr("value");
            // ...and find the corresponding object, change their isHero boolean, and pass point values to heroHealth, heroAttack, and attackAdder
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name === changeHero) {
                    characters[i].isHero = true;
                    heroHealth = characters[i].healthPoints;
                    heroAttack = characters[i].attackPoints;
                    attackAdder = characters[i].attackPoints;
                }
            }
            // Change the visibilities of the gameboard
            $(".pre-game").hide();
            $(".active-game").show();

            // Move your selection to the player's "Your Character" div and add the hero health class to the HP , the others to the "Enemies" div,
            for (i = 0; i < characters.length; i++) {
                if (characters[i].isHero === true) {
                    $(characters[i].cardId).appendTo("#user-character");

                    // add the hero class to the child title div
                    var titleColorChanger = "#" + characters[i].name + "Info"
                    $(titleColorChanger).addClass("hero");



                    var healthClassMaker = "#" + characters[i].name + "Health";
                    $(healthClassMaker).addClass("heroHealthDisplay");

                }
                if (characters[i].isHero !== true) {
                    $(characters[i].cardId).appendTo("#enemies");
                    
                    // add the enemies class to the child title divs
                    var titleColorChanger = "#" + characters[i].name + "Info"
                    $(titleColorChanger).addClass("enemies");

                    // Fix the stack from appendTo
                    $(characters[i].cardId).attr("style", "display: inline-block;");
                }
            }

            // Set boolean to reflect that a hero has been chosen
            heroChosen = true;

        } // CHOOSE HERO END ============================================================================

        // CHOOSE OPPONENT BEGIN ==============================================================
        if (heroChosen === true && inBattle === false) {
            // Get the value of the clicked character...
            var changeEnemy = $($this).attr("value");
            // ...find the corresponding object...
            for (i = 0; i < characters.length; i++) {
                // ...ensure the clicked character isn't already the hero...
                if (characters[i].name === changeEnemy && characters[i].isHero === false) {
                    // ...change them to the Opponent...
                    characters[i].isOpponent = true;
                    // ...move the card to the Opponent area...
                    $(characters[i].cardId).appendTo("#chosen-opponent");
                    // add the opponent class and remove the enemies class to the child title divs
                    var titleColorChanger = "#" + characters[i].name + "Info"
                    $(titleColorChanger).addClass("opponent");
                    $(titleColorChanger).removeClass("enemies");

                    // add the health class to their HP display
                    var healthClassMaker = "#" + characters[i].name + "Health";
                    $(healthClassMaker).addClass("oppHealthDisplay");
                    console.log(healthClassMaker);
                    // ...pass point values to oppHealth and oppCounter
                    oppHealth = characters[i].healthPoints;
                    oppCounter = characters[i].countPoints;
                    // ...change the phase of the game
                    inBattle = true;
                    // ...clear the message area
                    $("#attack-message").empty();
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
            $("#attack-message").text("Your attack did " + heroAttack + " damage!");
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
                    $("#attack-message").append(" You win! Choose another opponent");
                }
            }
            // if opponent's health points more than 0 after attack
            if (oppHealth > 0) {
                // subtract opponent's counter points from opponents health points
                heroHealth = heroHealth - oppCounter;
                $("#attack-message").append(" Opponent countered with " + oppCounter + "!");
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