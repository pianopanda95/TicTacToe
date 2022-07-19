const playersFieldset = [...document.querySelectorAll('nav#players > fieldset')];
const inputs = [...document.querySelectorAll('input[id^=player]')];
const startBtn = document.querySelector('button#start');

const markers = ['X', 'O']

startBtn.addEventListener('click', () => {
    if (!inputs.every(inp => inp.value))
        return;
    
    inputs.map((input, index) => {
        const inputName = input.value;
        input.remove()

        const playerName = document.createElement('p');
        playerName.classList.add('player-name');
        playerName.innerText = inputName;
        playersFieldset[index].appendChild(playerName);

        const playerMarker = document.createElement('p');
        playerMarker.classList.add('player-marker');
        playerMarker.innerText = `${markers[index]}`;
        playersFieldset[index].appendChild(playerMarker);
    });

    const randInd = (() => Math.floor(Math.random() * 2))();
    playersFieldset[randInd].classList.add('active')

    startBtn.remove();
    startGame();
});

const startGame = () => {
    const toggleActivePlayer = () => {
        playersFieldset.map(fieldset => {
            fieldset.getAttribute('class') === 'active' ?
            fieldset.classList.remove('active') :
            fieldset.classList.add('active');
        })
    }

    const gameboard = document.querySelector('main#gameboard');

    const gameboardArray =
        Array(9).fill('').map((x, i) => {
        const field = document.createElement('button');
        field.classList.add('field');
        gameboard.appendChild(field);

        field.addEventListener('click', (e) => {
            const marker = document.querySelector('fieldset.active > p.player-marker')
                          .textContent;
            field.innerText = marker;
            field.setAttribute('disabled', 'disabled')
            gameboardArray[i] = field.innerText;
            checkState(marker, gameboardArray)
            toggleActivePlayer();
        });
        return x;
    });

    const createPopUp = name => {
        const popUp = document.createElement('div');
        popUp.classList.add('pop-up');
        popUp.textContent = name? `CONGRATS ${name}! You won!` : `It's a tie, no winners...`
        gameboard.appendChild(popUp);
        toggleActivePlayer();
    }
    

    const checkState = (marker, gameboardArray) => {
    
        const indexesOfSamePlayersTiles =
            gameboardArray.map((content, index) => content === marker ? index : '' )
                            .filter(item => item !== '')
                            .join('');
    
        const winnerCases = [ /012/, /345/, /678/,
                                /.*0.*3.*6/, /.*1.*4.*7/, /.*2.*5.*8/,
                                /.*0.*4.*8/, /.*2.*4.*6/ ];
    
        if (winnerCases.some(regex => regex.test(indexesOfSamePlayersTiles))){
            const currentName = document.querySelector('fieldset.active > p.player-name')
                               .textContent;
            createPopUp(currentName);
        }
        else if (gameboardArray.filter(item => item !== '').length === 9)
            createPopUp();
    }

}







