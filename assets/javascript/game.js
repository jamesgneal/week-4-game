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
        attackPoints: 25,
        countPoints: 6,
        isHero: false,
        isOpponent: false,
        cardId: "#mace-card",
    };
    var darthVader = {
        name: "darthVader",
        healthPoints: 180,
        attackPoints: 5,
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
    var oppHealth = 0;
    var oppCounter = 0;

    // CARD CLICKS BEGIN ==============================================================
    $(".character").click(function () {
        var $this = this;
        // CHOOSE HERO BEGIN ============================================================================
        if (heroChosen === false) {
            // Get the value of the clicked character...
            var changeHero = $($this).attr("value");
            // ...and find the corresponding object, change their isHero boolean, and pass point values to heroHealth and heroAttack
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name === changeHero) {
                    characters[i].isHero = true;
                    heroHealth = characters[i].healthPoints;
                    heroAttack = characters[i].attackPoints;
                }
            }
            // Move your selection to the player's "Your Character" div, the others to the "Enemies" div
            for (i = 0; i < characters.length; i++) {
                if (characters[i].isHero === true) {
                    $(characters[i].cardId).appendTo("#user-character");

                }
                if (characters[i].isHero !== true) {
                    $(characters[i].cardId).appendTo("#enemies");

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
                    // ...pass point values to oppHealth and oppCounter
                    oppHealth = characters[i].healthPoints;
                    oppCounter = characters[i].countPoints;
                    // ...change the phase of the game
                    inBattle = true;
                }
            }
        } // CHOOSE OPPONENT END ==============================================================
    }); // CARD CLICKS END ==============================================================

    // ATTACK CLICKS BEGIN ==============================================================
    $("#attack-button").click(function () {

    }); // ATTACK CLICKS END ==============================================================
});