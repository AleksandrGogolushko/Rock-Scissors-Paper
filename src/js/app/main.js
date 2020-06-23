$("#rock").hover(() => {
    showElement(".rock", "#rock", "green")
}, () => {
    removeElement(".rock", "#rock")
})
$("#paper").hover(() => {
    showElement(".paper", "#paper", "gold")
}, () => {
    removeElement(".paper", "#paper")
})
$("#scissors").hover(() => {
    showElement(".scissors", "#scissors", "royalblue")
}, () => {
    removeElement(".scissors", "#scissors")
})

$(".btn").click(() => {
    showElement(".rock", "#rock", "green");
    showElement(".paper", "#paper", "gold");
    showElement(".scissors", "#scissors", "royalblue");
    $("h1").css("color", "#FF69B4")
    $("main").show()
    setTimeout(() => {
        $(".line").show()
        $(".line").animate({ height: "300vh" }, 300)
        $("header").animate({ top: "-100vh" }, 300, () => {
            $("main").add("section").css("top", "-100vh")
        })
    }, 400)
    setTimeout(() => {
        $(".line").hide()
        $(".settings").css("transform", "translate(-50%,-50%)")
    }, 1450)
})


$(".confirm-name").click((e) => {
    e.preventDefault()
    if ($.trim($("#name").val()) == "") {
        $("#name").css("left", "54%")
        setTimeout(() => {
            $("#name").css("left", "46%")
        }, 300)
        setTimeout(() => {
            $("#name").css("left", "50%")
        }, 600)

        $(".welcom").attr("data-check", "false")
        checkForm()
    } else {
        showChoice(`Welcome to the game ${$("#name").val()}!`, ".welcom")
        checkForm()
    }
})

$(".welcom").click(() => {
    hideChoice(".welcom")
    checkForm()
})

$(".simple").click((e) => {
    e.preventDefault()
    showOptionsRule("move-form-up", "move-form-down", ".simple-rules", ".icon-left", "show-simple-rule", "show-simpl-icon", ".bonus-rules", ".icon-right", "show-bonus-rule", "show-bonus-icon")
})



$(".bonus").click((e) => {
    e.preventDefault()
    showOptionsRule("move-form-down", "move-form-up", ".bonus-rules", ".icon-right", "show-bonus-rule", "show-bonus-icon", ".simple-rules", ".icon-left", "show-simple-rule", "show-simpl-icon")
})


$(".simple-btn").click((e) => {
    e.preventDefault();
    selectRuleAndHideOption("simple", ".bonus-rules", "show-bonus-rule", ".bonus")
    showChoice("You choose simple rules", ".choose-rule")
    checkForm()
})

$(".bonus-btn").click((e) => {
    e.preventDefault();
    selectRuleAndHideOption("bonus", ".simple-rules", "show-simple-rule", ".simple")
    showChoice("You choose bonus rules", ".choose-rule")
    checkForm()
})

$(".choose-rule").click(() => {
    hideChoice(".choose-rule", ".rules .choose", ".simple ,.bonus ")
    checkForm()
})


$(".easy").click((e) => {
    e.preventDefault();
    $("#easy").prop("checked", true)
    showChoice("You choose easy difficultis", ".choose-difficultis")
    checkForm()
})

$(".medium").click((e) => {
    e.preventDefault();
    $("#medium").prop("checked", true)
    showChoice("You choose medium difficultis", ".choose-difficultis")
    checkForm()
})

$(".hard").click((e) => {
    e.preventDefault();
    $("#hard").prop("checked", true)
    showChoice("You choose hard difficultis", ".choose-difficultis")
    checkForm()
})

$(".choose-difficultis").click(() => {
    hideChoice(".choose-difficultis", ".difficultis .choose", ".easy, .medium, .hard")
    checkForm()
})

$("#ok").click(function (e) {
    e.preventDefault();
    makeGameData()
    $(".settings").css("transform", "translate(-50%, -300%)");
    $("section").show()
    setTimeout(() => {
        $("section").css("transform", "translateY(-100vh)")
    }, 800)
    showRuleDificultAndName()
    showSelectRule()
});

if (("ontouchstart" in window) == false || window.DocumentTouch && document instanceof DocumentTouch == false) {
    $(".show-rules").hover(() => {
        if ($(".show-rules").attr("data-open") == "false") {
            $(".show-rules").addClass("hover")
        }
    }, () => {
        if ($(".show-rules").attr("data-open") == "false") {
            $(".show-rules").removeClass("hover")
        }
    })
}

