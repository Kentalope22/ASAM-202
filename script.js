const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const questionContainerElement = document.getElementById('question-container');
const answerButtonElement = document.getElementById('answer-buttons');
const questionElement = document.getElementById('question');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result-text');

let currentQuestionIndex = 1;

const planets = {
    "Never Left"     : 0,    // Sacrificed little to nothing
    "Perished on the Way"    : 0,    // Sacrificed not enough
    "Bitter Sweet"  : 0,    // Sacrificed enough but still left scars from the journey
    "Left with Nothing"   : 0,    // Sacrificed almost everything, left with nothing
};

const planetDescriptions = {
    "Never Left": "you fall asleep at in the camps and wake up realizing that you never left Vietnam. you were unable to make many of the tough choices that were integral to the survival of many immigrants. you are then sent away to re-education camps where death is likely.",
    "Perished on the Way": "you make it much of the journey only to perish on the way. whether that be by pirates, drowning, starvation or something else, your decisions were wreckless and still unable to give up enough.",
    "Bitter Sweet": "one way or another you receive your visa and are now working towards the American dream. while your future is hopeful, you still have the scars and trauma from the weight of your decisions on the journey here.",
    "Left with Nothing": "you arrive to the states alone with nothing but your identification papers and the clothes on your back. you gave up on everything and prioritized survival over all else and it paid off but with no one and nothing to your name, you may question if this truly was worth it."
};

startButton.addEventListener('click', startQuiz);
if(restartButton){
    restartButton.addEventListener('click', restartQuiz);
}


function startQuiz() {
    console.log('Started');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 1;
    resetPlanetScores();
    setNextQuestion();

}

function restartQuiz() {
    resultContainerElement.classList.add('hide');
    
    //hide photo container elements
    document.getElementById('photo-contatiner').classList.add('hide');
    document.getElementById('photo-message').classList.add('hide');
    document.getElementById('photo-controls').classList.remove('hide');
    
    startButton.classList.remove('hide');
    currentQuestionIndex = 1;
    resetPlanetScores();

}

function resetPlanetScores() {
    for(let planet in planets){
        planets[planet] = 0;
    }
}

function setNextQuestion() {
    if(questions[currentQuestionIndex]){
        showQuestion(currentQuestionIndex);
    }
    else{
        showResults();
    }
}

function showQuestion(questionNumber) {
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }

    const question = questions[questionNumber];
    questionElement.innerText = question.question_text;

    // Update the question image if available
    const questionImage = document.getElementById('question-image');
    if (question.image) {
    questionImage.src = question.image;
    // Make sure the image is displayed if it was previously hidden
    questionImage.style.display = "block";
    } else {
    // Hide image if none is provided for this question
    questionImage.style.display = "none";
    }

    Object.entries(question.question_choices).forEach(([choice, value]) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(value));
        answerButtonElement.appendChild(button);
    });

}

function selectAnswer(answerData) {
    const nextQuestionIndex = answerData[0];
    const planetPoints = answerData[1];

    planetPoints.forEach(planet => {
        planets[planet] += 1;
    });

    currentQuestionIndex = nextQuestionIndex;
    setNextQuestion();
}

function showResults() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    
    // Find ALL planets with max score 
    let maxScore = Math.max(...Object.values(planets));
    let dominantPlanets = [];  // stores array of planets with max score
    
    for (const planet in planets) {
        if (planets[planet] === maxScore) {
            dominantPlanets.push(planet);
        }
    }
    
    // Randomly select one planet if there's a tie
    let selectedPlanet;
    if (dominantPlanets.length > 1) {
        const randomIndex = Math.floor(Math.random() * dominantPlanets.length);
        selectedPlanet = dominantPlanets[randomIndex];
    } else {
        selectedPlanet = dominantPlanets[0];
    }

    // Display the single result
    let resultText = `${selectedPlanet}!\n\n${planetDescriptions[selectedPlanet]}`;

    // Store the selected planet
    window.dominantPlanets = [selectedPlanet]; // Now always an array with one item
    window.currentPlanetIndex = 0;

    resultTextElement.innerText = resultText;
    document.getElementById('start-photo-btn').addEventListener('click', startPhotoReveal);
}


