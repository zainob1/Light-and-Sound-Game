let pattern = [2, 2, 4, 3, 2, 1, 2, 4];
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
let guessCounter = 0;
const clueHoldTime = 1000;
const cluePauseTime = 333; 
const nextClueWaitTime = 1000;
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function startGame() {
  progress = 0;
  gamePlaying = true; 
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");

  playClueSequence();
}
function stopGame() {
    gamePlaying = false;
    //swapping stop and start buttons
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
  }
  const freqMap = {
    1: 600,
    2: 580,
    3: 392,
    4: 300
  }
function playTone(btn, len) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
    setTimeout(function() {
      stopTone()
    }, len)
  }
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
    }
}
function stopTone() {
    g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
    tonePlaying = false
  }
  // Page Initialization
  // Init Sound Synthesizer
  let AudioContext = window.AudioContext || window.webkitAudioContext
  let context = new AudioContext()
  let o = context.createOscillator()
  let g = context.createGain()
  g.connect(context.destination)
  g.gain.setValueAtTime(0, context.currentTime)
  o.connect(g)
  o.start(0)
  function lightButton(btn) {
    document.getElementById("button" + btn).classList.add("lit")
  }
  function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit")
  }
  function playSingleClue(btn) {
    if (gamePlaying) {
      lightButton(btn);
      playTone(btn, clueHoldTime);
      setTimeout(clearButton, clueHoldTime, btn);
    }
  }
function playClueSequence() {
  context.resume()
  let delay = nextClueWaitTime; 
  guessCounter = 0;
  for (let i = 0; i <= progress; i++) { 
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue, delay, pattern[i]) 
    delay += clueHoldTime
    delay += cluePauseTime;
  }
}
function loseGame() {
  stopGame();
  alert("You lost, press start to play again!")
}
function winGame() {
  stopGame();
  alert("You won, press start to play again!")
}
function guess(btn) {
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
}
  if (pattern[guessCounter] == btn) {
    // the user guessed correctly
    if (guessCounter == progress) {
      if (progress == pattern.length - 1 ){
        // the user won!
        winGame()
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    loseGame();
  }
}