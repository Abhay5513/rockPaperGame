const scrDiv = document.querySelector('.score-div');
const resEl = document.querySelector('.result');
const outEl = document.querySelector('.outcome');
const autoEl = document.querySelector('.js-auto');
const btnRock = document.querySelector('.btn-rock');
const btnPaper = document.querySelector('.btn-paper');
const btnScissors = document.querySelector('.btn-scissors');
const btnAutoPlay = document.querySelector('.btn-autoplay');
const btnStop = document.querySelector('.js-auto-stop');
const btnReset = document.querySelector('.btn-reset');

let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
  score = {
    Wins: 0,
    Looses: 0,
    Draw: 0
  }
}

function pickComputerMove() { //picking computer move.
  let computerMove = "";
  const randomNumber = Math.trunc(Math.random() * 3 + 1);

  if (randomNumber === 1) {
    computerMove = 'Rock';
  }
  else if (randomNumber === 2) {
    computerMove = 'Paper';
  }
  else {
    computerMove = 'Scissors';

  }
  return computerMove;  //returning computer move so it can be stored in a variable to later use it.
}


const play = function (value) { //creating a new function with parameter

  let result = '';

  const computerMove = pickComputerMove();

  if (value === "Scissors") {
    if (computerMove === 'Rock') {
      result = 'You Lose!';
      score.Looses += 1;

    } else if (computerMove === 'Paper') {
      result = 'You Win!';
      score.Wins += 1;
    }
    else if (computerMove === 'Scissors') {
      result = 'Tie!'
      score.Draw += 1;
    }
    localStorage.setItem('score', JSON.stringify(score))



    //alert(`You selected ${value} and CPU selected ${computerMove}: ${result}
    //  Draw:${score.Draw}, Wins:${score.Wins}, Losses: ${score.Looses}`)



  }//

  else if (value === "Rock") {
    if (computerMove === 'Rock') {
      result = 'Tie!';
      score.Draw += 1;

    } else if (computerMove === 'Paper') {
      result = 'You lose!';
      score.Looses += 1;
    }
    else if (computerMove === 'Scissors') {
      result = 'You Win!'
      score.Wins += 1;
    }
    localStorage.setItem('score', JSON.stringify(score))

    //alert(`You selected ${value} and CPU selected ${computerMove}: ${result}
    // Draw:${score.Draw}, Wins:${score.Wins}, Losses:   ${score.Looses}`)

  }//

  else {
    if (computerMove === 'Rock') {
      result = 'You Win!';
      score.Wins += 1;

    } else if (computerMove === 'Paper') {
      result = 'Tie!';
      score.Draw += 1;

    }
    else if (computerMove === 'Scissors') {
      result = 'You Lose!'
      score.Looses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score))

    //alert(`You selected ${value} and CPU selected ${computerMove}: ${result}
    //   Draw:${score.Draw}, Wins:${score.Wins}, Losses:   ${score.Looses}`)


  }
  resEl.innerHTML = `${result}`

  outEl.innerHTML = `You  <img src="images/${value}-emoji.png" class="js-img">
  <img src="images/${computerMove}-emoji.png" class="js-img">Computer`

  scrDiv.innerText = ` Wins:${score.Wins}, Losses:${score.Looses}, Ties:${score.Draw}`


}

let intervalId;
function autoPlay() {
  intervalId = setInterval(function () {
    const playerMove = pickComputerMove()
    play(playerMove);

  }, 1000)
}

function stopPlay() {
  clearInterval(intervalId);
}



//addEventListner.
btnRock.addEventListener('click', () => {
  play('Rock')
})

btnPaper.addEventListener('click', () => {
  play('Paper')

})

btnScissors.addEventListener('click', () => {
  play('Scissors')
})

btnAutoPlay.addEventListener('click', () => {
  autoPlay();
})

btnStop.addEventListener('click', () => {
  stopPlay();
})

btnReset.addEventListener('click', () => {
  score.Draw = 0;
  score.Wins = 0;
  score.Looses = 0;
  localStorage.removeItem('score');
  scrDiv.innerText = 'Wins:0, Losses:0, Ties:0';
})

//to add key functionality to the game, i;e, press r will select rock, press s(scissors) and p(paper), we will add eventlistner to the body element.

document.body.addEventListener('keydown', (event) => {
  console.log(event.key)
  if (event.key === "r") {
    play('Rock');
  }
  else if (event.key === 'p') {
    play('Paper')
  }

  else if (event.key === 's') {
    play('Scissors')
  }

})