let name = document.getElementById("name");
let closeGame = document.getElementById("close");
let play = document.getElementById("playButton")
let rec = document.getElementById("rec");
let intro1 = document.getElementById("intro1");
let intro2 = document.getElementById("intro2");
let explanation = document.getElementById("explanation");
let next = document.getElementById("next");
let closeInfo = document.getElementById("closeInfo");
let count = 0;

play.addEventListener("click", () => {
    play.style.display = "none";
    closeGame.style.display = "none";
    name.style.display = "none";
    rec.style.display="none";
    intro1.style.display = "block";
    next.style.display = "block";
    closeInfo.style.display = "block";
})

next.addEventListener("click", () => {
  if(count === 0){
    intro1.style.display = "none";
    intro2.style.display = "block";
  } else if(count === 1){
    intro2.style.display = "none"
    explanation.style.display="block"
  } else{
    window.location.replace("juego.html")
  }
  count++;
})
