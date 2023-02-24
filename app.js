const selectionButtons = document.querySelectorAll(`[data-selection]`);
const finalColumn = document.querySelector(`[data-final-column]`);
const computerScoreSpan = document.querySelector(`[data-computer-score]`)
const yourScoreSpan = document.querySelector(`[data-your-score]`)
const SELECTIONS = [ // global array with rules
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🖐️',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

selectionButtons.forEach((selectionButton) => {
    selectionButton.addEventListener('click', () => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const youWin = findWinner(selection, computerSelection);
    const compWin = findWinner(computerSelection, selection);

    addSelectionResult(computerSelection, compWin);
    addSelectionResult(selection, youWin);

    if(youWin) incrementScore(yourScoreSpan);
    if(compWin)incrementScore(computerScoreSpan);
}

function addSelectionResult (selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('result-selection-winner')
    finalColumn.after(div);

}

function randomSelection() {
    const randIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randIndex];
}

function findWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}