$(".show-rules h2").click(() => {
    $(".show-rules").removeClass("hover")
    if ($(".show-rules").attr("data-open") == "false") {
        $(".show-rules").addClass("show")
        $(".show-rules").attr("data-open", true)
    } else {
        $(".show-rules").removeClass("show")
        $(".show-rules").attr("data-open", false)
    }
})

$("img", ".weapon-player").hover((e) => {
    $(`img[alt=${e.target.alt}]`, ".weapon-player").attr("src", `./src/image/${e.target.alt}Color.svg`)
}, (e) => {
    if (($(`img[alt=${e.target.alt}]`, ".weapon-player").hasClass("select")) == false) {
        $(`img[alt=${e.target.alt}]`, ".weapon-player").attr("src", `./src/image/${e.target.alt}.svg`)
    }
})

$("img", ".weapon-player").click((e) => {
    $(".show-rules").removeClass("show")
    $(".show-rules").attr("data-open", false)
    if (($("img", ".weapon-player").filter(".select")).length == 0) {
        $(`img[alt=${e.target.alt}]`, ".weapon-player").addClass("select")
        $(`img[alt=${e.target.alt}]`, ".weapon-player").attr("src", `./src/image/${e.target.alt}Color.svg`)
        playerChoice(e.target.alt);
        $(`img[alt=${e.target.alt}]`, ".player-select").addClass("fight")
        enemyChoiceAndStartBattle()
    }
})

$("#no").click((e) => {
    e.preventDefault;
    $(".show-rules").removeClass("show")
})

$("#yes").click((e) => {
    e.preventDefault;
    $(".show-rules").attr("data-open", false)
    $(".show-rules").removeClass("show")
    $(".choose-rule").triggerHandler("click")
    $(".choose-difficultis").triggerHandler("click")
    setTimeout(() => {
        $(".left-section").css("width", `50vw`)
        $(".right-section").css("width", `50vw`)
    }, 1500)
    $(".welcom").add(".choose-rule,choose-difficultis").triggerHandler("click")
    showStatistics()
    setTimeout(() => {
        $("section").css("transform", "translateY(100vh)");
    }, 500)
    setTimeout(() => {
        $(".settings").css("transform", "translate(-50%, -50%)")
    }, 1200)
})


$("input[type='text']").focusin(() => {
    size(viewport)
})
$("input[type='text']").focusout(() => {
    setTimeout(()=>{
    viewport.setAttribute("content", "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0");
    },200)
})

function showElement(imgSelector, textSelector, color) {
    $(imgSelector).addClass("show")
    $(textSelector).css("color", color)
}
function removeElement(imgSelector, textSelector) {
    $(imgSelector).removeClass("show")
    $(textSelector).css("color", "#fff")
}

function showOptionsRule(opositPositionForm, addedClassForm, ruleSelector, iconSelector, classRuls, classIcon, removeRuleSelector, removeIconSelector, removeClassRule, removeClassIcon) {
    if ($("#select").hasClass(opositPositionForm)) {
        $(removeIconSelector).removeClass(removeClassIcon)
        setTimeout(() => {
            $("#select").removeClass(opositPositionForm)
            $(removeRuleSelector).add(removeIconSelector).removeClass(removeClassRule)
        }, 220)
    }
    if ($("#select").hasClass(addedClassForm)) {
        $(iconSelector).removeClass(classIcon)
        setTimeout(() => {
            $("#select").removeClass(addedClassForm)
            $(ruleSelector).add(iconSelector).removeClass(classRuls)
        }, 220)
    } else {
        $("#select").addClass(addedClassForm)
        $(ruleSelector).add(iconSelector).show()
        setTimeout(() => {
            $(ruleSelector).addClass(classRuls)
        }, 5)
        setTimeout(() => {
            $(iconSelector).addClass(classRuls)
        }, 100)
        setTimeout(() => { $(iconSelector).addClass(classIcon) }, 250)
    }
}

function selectRuleAndHideOption(selector, rule, checkClass, handlerSelector) {
    $(`#${selector}`).prop("checked", true)
    $(`.${selector}`).triggerHandler("click")
    if ($(rule).hasClass(checkClass)) {
        $(handlerSelector).triggerHandler("click")
    }
}

function hideChoice(selector, firstElements, secondElements) {
    if (selector == ".welcom") {
        $(selector).css("top", "-20%")
        $(".confirm-name").css("top", "75%")
        $("#name").css("top", "50%")
        $(".you").css("top", "15%")
        $(selector).attr("data-check", "false")
    }
    $(selector).css("top", "-20%")
    $(firstElements).add(secondElements).css("top", "0")
    $(selector).attr("data-check", "false")
}

