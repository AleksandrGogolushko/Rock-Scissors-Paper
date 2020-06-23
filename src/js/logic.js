const game = {
    rules: {
        simple: {
            // element contain another element ,which he can defeat
            rock: "scissors",
            paper: "rock",
            scissors: "paper",
        },

        bonus: {
            // element contain another element ,which he can defeat
            rock: ["scissors", "lizard"],
            paper: ["rock", "spock"],
            scissors: ["paper", "lizard"],
            lizard: ["spock", "paper"],
            spock: ["rock", "scissors"],
        },

        // depending on the chosen rules, 
        // the enemy is given the appropriate weapon
        enemySimple: {
            //simple rule == simple weapon
            SimpleOptions: ["rock", "paper", "scissors"],
        },
        enemyBonus: {
            //bonus rule == bonus weapon
            BonusOptions: ["rock", "paper", "scissors", "lizard", "spock"],
        },
        difficulty: {
            easy: 0.8,
            medium: 0.65,
            hard: 0.5
        }
    }
};

//create 2 elements to store data
// for gamer total game,name and another information
let gamer;
// for game which contain : rule,enemy weapon , dificultis
let newGame;

// this is constructor for create Game
function CreateGame(rules, enemy, difficulties) {
    this.rules = game.rules[rules];
    this.enemy = enemy;
    this.difficulties = difficulties;
}

// this is constructor for create Player
function CreatePlayer(name) {
    this.name = name;
    this.totalGame = 0;
    this.win = 0;
    this.losing = 0;
    this.draw = 0;
    this.choice = undefined;
}

function makeGameData() {
    let data = getUserSettings()
    starGame(data);
    necessaryWeapon()
    showStatistics()
}

function getUserSettings() {
    let $data = $("#select").serializeArray();
    let gameSetings = {};
    $data.forEach((e) => {
        gameSetings[e.name] = e.value;
    });
    gameSetings.enemy = gameSetings.rules == "simple"
        ? game.rules.enemySimple
        : game.rules.enemyBonus;
    return gameSetings
}

function starGame(data) {
    gamer = new CreatePlayer(data.name);
    newGame = new CreateGame(data.rules, data.enemy, data.difficultis);
}

//this function which processes player choice
function playerChoice(weapon) {
    gamer.choice = weapon;
}

// this function create random namber and counts whic weapon enemy choice
function enemyChoiceAndStartBattle() {
    let choiceE = Math.random();
    prepareForBattle(choiceE)
}

function prepareForBattle(choiceE) {
    switch (newGame.difficulties) {
        case "easy":
            battleCalculation(choiceE, game.rules.difficulty.easy);
            break;
        case "medium":
            battleCalculation(choiceE, game.rules.difficulty.medium);
            break;
        default:
            battleCalculation(choiceE, game.rules.difficulty.hard)
    }
    showStatistics()
}


/// this function get random number and percent win ,
// and count win you or lose
function battleCalculation(random, percent) {
    if (random < 0.2) {
        gamer.draw++
        newGame.enemy.choice = gamer.choice
    } else if (random < percent) {
        gamer.win++
        gamer.totalGame++
        /// we win
        if (Object.keys(newGame.rules).length != 5) {
            /// for simple rules
            newGame.enemy.choice = newGame.rules[`${gamer.choice}`]
        } else {
            /// for bonus rules
            newGame.enemy.choice = newGame.rules[`${gamer.choice}`][Math.floor(Math.random() * newGame.rules[`${gamer.choice}`].length)]
        }
    } else {
        gamer.losing++
        gamer.totalGame++
        /// we lose
        if (Object.keys(newGame.rules).length != 5) {
            /// for simple rules
            newGame.enemy.choice = Object.keys(newGame.rules).filter(word => word != gamer.choice && newGame.rules[word] == gamer.choice);
        } else {
            /// for bonus rules
            newGame.enemy.choice = (Object.keys(newGame.rules).filter(word => newGame.rules[word].some((e) => e == gamer.choice)))[Math.floor(Math.random() * 2)]
        }
    }
    animateFight()
    showResult(random, percent)
}
