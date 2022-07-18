const playersFieldset = [...document.querySelectorAll('nav#players > fieldset')];
const inputs = [...document.querySelectorAll('input[id^=player]')];
const startBtn = document.querySelector('button#start');


const markers = ['X', 'O']
startBtn.addEventListener('click', (e) => {
    if (!inputs.every(inp => inp.value)){
        console.log('yes')
        return;
    }
    
    inputs.map((input, index) => {
        const inputName = input.value;
        input.remove()

        const playerName = document.createElement('p');
        playerName.classList.add('player-name');
        playerName.innerText = inputName;
        playersFieldset[index].appendChild(playerName);

        const playerMarker = document.createElement('p');
        playerMarker.classList.add('player-marker');
        playerMarker.innerText = markers[index];
        playersFieldset[index].appendChild(playerMarker);
    });

    startBtn.remove();
});






const gameboard = document.querySelector('main#gameboard');
const gameboardArray = Array(9).fill('', 0);

gameboardArray.map(x => {
    const field = document.createElement('button');
    field.classList.add('field');
    gameboard.appendChild(field);
    field.addEventListener('click', () => {
        field.innerText = 'X';
        field.setAttribute('disabled', 'disabled')
    });
});

