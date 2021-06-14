const player1 = "gato";
const player2 = "pata";
let turn = player1;
let gameOver = false;

let plays = 0;
let playsGato = 0;
let playsPata = 0;

let vitoriasGato = 0;
let vitoriasPata = 0;

playerTurn();
startGame();

function playerTurn(){
  var imagePlayer = document.querySelectorAll('div#interface img')[0];
  
  if(turn == player1){
    imagePlayer.setAttribute('src', 'images/gato.png');
  }
  else{
    imagePlayer.setAttribute('src', 'images/pata.png');
  }
}

function startGame(){
  var cells = document.getElementsByClassName('quadrado');
  for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', fillCell);
  }
}

function fillCell(){
  if(gameOver == true){ return; }

  if(event.target.getElementsByTagName('img').length == 0){
    if (turn == player1){
      event.target.innerHTML = "<img src='images/gato.png' id='qIm'>";
      event.target.setAttribute("pontos", player1);
      playsGato++
      var addPlay = document.getElementById('jogadasGato');
      addPlay.textContent = playsGato;
      turn = player2;
      plays++;
    }
    else{
      event.target.innerHTML = "<img src='images/pata.png' id='qIm'>";
      event.target.setAttribute("pontos", player2);
      playsPata++
      var addPlay = document.getElementById('jogadasPata');
      addPlay.textContent = playsPata;
      turn = player1;
       plays++;
    }
  }
  playerTurn();
  verifyVictory();
 
  
}

function verifyVictory(){
  var q1 = document.getElementById('1').getAttribute("pontos");
  var q2 = document.getElementById('2').getAttribute("pontos");
  var q3 = document.getElementById('3').getAttribute("pontos");
  var q4 = document.getElementById('4').getAttribute("pontos");
  var q5 = document.getElementById('5').getAttribute("pontos");
  var q6 = document.getElementById('6').getAttribute("pontos");
  var q7 = document.getElementById('7').getAttribute("pontos");
  var q8 = document.getElementById('8').getAttribute("pontos");
  var q9 = document.getElementById('9').getAttribute("pontos");
  
  var pWinner;

  if((q1 == q2 && q1 == q3 && q1) || (q1 == q4 && q1 == q7 && q1) || (q1 == q5 && q1 == q9 && q1)){
    pWinner = q1;
  }
  else if((q5 == q4 && q5 == q6 && q5) || (q5 == q2 && q5 == q8 && q5) || (q5 == q3 && q5 == q7 && q5)){
    pWinner = q5;
  }
  else if((q9 == q8 && q9 == q7 && q9) || (q9 == q6 && q9 == q3 && q9)){
    pWinner = q9;
  }

  if(pWinner != null){
    gameOver = true;
    var winMessage = document.createElement('div');
    winMessage.setAttribute('id', 'msgVitoria')
    if(pWinner == "gato"){
      winMessage.innerHTML = "<img src='images/gato.png' id='iVitoria'> <p> Venceu! </p>";
      document.body.appendChild(winMessage);
      var point = document.getElementById('placarGato');
      vitoriasGato++;
      point.textContent = vitoriasGato;
      restart();
    }
    else{
      winMessage.innerHTML = "<img src='images/pata.png' id='iVitoria'> <p> Venceu! </p>";
      document.body.appendChild(winMessage);
      var point = document.getElementById('placarPata');
      vitoriasPata++;
      point.textContent = vitoriasPata;
      restart();
    }
  }
  if(plays == 9 && pWinner == null){
    gameOver = true;
    var drawMessage = document.createElement('div');
    drawMessage.setAttribute('id', 'msgVitoria')
    drawMessage.innerHTML = "<img src='images/velha.png' id='iVitoria'> <p> Deu velha. </p>";
    document.body.appendChild(drawMessage);
    restart();
  }
}

function restart(){
  var reiniciar = document.createElement('button');
  reiniciar.setAttribute('id', 'botaoRestart');
  reiniciar.setAttribute('onclick', 'zerar()');
  reiniciar.textContent = "Reiniciar";
  document.body.appendChild(reiniciar);
}

function zerar(){

  let i = '1'

  while(i <= '9'){
    var incr = '1'
    var resetCampo = document.getElementById(i);
    resetCampo.innerHTML = "";
    resetCampo.setAttribute("pontos", '');
    i = (+i) + (+incr);
  }

  var exButton = document.getElementById('botaoRestart');
  document.body.removeChild(exButton);

  var resetPlaysGato = document.getElementById('jogadasGato');
  resetPlaysGato.textContent = "0";
  var resetPlaysPata = document.getElementById('jogadasPata');
  resetPlaysPata.textContent = "0";

  var resetVitoria = document.getElementById('msgVitoria');
  document.body.removeChild(resetVitoria);

  turn = player1;
  gameOver = false;
  plays = 0;
  playsGato = 0;
  playsPata = 0;

  playerTurn();
  startGame();
}
