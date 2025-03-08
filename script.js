
function sound() {
    let soun = document.getElementById('soun');
    let audio = document.getElementById("bgMusic");
    let currentColor = window.getComputedStyle(soun).backgroundColor; 

    if (currentColor === "rgb(222, 170, 103)") { 
        soun.style.backgroundColor = "grey";
        audio.pause();
        document.getElementById('OF').innerHTML="sound 's OFF"
    } else {
        soun.style.backgroundColor = "rgb(222, 170, 103)";
        audio.play();
        document.getElementById('OF').innerHTML="sound 's ON"
    }
}

function exit() {
    window.close(); 
    window.location.href = "about:blank"; 
}
 