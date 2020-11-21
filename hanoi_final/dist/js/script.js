// ¯\_(ツ)_/¯

var info = document.getElementById("infoButton");
var infoText = document.getElementById("infoText");
var next = document.getElementById("next");
var leyenda1 = document.getElementById("leyenda1");
var leyenda2 = document.getElementById("leyenda2");
var ePlay = document.getElementById("ePlay");
var omitir = document.getElementById("omitir");
var reset = document.getElementById("reset");
var hanoi = document.getElementById("hanoi");
var age = document.getElementById("age");
var discs = document.getElementsByClassName("discs");
var bottom = document.getElementsByClassName("bottom");
var pdf = document.getElementById("pdf");
var openPDF = document.getElementById("openPDF");
var cerrar = document.getElementById("close");
discs[0].style.opacity="0";
bottom[0].style.opacity="0";
reset.style.opacity="0";
hanoi.style.opacity="0";
info.style.opacity="0";
pdf.style.opacity="0";
openPDF.style.opacity="0";

info.addEventListener("click", ()=>{
    if(infoText.style.display === "none" || infoText.style.display === ""){
        infoText.style.display="block";
    } else {
        infoText.style.display="none";
    }
});

next.addEventListener("click", () => {
    leyenda1.style.display="none";
    next.style.display="none";
})

ePlay.addEventListener("click", () => {
    leyenda2.style.display="none";
    ePlay.style.display="none";
    omitir.style.display="none";
    infoText.style.display="block";
    setTimeout(() => {
        infoText.style.display="none";
    }, 1000)

    discs[0].style.opacity="1";
    bottom[0].style.opacity="1";
    reset.style.opacity="1";
    hanoi.style.opacity="1";
    info.style.opacity="1";
    pdf.style.opacity="1";
    openPDF.style.opacity="1";
    age.style.opacity="0";
})

omitir.addEventListener("click", ()=>{
    next.style.display="none";
    leyenda1.style.display="none";
    leyenda2.style.display="none";
    ePlay.style.display="none";
    omitir.style.display="none";
    discs[0].style.opacity="1";
    bottom[0].style.opacity="1";
    reset.style.opacity="1";
    hanoi.style.opacity="1";
    info.style.opacity="1";
    infoText.style.display="block";

    setTimeout(() => {
        infoText.style.display="none";
    }, 1000)

    pdf.style.opacity="1";
    openPDF.style.opacity="1";
    age.style.opacity="0";
})

pdf.addEventListener("click", () => {
    window.open('assets/DocumentoHanoi.pdf')
})

cerrar.addEventListener("click", () => {
    window.close();
})
