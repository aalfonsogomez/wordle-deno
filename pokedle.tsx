const MAX_TRIES = 6;
const previousGuesses: Array<string> = [];

let globalResults = '';

const pokemon = 'pikachu';

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

let guess = '';
let tries = 0;

while (guess === '') {
    const { error, response } = askWord();
    if (error) {
        console.error(error);
        continue;
    }
    if (response) guess = response;
}

console.log(guess);