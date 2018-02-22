# Star Wars RPG
### Homework assignment 4 - create a mini RPG game utilizing jQuery
##### Gameplay Overview
Star Wars RPG is a four-card role playing game, where each card represents a playable character. The user first selects a card to be their **hero**. The selected card is moved to the hero's position on the gameboard, while the others are moved to the enemies position. The user then selects an **enemy** from the remaining cards to be their **opponent**. This card is moved to the opponent position. The user is now ready to begin the attack play.
Each character card has three number attributes that pertain to the attack play:
1. Health Points (HP) - The character's ability to defend. Only number continuously visible to the user. Can only decrease.
1. Attack Points (AP) - The character's ability to attack. Only number that can increase.
1. Counterattack Points (CP) - The character's ability to counterattack. It never changes.
When the user **attacks**, the opponent's HP are decreased by the number of the hero's AP. The hero's AP are then increased by the original base amount. *Example: After the hero attacks with 10 AP, they increase to 20. After the next attack, they increase to 30*.
The opponent then **counterattacks**, and the hero's HP is reduced by the number of the opponent's CP. This process continues until either the hero or opponent is defeated (their HP are reduced to zero or lower). If the hero is defeated, the user loses and the game ends. If the opponent is defeated, the user chooses a new opponent from the remaining enemies. The hero's HP and AP remain at their current value, therefore, the hero's attack is stronger, but their defenses have lowered. The user wins when all enemies have been defeated.
##### Skills Used
1. HTML/CSS
1. Bootstrap 4
1. JavaScript
1. jQuey
1. Photoshop
