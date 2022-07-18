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

