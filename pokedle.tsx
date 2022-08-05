import {bold, white, bgGreen, bgYellow, bgBrightBlack } from 'https://deno.land/std@0.151.0/fmt/colors.ts';

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

const colorMethods = {
    green: bgGreen,
    yellow: bgYellow,
    gray: bgBrightBlack
}

function colorLetter (color: 'green' | 'yellow' | 'gray', letter: string) {
    const bg = colorMethods[color];
    const colorizeLetter = bg(bold(` ${white(letter)} `));
    return ` ${colorizeLetter} `;
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

start(0);