function showChoice(text, selector) {
    $(selector).text(text)
    $(selector).css({ top: "50%" })
    $(selector).attr("data-check", "true")
    if (selector == ".choose-difficultis") {
        $(".difficultis .choose").add(".easy, .medium, .hard").css("top", "40vh")
    }
    if (selector == ".choose-rule") {
        $(".rules .choose").add(".simple").add(".bonus").css("top", "40vh")
    }
    if (selector == ".welcom") {
        $("#name").add(".you, .confirm-name").css("top", "115%")
    }
}

function checkForm() {
    if ($("*[data-check='false']").length > 0) {
        $(".go").css("top", "-18vw")
    } else {
        $(".go").css("top", "0")
    }
}


function animateFight() {
    $(`img[alt='${newGame.enemy.choice}']`, ".weapon-enemy").attr("src", `./src/image/${newGame.enemy.choice}Color.svg`)
    $(`img[alt='${newGame.enemy.choice}']`, ".weapon-enemy").addClass("select");
    $(`img[alt='${newGame.enemy.choice}']`, ".enemy-select").addClass("fight");
    setTimeout(() => { $(".result-wraper").css("top", "0") }, 1000);
    setTimeout(() => {
        $(".result-wraper").css("top", "-40%");
        $(`img[alt='${newGame.enemy.choice}']`, ".weapon-enemy").removeClass("select");
        $(`img[alt='${newGame.enemy.choice}']`, ".enemy-select").removeClass("fight");
        $(`img[alt='${gamer.choice}']`, ".weapon-player").removeClass("select");
        $(`img[alt='${gamer.choice}']`, ".player-select").removeClass("fight");
        $(`img[alt='${newGame.enemy.choice}']`, ".weapon-enemy").attr("src", `./src/image/${newGame.enemy.choice}.svg`)
        $(`img[alt='${gamer.choice}']`, ".weapon-player").attr("src", `./src/image/${gamer.choice}.svg`)
        setTimeout(winSelebrati(), 2000)
    }, 2000)
}

function winSelebrati() {
    if (gamer.win != 0 || gamer.losing != 0) {
        $(".left-section").css("width", `${(gamer.win / gamer.totalGame) * 100}vw`)
        $(".right-section").css("width", `${(gamer.losing / gamer.totalGame) * 100}vw`)
    } else {
        $(".left-section").css("width", `50vw`)
        $(".right-section").css("width", `50vw`)
    }
}

function showResult(random, percent) {
    if (random < 0.2) {
        $(".result").text("Draw")
    } else if (random < percent) {
        $(".result").text("You win")
    } else {
        $(".result").text("You lose")
    }
}

function showStatistics() {
    if (gamer.totalGame != 0) {
        setTimeout(() => {
            $(".win").text(gamer.win)
            $(".lose").text(gamer.losing)
        }, 2200)
    } else if (gamer.totalGame == 0 && gamer.darw > 0) {
        setTimeout(() => {
            $(".win").text(gamer.win)
            $(".lose").text(gamer.losing)
        }, 2200)
    } else {
        $(".win").text("W")
        $(".lose").text("L")
    }

}

function showRuleDificultAndName() {
    let versionRule;
    if (Object.keys(newGame.rules).length == 5) {
        versionRule = "bonus rules: rock,paper,scissors,spock,lizzard"
    } else {
        versionRule = "simple rules: rock,paper,scissors"
    }
    $(".player").text(`Player:${gamer.name} `);
    $(".stat-dificlt").text(`Select dificult: ${newGame.difficulties}`);
    $(".stat-rules").text(versionRule)

}


function showSelectRule() {
    if (Object.keys(newGame.rules).length == 5) {
        $(".select-simple").hide()
        $(".select-bonus").show()
    } else {
        $(".select-simple").show()
        $(".select-bonus").hide()
    }
}

function necessaryWeapon() {
    if (Object.keys(newGame.rules).length == 5) {
        $(".weapon img[alt='spock']").add(".weapon img[alt='lizard']").show()
    } else {
        $(".weapon img[alt='spock']").add(".weapon img[alt='lizard']").hide()
    }
}


let viewport = document.querySelector("meta[name=viewport]");

function size(v) {
    let vh = $(window).height();
    let vw = $(window).width();
    v.setAttribute("content", "height=" + vh + "px, width=" + vw + "px, initial-scale=1.0, user-scalable=no, maximum-scale=1.0");
 }
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
