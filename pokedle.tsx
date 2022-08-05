
import  { colorLetter }  from  './colors.ts';

const MAX_TRIES = 6;
const POKEMONS_AVAILABRE = 850;
const previousGuesses: Array<string> = [];

const randomId = Math.floor(Math.random() * POKEMONS_AVAILABRE) + 1;
const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then(res => res.json())
    .then(response => response.name.toLowerCase());

let globalResults = '';

function askWord () {
    const response = prompt('The Pokemon is...');
    if (response == null) {
        return {error: 'You must provide a possible pokemon name'};
    } else if (response.length !== pokemon.length) {
        return {error: `The pokemon name must be the same length as the original pokemon name ${pokemon.length}`};
    } else if (previousGuesses.includes(response)) {
        return {error: 'You have already guessed this pokemon name'};
    } else if (!/^[a-z]+$/.test(response)) {
        return {error: 'The pokemon name must only contain lowercase letters'};
    }

    return {response};
}

function print(guess: string) {
    console.clear();
    let results = '';
    const letters: Array<string> = [...guess];
    letters.forEach((letter, index) => {
        if (letter === pokemon[index]) {
            results += colorLetter('green', letter);
        } else if (pokemon.includes(letter)) {
            results += colorLetter('yellow', letter);
        } else {
            results += colorLetter('gray', letter);
        }
    });
    globalResults += `${results}\n\n`
    console.log(globalResults);
}

function start (tries: number) {
    if (tries >= MAX_TRIES) {
        console.log(`You have run out of tries. The pokemon was ${pokemon}`);
        return;
    }

    let guess = '';
    while (guess === '') {
        const { error, response } = askWord();
        if (error) {
            console.error(error);
            continue;
        }
        if (response) guess = response;
    }

    if (guess === pokemon) {
        print(guess);
        console.log('🎈 You win! 🎈');
        return;
    } else {
        print(guess);
        console.log(`You have ${MAX_TRIES - tries} tries left`);
        tries++;
        start(tries);
    }

}

console.log(`Welcome to Pokedle! You have ${MAX_TRIES} tries to guess the pokemon name`);
console.log(`The pokemon name is ${pokemon.length} letters long`);
start(0);