const questions = {
    // question 1
    "1": {
        "question_text": "It's early in the morning and you wake up to the panic of your family. Communist forces have ceased the country and must hurry as the nations allies are only evacuating a limited number of people. You start by gathering belonings, what do you prioritize most?",
        "question_choices": {
            "family: what is the point of survival if your loved ones do not make it with you. do you choose humanity or survival?": [2, ["Never Left"]],
            "gold, jewlery and heirlooms: material wealth and things of sentimental value will be integral for building your new life and may come in handy on the way.": [2, ["Perished on the Way"]],
            "practical survival items: food, water, medicene and whatnot will be important if you want to survive the journey.": [2, ["Bitter Sweet"]],
            "family, valuables and survival items: better to have as much of everything as you can.": [2, ["Left with Nothing"]]
        },
        "image": "images/imageQ1.png"
    },


    // question 2
    "2": {
        "question_text": "as soon as you finish packing, you rush to evacuate with your family and belongings but along the way your grandma falls in the rush to flee and ends up spraining her ankle. there is still a long trek ahead so she tells you to hurry on without her but it's your decision.",
        "question_choices": {
            "continue on without her: You have other family to prioritize and now that she is injured she will slow you down even more. hopefully someone will come along to help her and you can reunite later.": [3, ["Left with Nothing"]],
            "leave her behind but first make sure she will be okay: she might slow you down too much if you take her with you but you can't just leave her there to suffer and potentially perish.": [3, ["Bitter Sweet"]],
            "stay with her yourself: the rest of your family can go on without you, your grandma might be as good as dead on her own. this way you can at least try to make the trek with her while everyone else goes on ahead.": [3, ["Perished on the Way"]],
            "take her with you: it will make your trek much more difficult but could you really live with yourself if you abandoned her?": [3, ["Never Left"]]
        },
        "image": "images/imageQ2.jpg"
    },

    // question 3
    "3": {
        "question_text": "you make it to the evacuation only to find that they have already taken more refugees than they were supposed to and barely have enough room to take one more person as is.",
        "question_choices": {
            "beg: surely they can make even just a little bit more room for a few more people. plead with them to take as much of your family as possible, it likely won't work and maybe someone takes the final spot while you beg but that's a chance you're willing to take.": [4, ["Never Left"]],
            "trust a smuggler: oppurtunistic and somewhat shady people are capitalizing on the scenario and offering to take your whole family in exchange for all of your valuables. everyone could survive and stay togther but it's significantly more risky and you don't know if you can trust this person.": [4, ["Perished on the Way"]],
            "take the final spot: if they can only take in one more person then it should be you. you've been making the decisions thus far and have the best chance of survival. you tell yourself the others will find something without you.": [4, ["Left with Nothing"]],
    
        },
        "image": "images/imageQ3.jpg"
    },
    
    // question 4
     "4": {
        "question_text": "by whichever means you are now on a boat on the way to a new country but challenges are still ahead of you. the boat you've made it onto now carries double or even triple the amount that is was made to. as weather conditions worsen, your captain has ordered that everyone throw belongings overboard to reduce the weight of the boat and risk of sinking in harsh conditions.",
        "question_choices": {
            "hide away your valuables: you will need as much as you can keep with you for you and your family. if it's just you breaking the rules then it shouldn't be that much of a detriment to have a few extra tens of pounds on the boat, right?": [5, ["Never Left"]],
            "keep your gold and jewlery: when you sell these overseas you can buy more essentials later or maybe you can trade with people on the boat in the mean time. though you have been warned that pirates have been spotted and it may be for nought if your vessel gets raided and you lose these.": [5, ["Perished on the Way"]],
            "keep just what is needed to survive the journey: whats the use of anything else if you can't even survive the journey over? ": [5, ["Bitter Sweet"]],
            "throw away everything: the captain has already taken many extra people. this is for the good of everyone around you, even if it means you have nothing but your papers left with you, you must do all you can for the common good.": [5, ["Left with Nothing"]],
        },
        "image": "images/imageQ4.jpg"
    },

    // question 5
    "5": {
        "question_text": "pirates are closing in and you must act quickly. the decision is not yours but what do you think is the best course of action in the face of such a harrowing encounter.",
        "question_choices": {
            "fight back: salvage what weapons you have and bits of the ship and prepare for an attack. ": [6, ["Never Left"]],
            "hide on the boat: perhaps there are some good hiding spots on the ship that at least a few people can fit into. the pirates are probably thorough in searching the ship however.": [6, ["Perished on the Way"]],
            "jump into the ocean: you are quite literally a sitting duck but hopefully the pirates see you as too much of a hassle to care for. all that's left is to survive swimming in the ocean.": [6, ["Bitter Sweet"]],
            "give them everything: if you give them everything then maybe they will leave you in peace.": [6, ["Left with Nothing"]],
        },
        "image": "images/imageQ5.avif"
    },

    // question 6
    "6": {
        "question_text": "you've managed to survive but only after giving up on everyone's valuables. your attackers were 'kind' enough to leave you unharmed with the clothes on your backs. now is the question of how you can continue living despite the lack of any essentials. a kind soul has offered you some raw seagull meat.",
        "question_choices": {
            "starve: the options are either nothing or raw seagull. you'd much rather wait until you are able to touch land again(if you can make it)": [7, ["Never Left"]],
            "search for something else: fish is hard to come by as you lack tools after the raid and the boat must constantly be heading to the next destination. for you, it might be worth the wait to either find something the pirates forgot or see if fishing yields results.": [7, ["Perished on the Way"]],
            "eat your shoe: the quickest option is to eat anything you had of leather, like a shoe. its tasteless and tough but at least it's safer than most options": [7, ["Bitter Sweet"]],
            "eat the bird: raw meat is better than starvation. better to deal with the consequences of eating raw meat than continue starving.": [7, ["Left with Nothing"]],
        },
        "image": "images/imageQ6.jpg"
    },

    // question 7
    "7": {
        "question_text": "you have made it to a refugee camp. not quite your destination and the conditions are dire but safer and more comfortable compared to the seas. you start to think to yourself, would it be so bad to stay here?",
        "question_choices": {
            "stay in the camps: it's been a traumatic journey and you are ready to collapse. perhaps you could settle for this kind of life if it meant you didn't have to make anymore hard choices.": [8, ["Never Left"]],
            "fake papers: someone can forge papers for you and your family to stay together. you'd risk a still more dangerous journey and even then still have potential to be deported.": [8, ["Perished on the Way"]],
            "split family: while waiting in the camps, not all of your family gets a visa. is it worth splitting up your family to allow some members to go to a better life while leaving others behind.": [8, ["Bitter Sweet"]],
            "get yourself out: it's not a decision you like making but as quickly as you can you need to get out of here. maybe once you get your visa you can work on helping the rest of your family later.": [8, ["Left with Nothing"]],
        },
        "image": "images/imageQ7.jpg"
    },
}


  

        